import CurrencyChart from './Chart';
import styles from '../mainPage.module.css';
import {
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from '@mui/material';
import clsx from 'clsx';
import Container from '../../../Container';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Finances = () => {
  const [currencies, setCurrencies] = useState([]);
  useEffect(() => {
    const fetchRates = async () => {
      try {
        const response = await axios.get(
          'https://api.freecurrencyapi.com/v1/latest',
          {
            params: {
              apikey: 'fca_live_15hBtQCwpwTDyi0PLfHHmHPhjQDfja2InJVt0Cuv',
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
    <Container
      className={clsx(
        styles.asideContentCurrencyExchange,
        styles.mobileCurrency
      )}
      dataAnimate="fadeIn"
    >
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
    </Container>
  );
};

export default Finances;
