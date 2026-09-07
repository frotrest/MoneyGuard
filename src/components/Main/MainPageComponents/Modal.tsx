import { useState, useEffect, type FC, type FormEvent } from 'react';
import clsx from 'clsx';
import { IoClose } from 'react-icons/io5';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';
import { Snackbar, Alert } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';

import styles from '../mainPage.module.css';
import ToggleType from './ToogleSwitch';

import { useAppDispatch, useAppSelector } from '../../../store';
import {
  closeModal,
  setType,
  type ExpenseType,
} from '../../../store/slices/ModalSlice';
import { addTransaction } from '../../../store/slices/Transactions';
import type { NoticeType } from '../../../store/slices/AuthSlice';
import { createPortal } from 'react-dom';
import { selectIsModalOpen, selectModalType } from '../../../store/selectors';

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

const Modal: FC = () => {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector(selectIsModalOpen);
  const type = useAppSelector(selectModalType);

  const [localAlert, setLocalAlert] = useState<string>('');
  const [localAlertType, setLocalAlertType] = useState<NoticeType>('error');
  const [number, setNumber] = useState<string>('');
  const [comment, setComment] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [openSelect, setOpenSelect] = useState<boolean>(false);

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

  const handleTypeChange = (newType: ExpenseType) => {
    dispatch(setType(newType));
    setSelectedCategory('');
  };

  const handleSelect = (category: string) => {
    setSelectedCategory(category);
    setOpenSelect(false);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (type === '-' && !selectedCategory) {
      setLocalAlert('Please select a category before adding an expense.');
      setLocalAlertType('error');
      return;
    }

    const [year, month, day] = date.split('-');
    const formattedDate = `${day}.${month}.${year.slice(-2)}`;

    dispatch(
      addTransaction({
        id: crypto.randomUUID(),
        date: formattedDate,
        type,
        category: type === '-' ? selectedCategory : 'Income',
        comment,
        sum: parseFloat(number) || 0,
      })
    );

    setNumber('');
    setComment('');
    setDate('');
    setSelectedCategory('');
    handleClose();
  };

  const modalRoot = document.getElementById('modal-root');
  if (!modalRoot) return null;

  return createPortal(
    <>
      <Snackbar
        open={Boolean(localAlert)}
        autoHideDuration={3000}
        onClose={() => setLocalAlert('')}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          severity={localAlertType}
          onClose={() => setLocalAlert('')}
          variant="filled"
        >
          {localAlert}
        </Alert>
      </Snackbar>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={clsx(styles.modalOverlay)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={handleClose}
          >
            <motion.div
              className={clsx(styles.modalContent)}
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className={clsx(styles.modalContentTitle)}>
                Add transaction
              </h2>

              <ToggleType value={type} onChange={handleTypeChange} />

              <form
                className={clsx(styles.modalContentForm)}
                onSubmit={handleSubmit}
              >
                {type === '-' && (
                  <div className={clsx(styles.selectWrapper)}>
                    <div
                      className={clsx(
                        styles.modalContentFormSelect,
                        'animate__animated',
                        'animate__fadeIn'
                      )}
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

                    {openSelect && (
                      <motion.ul
                        className={clsx(styles.selectList)}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.15 }}
                      >
                        {categories.map((cat) => (
                          <li
                            key={cat}
                            className={clsx(styles.modalContentFormSelectItem)}
                            onClick={() => handleSelect(cat)}
                          >
                            {cat}
                          </li>
                        ))}
                      </motion.ul>
                    )}
                  </div>
                )}

                <div className={clsx(styles.modalContentFormInputs)}>
                  <label className={clsx(styles.modalContentFormLabel)}>
                    <input
                      value={number}
                      onChange={(e) => setNumber(e.target.value)}
                      type="number"
                      step="any"
                      placeholder="Sum"
                      className={clsx(styles.modalContentFormLabelItem)}
                      required
                    />
                  </label>

                  <label className={clsx(styles.modalContentFormLabel)}>
                    <input
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      type="date"
                      className={clsx(styles.modalContentFormLabelItem)}
                      required
                    />
                  </label>
                </div>

                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className={clsx(styles.modalContentFormComment)}
                  placeholder="Comment"
                />

                <div className={clsx(styles.modalContentFormBtns)}>
                  <button
                    type="submit"
                    className={clsx(styles.modalContentFormBtnsItem)}
                  >
                    Add
                  </button>
                  <button
                    type="button"
                    className={clsx(styles.modalContentFormBtnsItem)}
                    onClick={handleClose}
                  >
                    Cancel
                  </button>
                </div>
              </form>

              <button
                type="button"
                className={clsx(styles.modalClose)}
                onClick={handleClose}
                aria-label="Close modal"
              >
                <IoClose size={30} color="rgba(251, 251, 251, 1)" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>,
    modalRoot
  );
};

export default Modal;
