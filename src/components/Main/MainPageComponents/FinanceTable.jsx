import { useContext, useState } from 'react';
import {
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from '@mui/material';
import clsx from 'clsx';
import styles from '../mainPage.module.css';
import Container from '../../../Container';
import Balance from '../../../Contexts/Balance';
import { FaPencilAlt } from 'react-icons/fa';
import Modal from './Modal';
import EditModal from './EditModal';
import { FaPlus } from 'react-icons/fa6';

const FinanceTable = () => {
  const { transactions, setTransactions } = useContext(Balance);
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const openEditModal = (index) => {
    setEditIndex(index);
    setOpenEdit(true);
  };

  const handleDelete = (index) => {
    const updated = transactions.filter((_, i) => i !== index);
    setTransactions(updated);
  };

  return (
    <>
      <Modal open={open} onClose={() => setOpen(false)} />

      {editIndex !== null && (
        <EditModal
          open={openEdit}
          onClose={() => {
            setOpenEdit(false);
            setEditIndex(null);
          }}
          transactionIndex={editIndex}
        />
      )}

      <Container className={clsx(styles.spendingContent)}>
        <button
          onClick={() => setOpen(true)}
          className={clsx(styles.spendingOpenModal)}
        >
          <FaPlus size={20} color="white" />
        </button>
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
            {transactions.map((t, i) => (
              <TableRow
                key={i}
                className={clsx(styles.financeTableBodyRow)}
                data-animate="fadeIn"
              >
                <TableCell className={clsx(styles.financeTableBodyRowItem)}>
                  {t.date}
                </TableCell>
                <TableCell className={clsx(styles.financeTableBodyRowItem)}>
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
                  <a
                    href="#"
                    className={clsx(styles.financeTableBodyRowEdit)}
                    onClick={() => openEditModal(i)}
                  >
                    <FaPencilAlt size={14} color="rgba(255, 255, 255, 0.6)" />
                  </a>
                  <button
                    className={clsx(styles.financeTableBodyRowBtn)}
                    onClick={() => handleDelete(i)}
                  >
                    Delete
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Container>
    </>
  );
};

export default FinanceTable;
