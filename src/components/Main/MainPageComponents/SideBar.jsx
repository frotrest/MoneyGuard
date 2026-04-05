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
import { FiServer } from 'react-icons/fi';
import Balance from '../../../Contexts/Balance';

const SideBar = ({ onNavigate }) => {
  const [currencies, setCurrencies] = useState([]);
  const { balance } = useContext(Balance);
  useEffect(() => {
    const fetchRates = async () => {
      try {
        const response = await axios.get(
          'https://api.freecurrencyapi.com/v1/latest',
          {
            params: {
              apikey: 'fca_live_GMPU66T3x9xtDWwrmyzkdHEn86CRD6KBjV2jqlub',
              base_currency: 'USD',
              currencies: 'RUB,EUR',
            },
          }
        );

        const rubRate = response.data.data.RUB;
        const eurRate = response.data.data.EUR;

        setCurrencies([
          {
            code: 'RUB',
            purchase: rubRate * 0.99,
            sale: rubRate * 1.01,
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
        <div className={clsx(styles.asideContentBalance)}>
          <h5 className={clsx(styles.asideContentBalanceTitle)}>
            Your balance
          </h5>
          <span className={clsx(styles.asideContentBalanceItem)}>
            ₴ {balance}
          </span>
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
