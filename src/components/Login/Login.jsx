import clsx from 'clsx';
import styles from './login.module.css';
import Logo from '@assets/moneyguard.png';
import { useState } from 'react';
import Container from '../../Container';
import { MdEmail } from 'react-icons/md';
import { FaLock } from 'react-icons/fa';

const LoginPage = ({ isLogin, onRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    isLogin(email, password);
    setEmail('');
    setPassword('');
  };
  return (
    <>
      <section className={clsx(styles.loginPage)}>
        <Container className={clsx(styles.loginPageContent)}>
          <div className={clsx(styles.loginBox)}>
            <img src={Logo} alt="logo" className={clsx(styles.loginBoxLogo)} />
            <h1 className={clsx(styles.loginBoxTitle)}>Money Guard</h1>
            <form className={clsx(styles.loginForm)} onSubmit={handleSubmit}>
              <label className={clsx(styles.loginFormLabel)}>
                <MdEmail color="rgba(255, 255, 255, 0.4)" size={24} />
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className={clsx(styles.loginFormInput)}
                  aria-label="Email"
                  placeholder="E-mail"
                />
              </label>
              <label className={clsx(styles.loginFormLabel)}>
                <FaLock color="rgba(255, 255, 255, 0.4)" size={24} />
                <input
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className={clsx(styles.loginFormInput)}
                  aria-label="Password"
                  placeholder="Password"
                />
              </label>
              <div className={clsx(styles.formBtns)}>
                <button className={clsx(styles.loginFormBtn)} type="submit">
                  Log in
                </button>
                <button
                  className={clsx(styles.regFormBtn)}
                  onClick={onRegister}
                  type="button"
                >
                  Register
                </button>
              </div>
            </form>
          </div>
        </Container>
      </section>
    </>
  );
};

export default LoginPage;
