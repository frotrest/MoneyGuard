import styles from '../mainPage.module.css';
import clsx from 'clsx';
import { useState, useContext, useEffect } from 'react';
import ModalContext from '../../../Contexts/Modal';
import Balance from '../../../Contexts/Balance';
import { IoClose } from 'react-icons/io5';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';

const categories = [
  'Main expenses',
  'Products',
  'Car',
  'Self care',
  'Child care',
  'Household products',
  'Education',
  'Leisure',
  'Other expenses',
  'Entertainment',
];

const EditModal = ({ open, onClose, transactionIndex }) => {
  const { type, setType } = useContext(ModalContext);
  const { transactions, setTransactions } = useContext(Balance);

  const currentTransaction = transactions[transactionIndex] || null;

  const [number, setNumber] = useState(currentTransaction?.sum || '');
  const [comment, setComment] = useState(currentTransaction?.comment || '');
  const [date, setDate] = useState(() => {
    if (!currentTransaction?.date) return '';
    const [day, month, year] = currentTransaction.date.split('.');
    return `20${year}-${month}-${day}`;
  });
  const [selectedCategory, setSelectedCategory] = useState(
    currentTransaction?.category || ''
  );
  const [openSelect, setOpenSelect] = useState(false);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    if (currentTransaction) {
      setType(currentTransaction.type);
    }
  }, [currentTransaction, setType]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [open]);

  if (!open || transactionIndex === null || !currentTransaction) return null;

  const handleClose = () => {
    setClosing(true);
    setTimeout(() => {
      setClosing(false);
      onClose();
    }, 1000);
  };

  const handleSelect = (item) => {
    setSelectedCategory(item);
    setOpenSelect(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formatDateShortYear = (date) => {
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = String(date.getFullYear()).slice(-2);
      return `${day}.${month}.${year}`;
    };
    const formattedDate = formatDateShortYear(new Date(date));

    const updatedTransaction = {
      ...currentTransaction,
      date: formattedDate,
      type,
      category: type === '-' ? selectedCategory : 'Income',
      comment,
      sum: number,
    };

    const newTransactions = [...transactions];
    newTransactions[transactionIndex] = updatedTransaction;
    setTransactions(newTransactions);

    handleClose();
  };

  return (
    <div
      className={clsx(
        styles.modalOverlay,
        'animate__animated',
        closing ? 'animate__fadeOut' : 'animate__fadeIn'
      )}
      onClick={handleClose}
    >
      <div
        className={clsx(styles.modalContent)}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className={clsx(styles.modalContentTitle)}>Edit transaction</h2>
        <div className={clsx(styles.transactionType)}>
          <p
            className={clsx(
              styles.transactionTypeItem,
              type === '+' && styles.transactionTypeItemIncome
            )}
          >
            Income
          </p>
          <p
            className={clsx(
              styles.transactionTypeItem,
              type === '-' && styles.transactionTypeItemExpense
            )}
          >
            Expense
          </p>
        </div>
        <form className={clsx(styles.modalContentForm)} onSubmit={handleSubmit}>
          {type === '-' && (
            <div className={clsx(styles.selectWrapper)}>
              <div
                className={clsx(styles.modalContentFormSelect)}
                onClick={() => setOpenSelect(!openSelect)}
              >
                {selectedCategory || 'Select category'}
                {openSelect ? (
                  <MdKeyboardArrowDown
                    size={30}
                    color="rgba(251, 251, 251, 1)"
                  />
                ) : (
                  <MdKeyboardArrowUp size={30} color="rgba(251, 251, 251, 1)" />
                )}
              </div>
              {openSelect && (
                <ul className={clsx(styles.selectList)}>
                  {categories.map((item, index) => (
                    <li
                      key={index}
                      className={clsx(styles.modalContentFormSelectItem)}
                      onClick={() => handleSelect(item)}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
          <div className={clsx(styles.modalContentFormInputs)}>
            <label className={clsx(styles.modalContentFormLabel)}>
              <input
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                type="number"
                placeholder="Number"
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
          ></textarea>
          <div className={clsx(styles.modalContentFormBtns)}>
            <button
              className={clsx(styles.modalContentFormBtnsItem)}
              type="submit"
            >
              Save
            </button>
            <button
              className={clsx(styles.modalContentFormBtnsItem)}
              onClick={handleClose}
              type="button"
            >
              Cancel
            </button>
          </div>
        </form>
        <button className={clsx(styles.modalClose)} onClick={handleClose}>
          <IoClose size={30} color="rgba(251, 251, 251, 1)" />
        </button>
      </div>
    </div>
  );
};

export default EditModal;
