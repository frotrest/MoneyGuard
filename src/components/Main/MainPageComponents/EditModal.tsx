import { useState, useEffect, type FC, type FormEvent } from 'react';
import { IoClose } from 'react-icons/io5';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';
import { setType, closeModal } from '../../../store/slices/ModalSlice.ts';
import { editTransaction } from '../../../store/slices/Transactions.ts';
import styles from '../mainPage.module.css';
import { useAppDispatch, useAppSelector } from '../../../store';
import { createPortal } from 'react-dom';
import {
  selectIsModalOpen,
  selectModalType,
  selectTransactions,
} from '../../../store/selectors.ts';

const categories: string[] = [
  'Main expenses',
  'Products',
  'Car',
  'Self care',
  'Child care',
  'Family products',
  'Education',
  'Leisure',
  'Other expenses',
  'Entertainment',
];

interface EditModalProps {
  transactionIndex: number | null;
}

const EditModal: FC<EditModalProps> = ({ transactionIndex }) => {
  const dispatch = useAppDispatch();
  const type = useAppSelector(selectModalType);
  const isOpen = useAppSelector(selectIsModalOpen);
  const transactions = useAppSelector(selectTransactions);

  const currentTransaction =
    transactionIndex !== null ? transactions[transactionIndex] : null;

  const [number, setNumber] = useState<string | number>(
    currentTransaction?.sum ?? ''
  );
  const [comment, setComment] = useState<string>(
    currentTransaction?.comment ?? ''
  );
  const [selectedCategory, setSelectedCategory] = useState<string>(
    currentTransaction?.category ?? ''
  );
  const [openSelect, setOpenSelect] = useState<boolean>(false);

  const [date, setDate] = useState<string>(() => {
    if (currentTransaction?.date) {
      const [day, month, year] = currentTransaction.date.split('.');
      const fullYear = year.length === 2 ? `20${year}` : year;
      return `${fullYear}-${month}-${day}`;
    }
    return '';
  });

  useEffect(() => {
    if (currentTransaction) {
      dispatch(setType(currentTransaction.type));
    }
  }, [currentTransaction, dispatch]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  const handleClose = () => {
    dispatch(closeModal());
  };

  const handleSelect = (item: string) => {
    setSelectedCategory(item);
    setOpenSelect(false);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formatDateShortYear = (dateStr: string) => {
      const d = new Date(dateStr);
      const day = String(d.getDate()).padStart(2, '0');
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const year = String(d.getFullYear()).slice(-2);
      return `${day}.${month}.${year}`;
    };

    const formattedDate = formatDateShortYear(date);

    const updatedTransaction = {
      ...currentTransaction!,
      date: formattedDate,
      type,
      category: type === '-' ? selectedCategory : 'Income',
      comment,
      sum: Number(number),
    };

    dispatch(
      editTransaction({
        index: transactionIndex!,
        transaction: updatedTransaction,
      })
    );

    handleClose();
  };

  const modalRoot = document.getElementById('modal-root');
  if (!modalRoot) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && transactionIndex !== null && currentTransaction && (
        <motion.div
          className={clsx(styles.modalOverlay)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={handleClose}
        >
          <motion.div
            className={styles.modalContent}
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className={styles.modalContentTitle}>Edit transaction</h2>

            <div className={styles.transactionType}>
              <p
                className={`${styles.transactionTypeItem} ${
                  type === '+' ? styles.transactionTypeItemIncome : ''
                }`}
              >
                Income
              </p>
              <p
                className={`${styles.transactionTypeItem} ${
                  type === '-' ? styles.transactionTypeItemExpense : ''
                }`}
              >
                Expense
              </p>
            </div>

            <form className={styles.modalContentForm} onSubmit={handleSubmit}>
              {type === '-' && (
                <div className={styles.selectWrapper}>
                  <div
                    className={styles.modalContentFormSelect}
                    onClick={() => setOpenSelect((prev) => !prev)}
                  >
                    {selectedCategory || 'Select category'}
                    {openSelect ? (
                      <MdKeyboardArrowDown
                        size={30}
                        color="rgba(251, 251, 251, 1)"
                      />
                    ) : (
                      <MdKeyboardArrowUp
                        size={30}
                        color="rgba(251, 251, 251, 1)"
                      />
                    )}
                  </div>
                  <AnimatePresence>
                    {openSelect && (
                      <motion.ul
                        className={styles.selectList}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.15 }}
                      >
                        {categories.map((item, index) => (
                          <li
                            key={index}
                            className={styles.modalContentFormSelectItem}
                            onClick={() => handleSelect(item)}
                          >
                            {item}
                          </li>
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </div>
              )}

              <div className={styles.modalContentFormInputs}>
                <label className={styles.modalContentFormLabel}>
                  <input
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                    type="number"
                    placeholder="Number"
                    className={styles.modalContentFormLabelItem}
                    required
                  />
                </label>

                <label className={styles.modalContentFormLabel}>
                  <input
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    type="date"
                    className={styles.modalContentFormLabelItem}
                    required
                  />
                </label>
              </div>

              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className={styles.modalContentFormComment}
                placeholder="Comment"
              ></textarea>

              <div className={styles.modalContentFormBtns}>
                <button
                  className={styles.modalContentFormBtnsItem}
                  type="submit"
                >
                  Save
                </button>
                <button
                  className={styles.modalContentFormBtnsItem}
                  onClick={handleClose}
                  type="button"
                >
                  Cancel
                </button>
              </div>
            </form>

            <button className={styles.modalClose} onClick={handleClose}>
              <IoClose size={30} color="rgba(251, 251, 251, 1)" />
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    modalRoot
  );
};

export default EditModal;
