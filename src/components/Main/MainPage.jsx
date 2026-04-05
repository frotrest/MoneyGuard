import clsx from 'clsx';
import Header from './MainPageComponents/Header';
import SideBar from './MainPageComponents/SideBar';
import FinanceTable from './MainPageComponents/FinanceTable';
import Statistics from '../Statistics/Statistics';
import styles from './mainPage.module.css';
import { useState } from 'react';
import { useAnimateOnScroll } from '../../AnimateWatcher';

const MainPage = () => {
  const [activePage, setActivePage] = useState('home');
  useAnimateOnScroll([activePage]);
  return (
    <div className={clsx(styles.wrapper)}>
      <Header />
      <main className={clsx(styles.mainPage)}>
        <SideBar onNavigate={setActivePage} />
        {activePage === 'home' && <FinanceTable />}
        {activePage === 'statistics' && <Statistics />}
      </main>
    </div>
  );
};

export default MainPage;
