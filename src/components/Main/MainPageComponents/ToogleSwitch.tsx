import type { FC } from 'react';
import clsx from 'clsx';
import { FaPlus, FaMinus } from 'react-icons/fa6';
import styles from '../mainPage.module.css';
import type { ExpenseType } from '../../../store/slices/ModalSlice'; // Замени путь на свой, где лежит тип '+' | '-'

interface ToggleTypeProps {
  value: ExpenseType;
  // eslint-disable-next-line no-unused-vars
  onChange: (value: ExpenseType) => void;
}

const ToggleType: FC<ToggleTypeProps> = ({ value, onChange }) => {
  const handleToggle = () => {
    onChange(value === '+' ? '-' : '+');
  };

  return (
    <div className={clsx(styles.toggleType)}>
      <p
        className={clsx(styles.toggleOption)}
        style={{ color: value === '+' ? 'rgba(255, 182, 39, 1)' : undefined }}
      >
        Income
      </p>

      <div className={clsx(styles.toggleWrapper)} onClick={handleToggle}>
        <div
          className={clsx(styles.toggleCircle, value === '-' && styles.right)}
        >
          {value === '+' ? (
            <FaPlus size={20} color="white" />
          ) : (
            <FaMinus size={20} color="white" />
          )}
        </div>
      </div>

      <p
        className={clsx(styles.toggleOption)}
        style={{ color: value === '-' ? 'rgba(255, 134, 141, 1)' : undefined }}
      >
        Expense
      </p>
    </div>
  );
};

export default ToggleType;
