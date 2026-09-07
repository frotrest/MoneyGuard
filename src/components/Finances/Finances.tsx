import { useEffect, useState, type FC } from 'react';
import clsx from 'clsx';
import axios from 'axios';
import {
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from '@mui/material';

import styles from '../Main/mainPage.module.css';
import CurrencyChart from '../Main/MainPageComponents/Chart.tsx';
import Container from '../../Container.tsx';

interface CurrencyRate {
  code: string;
  purchase: number;
  sale: number;
}

interface ExchangeApiResponse {
  rates: {
    UAH: number;
    EUR: number;
    [key: string]: number;
  };
}

const Finances: FC = () => {
  const [currencies, setCurrencies] = useState<CurrencyRate[]>([]);

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const response = await axios.get<ExchangeApiResponse>(
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
        console.error('Error while receiving rates:', error);
      }
    };

    fetchRates();
  }, []);

  return (
    <div className={clsx(styles.financesPageContainer)} data-animate="fadeIn">
      <Container>
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
    </div>
  );
};

export default Finances;
