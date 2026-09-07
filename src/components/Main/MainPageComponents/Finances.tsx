import { useEffect, useState, type FC } from 'react';
import axios from 'axios';
import clsx from 'clsx';
import {
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from '@mui/material';
import CurrencyChart from './Chart';
import Container from '../../../Container';
import styles from '../mainPage.module.css';

interface CurrencyRate {
  code: string;
  purchase: number;
  sale: number;
}

interface CurrencyApiResponse {
  data: {
    EUR?: number;
    GBP?: number;
    RUB?: number;
    [key: string]: number | undefined;
  };
}

const CACHE_KEY = 'currency_rates_cache';
const CACHE_TIME_KEY = 'currency_rates_timestamp';
const ONE_HOUR = 60 * 60 * 1000;

const Finances: FC = () => {
  const [currencies, setCurrencies] = useState<CurrencyRate[]>([]);

  useEffect(() => {
    const fetchRates = async () => {
      const savedRates = localStorage.getItem(CACHE_KEY);
      const savedTime = localStorage.getItem(CACHE_TIME_KEY);
      const now = Date.now();

      if (savedRates && savedTime && now - Number(savedTime) < ONE_HOUR) {
        setCurrencies(JSON.parse(savedRates));
        return;
      }

      try {
        const response = await axios.get<CurrencyApiResponse>(
          'https://api.freecurrencyapi.com/v1/latest',
          {
            params: {
              apikey: 'fca_live_15hBtQCwpwTDyi0PLfHHmHPhjQDfja2InJVt0Cuv',
              base_currency: 'USD',
              currencies: 'EUR,GBP',
            },
          }
        );

        const eurRate = response.data.data.EUR || 1;
        const gbpRate = response.data.data.GBP || 1;

        const formattedCurrencies: CurrencyRate[] = [
          {
            code: 'EUR',
            purchase: eurRate * 0.99,
            sale: eurRate * 1.01,
          },
          {
            code: 'GBP',
            purchase: gbpRate * 0.99,
            sale: gbpRate * 1.01,
          },
        ];

        setCurrencies(formattedCurrencies);
        localStorage.setItem(CACHE_KEY, JSON.stringify(formattedCurrencies));
        localStorage.setItem(CACHE_TIME_KEY, String(now));
      } catch (error) {
        console.error('Error while receiving rates:', error);
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
