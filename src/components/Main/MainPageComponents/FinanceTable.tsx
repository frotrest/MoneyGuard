import { useState, type FC, type MouseEvent } from 'react';
import {
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from '@mui/material';
import clsx from 'clsx';
import { FaPencilAlt } from 'react-icons/fa';
import { FaPlus } from 'react-icons/fa6';

import styles from '../mainPage.module.css';
import Container from '../../../Container';
import Modal from './Modal.tsx';
import EditModal from './EditModal';

import { useAppDispatch, useAppSelector } from '../../../store';
import { openModal } from '../../../store/slices/ModalSlice';
import {
  deleteTransaction,
  type Transaction,
} from '../../../store/slices/Transactions';
import { selectTransactions } from '../../../store/selectors.ts';
import { AnimatePresence, motion } from 'framer-motion';

const FinanceTable: FC = () => {
  const dispatch = useAppDispatch();
  const transactions = useAppSelector(selectTransactions);

  const [editIndex, setEditIndex] = useState<number | null>(null);

  const balance = transactions.reduce((acc, item) => {
    const sum =
      typeof item.sum === 'string' ? parseFloat(item.sum) || 0 : item.sum;
    return item.type === '+' ? acc + sum : acc - sum;
  }, 0);

  const handleOpenAddModal = () => {
    dispatch(openModal('+'));
  };

  const handleOpenEditModal = (
    e: MouseEvent<HTMLButtonElement>,
    index: number
  ) => {
    e.preventDefault();
    setEditIndex(index);
    dispatch(openModal());
  };

  const handleDelete = (id: string) => {
    dispatch(deleteTransaction(id));
  };

  return (
    <>
      <Modal />

      {editIndex !== null && <EditModal transactionIndex={editIndex} />}

      <Container className={clsx(styles.spendingContent)}>
        <button
          onClick={handleOpenAddModal}
          className={clsx(styles.spendingOpenModal)}
          type="button"
        >
          <FaPlus size={20} color="white" />
        </button>

        <div
          className={clsx(
            styles.asideContentBalance,
            styles.asideFinanceBalance
          )}
          data-animate="fadeIn"
        >
          <h5 className={clsx(styles.asideContentBalanceTitle)}>
            Your balance
          </h5>
          <span className={clsx(styles.asideContentBalanceItem)}>
            ₴ {balance}
          </span>
        </div>

        <div className={clsx(styles.financeCards)} data-animate="fadeIn">
          <AnimatePresence>
            {transactions.map((t: Transaction, i: number) => (
              <motion.div
                key={t.id}
                className={clsx(styles.financeCard)}
                style={{
                  borderLeft: `5px solid ${
                    t.type === '+'
                      ? 'rgba(255, 182, 39, 1)'
                      : 'rgba(255, 134, 141, 1)'
                  }`,
                }}
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, x: -20 }}
                transition={{ duration: 0.25, delay: i * 0.03 }}
                layout
              >
                <div className={clsx(styles.financeCardRow)}>
                  <span className={clsx(styles.financeCardLabel)}>Date:</span>
                  <span className={clsx(styles.financeCardResponse)}>
                    {t.date}
                  </span>
                </div>
                <div className={clsx(styles.financeCardRow)}>
                  <span className={clsx(styles.financeCardLabel)}>Type:</span>
                  <span className={clsx(styles.financeCardResponse)}>
                    {t.type}
                  </span>
                </div>
                <div className={clsx(styles.financeCardRow)}>
                  <span className={clsx(styles.financeCardLabel)}>
                    Category:
                  </span>
                  <span className={clsx(styles.financeCardResponse)}>
                    {t.category}
                  </span>
                </div>
                <div className={clsx(styles.financeCardRow)}>
                  <span className={clsx(styles.financeCardLabel)}>
                    Comment:
                  </span>
                  <span className={clsx(styles.financeCardResponse)}>
                    {t.comment}
                  </span>
                </div>
                <div className={clsx(styles.financeCardRow)}>
                  <span className={clsx(styles.financeCardLabel)}>Sum:</span>
                  <span
                    style={{
                      color:
                        t.type === '-'
                          ? 'rgba(255, 134, 141, 1)'
                          : 'rgba(255, 182, 39, 1)',
                    }}
                    className={clsx(styles.financeCardType)}
                  >
                    {t.sum}
                  </span>
                </div>
                <div className={clsx(styles.financeCardActions)}>
                  <button
                    type="button"
                    className={clsx(styles.financeCardBtn)}
                    onClick={(e) => handleOpenEditModal(e, i)}
                  >
                    <FaPencilAlt size={14} />
                    Edit
                  </button>
                  <button
                    type="button"
                    className={clsx(styles.financeCardBtn)}
                    onClick={() => handleDelete(t.id)}
                  >
                    Delete
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <Table className={clsx(styles.financeTable)}>
          <TableHead
            className={clsx(styles.financeTableHead)}
            data-animate="fadeIn"
          >
            <TableRow className={clsx(styles.financeTableHeadRow)}>
              <TableCell className={clsx(styles.financeTableHeadRowItem)}>
                Date
              </TableCell>
              <TableCell className={clsx(styles.financeTableHeadRowItem)}>
                Type
              </TableCell>
              <TableCell className={clsx(styles.financeTableHeadRowItem)}>
                Category
              </TableCell>
              <TableCell className={clsx(styles.financeTableHeadRowItem)}>
                Comment
              </TableCell>
              <TableCell className={clsx(styles.financeTableHeadRowItem)}>
                Sum
              </TableCell>
              <TableCell className={clsx(styles.financeTableHeadRowItem)}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody className={clsx(styles.financeTableBody)}>
            <AnimatePresence>
              {transactions.map((t: Transaction, i: number) => (
                <motion.tr
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.25, delay: i * 0.03 }}
                  layout
                  key={t.id}
                  className={clsx(styles.financeTableBodyRow)}
                  data-animate="fadeIn"
                >
                  <TableCell className={clsx(styles.financeTableBodyRowItem)}>
                    {t.date}
                  </TableCell>
                  <TableCell
                    className={clsx(
                      styles.financeTableBodyRowItem,
                      styles.financeType
                    )}
                  >
                    {t.type}
                  </TableCell>
                  <TableCell className={clsx(styles.financeTableBodyRowItem)}>
                    {t.category}
                  </TableCell>
                  <TableCell className={clsx(styles.financeTableBodyRowItem)}>
                    {t.comment}
                  </TableCell>
                  <TableCell
                    className={clsx(styles.financeTableBodyRowItem)}
                    sx={{
                      color:
                        t.type === '-'
                          ? 'rgba(255, 134, 141, 1) !important'
                          : 'rgba(255, 182, 39, 1) !important',
                      fontWeight: '600 !important',
                    }}
                  >
                    {t.sum}
                  </TableCell>
                  <TableCell className={clsx(styles.financeTableBodyRowItem)}>
                    <button
                      type="button"
                      className={clsx(styles.financeTableBodyRowEdit)}
                      onClick={(e) => handleOpenEditModal(e, i)}
                    >
                      <FaPencilAlt size={14} color="rgba(255, 255, 255, 0.6)" />
                    </button>
                    <button
                      type="button"
                      className={clsx(styles.financeTableBodyRowBtn)}
                      onClick={() => handleDelete(t.id)}
                    >
                      Delete
                    </button>
                  </TableCell>
                </motion.tr>
              ))}
            </AnimatePresence>
          </TableBody>
        </Table>
      </Container>
    </>
  );
};

export default FinanceTable;
