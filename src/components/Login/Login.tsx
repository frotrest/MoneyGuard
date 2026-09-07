import clsx from 'clsx';
import styles from './login.module.css';
import Logo from '@assets/moneyguard.webp';
import { useState } from 'react';
import Container from '../../Container';
import { MdEmail } from 'react-icons/md';
import { FaLock } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../store';
import { loginThunk } from '../../store/async/AuthThunk';

const Login = () => {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleSubmit: React.SubmitEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    dispatch(loginThunk({ email, password }));
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
                <Link to="/register" className={clsx(styles.regFormBtn)}>
                  Register
                </Link>
              </div>
            </form>
          </div>
        </Container>
      </section>
    </>
  );
};

export default Login;
