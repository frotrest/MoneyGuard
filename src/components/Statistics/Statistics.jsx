import clsx from 'clsx';
import Container from '../../Container';
import styles from './statistics.module.css';
import { useContext, useMemo } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import Balance from '../../Contexts/Balance';
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@mui/material';

ChartJS.register(ArcElement, Tooltip, Legend);

const Statistics = () => {
  const { transactions } = useContext(Balance);
  const expenses = transactions.filter((t) => t.type === '-');

  const grouped = useMemo(() => {
    return expenses.reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + Number(t.sum);
      return acc;
    }, {});
  }, [expenses]);

  const labels = useMemo(() => Object.keys(grouped), [grouped]);
  const values = useMemo(() => Object.values(grouped), [grouped]);

  const totalExpenses = useMemo(() => {
    return values.reduce((acc, v) => acc + v, 0);
  }, [values]);
  const totalIncome = useMemo(() => {
    return transactions
      .filter((t) => t.type === '+')
      .reduce((acc, t) => acc + Number(t.sum), 0);
  }, [transactions]);

  const data = {
    labels,
    datasets: [
      {
        data: values,
        backgroundColor: [
          '#FFCE56',
          '#FF6384',
          '#36A2EB',
          '#4BC0C0',
          '#9966FF',
          '#00C49F',
        ],
        borderWidth: 1,
      },
    ],
  };
  const centerTextPlugin = {
    id: 'centerText',
    beforeDraw: (chart) => {
      const { ctx, width, height } = chart;
      ctx.save();

      const total = chart.config.data.datasets[0].data.reduce(
        (acc, v) => acc + v,
        0
      );

      const formatted = total.toLocaleString('uk-UA', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });

      ctx.fillStyle = 'rgba(251, 251, 251, 1)';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      ctx.font = 'bold 20px Poppins';
      ctx.fillText('₴', width / 2, height / 2 - 12);

      ctx.font = 'bold 22px Poppins';
      ctx.fillText(formatted, width / 2, height / 2 + 14);

      ctx.restore();
    },
  };

  const options = {
    plugins: {
      legend: {
        display: false,
        position: 'right',
      },
      tooltip: {
        titleFont: { size: 16, family: 'Poppins' },
        bodyFont: { size: 14, weight: 'normal', family: 'Poppins' },
        backgroundColor: 'rgba(57, 0, 150, 0.9)',
        titleColor: '#fff',
        bodyColor: '#ff868d',
        borderColor: '#ff868d',
        borderWidth: 1,
        cornerRadius: 8,
        padding: 12,
        displayColors: false,
        callbacks: {
          label: (context) => `${context.label}: ₴${context.raw}`,
        },
      },
    },
  };

  return (
    <Container className={clsx(styles.statisticsContent)}>
      <div className={clsx(styles.statisticsMain)} data-animate="fadeIn">
        <h1 className={clsx(styles.statisticsMainTitle)}>Statistics</h1>
        <Doughnut data={data} options={options} plugins={[centerTextPlugin]} />
      </div>
      <div className={clsx(styles.statisticsTransactions)}>
        <Table className={clsx(styles.financeTable)} data-animate="fadeInRight">
          <TableHead className={clsx(styles.financeTableHead)}>
            <TableRow className={clsx(styles.financeTableHeadRow)}>
              <TableCell className={clsx(styles.financeTableHeadRowItem)}>
                Category
              </TableCell>
              <TableCell className={clsx(styles.financeTableHeadRowItem)}>
                Sum
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody className={clsx(styles.financeTableBody)}>
            {labels.map((label, index) => (
              <TableRow
                key={index}
                className={clsx(styles.financeTableBodyRow)}
              >
                <TableCell className={clsx(styles.financeTableBodyRowItem)}>
                  {label}
                </TableCell>
                <TableCell className={clsx(styles.financeTableBodyRowItem)}>
                  ₴{values[index].toFixed(2)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div
          className={clsx(styles.statisticsCommonTransaction)}
          data-animate="fadeInRight"
        >
          <h5 className={clsx(styles.statisticsCommonTransactionTitle)}>
            Expenses:{' '}
            <span
              className={clsx(styles.statisticsCommonTransactionTitleExpense)}
            >
              ₴{totalExpenses.toFixed(2)}
            </span>
          </h5>
          <h5 className={clsx(styles.statisticsCommonTransactionTitle)}>
            Income:{' '}
            <span
              className={clsx(styles.statisticsCommonTransactionTitleIncome)}
            >
              ₴{totalIncome.toFixed(2)}
            </span>
          </h5>
        </div>
      </div>
    </Container>
  );
};

export default Statistics;
