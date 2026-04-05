import styles from '../mainPage.module.css';
import clsx from 'clsx';
import ToggleType from './ToogleSwitch';
import { useState, useContext, useEffect } from 'react';
import ModalContext from '../../../Contexts/Modal';
import Balance from '../../../Contexts/Balance';
import { IoClose } from 'react-icons/io5';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';
import { Snackbar, Alert } from '@mui/material';

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

const Modal = ({ open, onClose }) => {
  const { type, setType } = useContext(ModalContext);
  const { transactions, setTransactions } = useContext(Balance);
  const [localAlert, setLocalAlert] = useState('');
  const [localAlertType, setLocalAlertType] = useState('error');
  const [number, setNumber] = useState('');
  const [comment, setComment] = useState('');
  const [date, setDate] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [closing, setClosing] = useState(false);

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

  const [openSelect, setOpenSelect] = useState(false);
  if (!open) return null;

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

    if (type === '-' && !selectedCategory) {
      setLocalAlert('Please select a category before adding an expense.');
      setLocalAlertType('error');
      return;
    }
    const formatDateShortYear = (date) => {
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = String(date.getFullYear()).slice(-2);
      return `${day}.${month}.${year}`;
    };
    const formattedDate = formatDateShortYear(new Date(date));
    const newTransaction = {
      date: formattedDate,
      type,
      category: type === '-' ? selectedCategory : 'Income',
      comment,
      sum: number,
    };
    setTransactions([...transactions, newTransaction]);
    setNumber('');
    setComment('');
    setDate('');
    setSelectedCategory('');
    handleClose();
  };
  return (
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
          <h2 className={clsx(styles.modalContentTitle)}>Add transaction</h2>
          <ToggleType value={type} onChange={setType} />
          {type === '+' ? (
            <form
              className={clsx(styles.modalContentForm)}
              onSubmit={handleSubmit}
            >
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
                    type="date"
                    placeholder="Date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
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
                  Add
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
          ) : (
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
                    onClick={() => setOpenSelect(!openSelect)}
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
                    <ul
                      className={clsx(
                        styles.selectList,
                        'animate__animated',
                        'animate__fadeIn'
                      )}
                    >
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
                  Add
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
          )}

          <button className={clsx(styles.modalClose)} onClick={handleClose}>
            <IoClose size={30} color="rgba(251, 251, 251, 1)" />
          </button>
        </div>
      </div>
    </>
  );
};

export default Modal;
