import { useMemo, useState, useEffect } from 'react';
import Balance from './Balance';

const defaultTransactions = [
  {
    date: '04.01.19',
    type: '-',
    category: 'Other',
    comment: 'Gift for wife',
    sum: 300,
  },
  {
    date: '05.01.19',
    type: '+',
    category: 'Income',
    comment: 'January bonus',
    sum: 8000,
  },
];

const BalanceProvider = ({ children }) => {
  const currentUserEmail = localStorage.getItem('currentUserEmail') || 'guest';

  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem(`transactions_${currentUserEmail}`);
    return saved ? JSON.parse(saved) : defaultTransactions;
  });

  useEffect(() => {
    localStorage.setItem(
      `transactions_${currentUserEmail}`,
      JSON.stringify(transactions)
    );
  }, [transactions, currentUserEmail]);

  const balance = useMemo(() => {
    return transactions.reduce((acc, transaction) => {
      return transaction.type === '+'
        ? acc + Number(transaction.sum)
        : acc - Number(transaction.sum);
    }, 0);
  }, [transactions]);

  return (
    <Balance.Provider value={{ balance, transactions, setTransactions }}>
      {children}
    </Balance.Provider>
  );
};

export default BalanceProvider;
