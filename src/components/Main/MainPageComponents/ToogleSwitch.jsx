import { useContext } from 'react';
import styles from '../mainPage.module.css';
import clsx from 'clsx';
import { FaPlus, FaMinus } from 'react-icons/fa6';
import ModalContext from '../../../Contexts/Modal';

const ToggleType = () => {
  const { type, handleToggle } = useContext(ModalContext);
  return (
    <div className={clsx(styles.toggleType)}>
      <p
        className={clsx(styles.toggleOption)}
        style={{ color: type === '+' && 'rgba(255, 182, 39, 1)' }}
      >
        Income
      </p>
      <div className={clsx(styles.toggleWrapper)} onClick={handleToggle}>
        <div
          className={clsx(styles.toggleCircle, type === '-' && styles.right)}
        >
          {type === '+' ? (
            <FaPlus size={20} color="white" />
          ) : (
            <FaMinus size={20} color="white" />
          )}
        </div>
      </div>
      <p
        className={clsx(styles.toggleOption)}
        style={{ color: type === '-' && 'rgba(255, 134, 141, 1)' }}
      >
        Expense
      </p>
    </div>
  );
};

export default ToggleType;
