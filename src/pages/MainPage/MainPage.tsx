import type { FC } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import { useMediaQuery } from '@mui/material';

import Header from '../../components/Main/MainPageComponents/Header';
import SideBar, {
  type NavigationPage,
} from '../../components/Main/MainPageComponents/SideBar';

import styles from '../../components/Main/mainPage.module.css';
import { useAnimateOnScroll } from '../../AnimateWatcher';

const MainPage: FC = () => {
  const navigate = useNavigate();
  useAnimateOnScroll();
  const isMobile = useMediaQuery('(max-width:768px)');

  const handleNavigate = (page: NavigationPage) => {
    if (page === 'finances' && !isMobile) {
      navigate('/main/home');
      return;
    }
    navigate(`/main/${page}`);
  };

  return (
    <div className={clsx(styles.wrapper)}>
      <Header />
      <main className={clsx(styles.mainPage)}>
        <SideBar onNavigate={handleNavigate} />
        <Outlet />
      </main>
    </div>
  );
};

export default MainPage;
