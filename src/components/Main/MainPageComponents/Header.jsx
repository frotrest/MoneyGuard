import clsx from 'clsx';
import styles from '../mainPage.module.css';
import Container from '../../../Container';
import Logo from '@assets/moneyguard.png';
import { RxExit } from 'react-icons/rx';
import AuthContext from '../../../Contexts/Auth';
import { useContext, useState } from 'react';
import LogOutModal from './LogOutModal';

const Header = () => {
  const [isLogOut, setIsLogOut] = useState(false);
  const { currentUserName } = useContext(AuthContext);

  return (
    <>
      {isLogOut && (
        <LogOutModal open={isLogOut} onClose={() => setIsLogOut(false)} />
      )}

      <header className={clsx(styles.header)}>
        <Container className={clsx(styles.headerContent)} dataAnimate="fadeIn">
          <div className={clsx(styles.logoBlock)}>
            <img
              src={Logo}
              alt="logo"
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
            <RxExit size={18} color="rgba(255, 255, 255, 0.6)" onClick={() => setIsLogOut(true)} />
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
