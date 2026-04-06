import clsx from 'clsx';
import Header from './MainPageComponents/Header';
import SideBar from './MainPageComponents/SideBar';
import FinanceTable from './MainPageComponents/FinanceTable';
import Statistics from '../Statistics/Statistics';
import Finances from './MainPageComponents/Finances';
import styles from './mainPage.module.css';
import { useState } from 'react';
import { useAnimateOnScroll } from '../../AnimateWatcher';
import { useMediaQuery } from '@mui/material';

const MainPage = () => {
  const [activePage, setActivePage] = useState('home');
  useAnimateOnScroll([activePage]);
  const isMobile = useMediaQuery('(max-width:768px)');
  return (
    <div className={clsx(styles.wrapper)}>
      <Header />
      <main className={clsx(styles.mainPage)}>
        <SideBar onNavigate={setActivePage} />
        {activePage === 'home' && <FinanceTable />}
        {activePage === 'statistics' && <Statistics />}
        {activePage === 'finances' && (isMobile ? <Finances /> : <FinanceTable />)}
      </main>
    </div>
  );
};

export default MainPage;
