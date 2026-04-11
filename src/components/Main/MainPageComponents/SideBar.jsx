import clsx from 'clsx';
import styles from '../mainPage.module.css';
import {
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import CurrencyChart from './Chart';
import { IoHomeSharp } from 'react-icons/io5';
import { FaDollarSign } from 'react-icons/fa';
import { FiServer } from 'react-icons/fi';
import Balance from '../../../Contexts/Balance';

const SideBar = ({ onNavigate }) => {
  const [currencies, setCurrencies] = useState([]);
  const { balance } = useContext(Balance);
  useEffect(() => {
    const fetchRates = async () => {
      try {
        const response = await axios.get(
          'https://api.exchangerate-api.com/v4/latest/USD'
        );

        const uahRate = response.data.rates.UAH;
        const eurRate = response.data.rates.EUR;

        setCurrencies([
          {
            code: 'UAH',
            purchase: uahRate * 0.99,
            sale: uahRate * 1.01,
          },
          {
            code: 'EUR',
            purchase: eurRate * 0.99,
            sale: eurRate * 1.01,
          },
        ]);
      } catch (error) {
        console.log('Error while receiving rates:', error);
      }
    };
    fetchRates();
  }, []);

  return (
    <aside className={clsx(styles.aside)}>
      <div className={clsx(styles.asideContent)} data-animate="fadeInLeft">
        <div className={clsx(styles.asideBtnsBalance)}>
          <div className={clsx(styles.asideBtns)}>
            <a
              href="#"
              className={clsx(styles.asideBtnsLink)}
              onClick={() => onNavigate('home')}
            >
              <IoHomeSharp
                size={24}
                color="rgba(255, 255, 255, 0.4)"
                className={clsx(styles.asideBtnsLinkImg)}
              />
              Home
            </a>
            <a
              href="#"
              className={clsx(styles.asideBtnsLink)}
              onClick={() => onNavigate('statistics')}
            >
              <FiServer
                size={24}
                color="rgba(255, 255, 255, 0.4)"
                className={clsx(styles.asideBtnsLinkImg)}
              />
              Statistics
            </a>
          </div>
          <div className={clsx(styles.asideBtnsMobile)}>
            <a
              href="#"
              className={clsx(styles.asideBtnsMobileLink)}
              onClick={() => onNavigate('home')}
            >
              <IoHomeSharp
                size={24}
                color="rgba(255, 255, 255, 0.4)"
                className={clsx(styles.asideBtnsLinkImg)}
              />
            </a>
            <a
              href="#"
              className={clsx(styles.asideBtnsLink)}
              onClick={() => onNavigate('statistics')}
            >
              <FiServer
                size={24}
                color="rgba(255, 255, 255, 0.4)"
                className={clsx(styles.asideBtnsLinkImg)}
              />
            </a>
            <a
              href="#"
              className={clsx(styles.asideBtnsMobileLink)}
              onClick={() => onNavigate('finances')}
            >
              <FaDollarSign
                size={24}
                color="rgba(255, 255, 255, 0.4)"
                className={clsx(styles.asideBtnsLinkImg)}
              />
            </a>
          </div>
          <div
            className={clsx(
              styles.asideContentBalance,
              styles.asideMobileBalance
            )}
          >
            <h5 className={clsx(styles.asideContentBalanceTitle)}>
              Your balance
            </h5>
            <span className={clsx(styles.asideContentBalanceItem)}>
              ₴ {balance}
            </span>
          </div>
        </div>
        <div className={clsx(styles.asideContentCurrencyExchange)}>
          <Table className={clsx(styles.tableCurrency)}>
            <TableHead className={clsx(styles.tableCurrencyHead)}>
              <TableRow className={clsx(styles.tableCurrencyHeadRow)}>
                <TableCell
                  className={clsx(styles.tableCurrencyHeadRowItem)}
                  sx={{ borderBottom: 'none' }}
                >
                  Currency
                </TableCell>
                <TableCell
                  className={clsx(styles.tableCurrencyHeadRowItem)}
                  sx={{ borderBottom: 'none' }}
                >
                  Purchase
                </TableCell>
                <TableCell
                  className={clsx(styles.tableCurrencyHeadRowItem)}
                  sx={{ borderBottom: 'none' }}
                >
                  Sale
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currencies.map((c) => (
                <TableRow key={c.code}>
                  <TableCell
                    className={clsx(styles.tableCurrencyBodyRowItem)}
                    sx={{ borderBottom: 'none' }}
                  >
                    {c.code}
                  </TableCell>
                  <TableCell
                    className={clsx(styles.tableCurrencyBodyRowItem)}
                    sx={{ borderBottom: 'none' }}
                  >
                    {c.purchase.toFixed(2)}
                  </TableCell>
                  <TableCell
                    className={clsx(styles.tableCurrencyBodyRowItem)}
                    sx={{ borderBottom: 'none' }}
                  >
                    {c.sale.toFixed(2)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <CurrencyChart />
        </div>
      </div>
    </aside>
  );
};

export default SideBar;
