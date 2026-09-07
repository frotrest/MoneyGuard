import { useState, type FC } from 'react';
import clsx from 'clsx';
import { RxExit } from 'react-icons/rx';

import styles from '../mainPage.module.css';
import Container from '../../../Container';
import Logo from '@assets/moneyguard.webp';
import LogOutModal from './LogOutModal';
import { useAppSelector } from '../../../store';
import { selectCurrentUserName } from '../../../store/selectors';

const Header: FC = () => {
  const [isLogOut, setIsLogOut] = useState<boolean>(false);

  const currentUserName =
    useAppSelector(selectCurrentUserName) ||
    localStorage.getItem('currentUserName') ||
    'Guest';

  return (
    <>
      <LogOutModal open={isLogOut} onClose={() => setIsLogOut(false)} />
      
      <header className={clsx(styles.header)}>
        <Container className={clsx(styles.headerContent)} dataAnimate="fadeIn">
          <div className={clsx(styles.logoBlock)}>
            <img
              src={Logo}
              alt="Money Guard Logo"
              className={clsx(styles.headerContentImg)}
            />
            <h2 className={clsx(styles.logoBlockTitle)}>Money Guard</h2>
          </div>

          <div className={clsx(styles.manageProfile)}>
            <a
              href="#"
              className={clsx(styles.manageProfileLink)}
              id="manageProfile"
            >
              {currentUserName || 'Guest'}
            </a>
            <RxExit
              size={18}
              color="rgba(255, 255, 255, 0.6)"
              onClick={() => setIsLogOut(true)}
            />
            <a
              href="#"
              className={clsx(styles.manageProfileLinkExit)}
              onClick={() => setIsLogOut(true)}
            >
              Exit
            </a>
          </div>
        </Container>
      </header>
    </>
  );
};

export default Header;
