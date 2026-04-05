import clsx from 'clsx';
import styles from './register.module.css';
import Container from '../../Container';
import Logo from '@assets/moneyguard.png';
import { useContext, useState } from 'react';
import { FaUserAlt, FaLock } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { LinearProgress } from '@mui/material';
import AuthContext from '../../Contexts/Auth';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [strength, setStrength] = useState(0);

  const { register, setCurrentPage, setIsAlert, setAlertType } =
    useContext(AuthContext);

  const checkStrength = (value) => {
    let score = 0;

    if (value.length >= 8) score += 25;
    if (/[A-Z]/.test(value)) score += 25;
    if (/[0-9]/.test(value)) score += 25;
    if (/[^A-Za-z0-9]/.test(value)) score += 25;

    setStrength(score);
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    checkStrength(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !password || !email || !confirmPassword) {
      setIsAlert('Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      setIsAlert('Passwords do not match!');
      return;
    }
    setAlertType('success');
    setIsAlert('Account has been created successfully!');
    register(name, email, password);
    setCurrentPage('login');
  };

  return (
    <section className={clsx(styles.registerPage)} data-animate="fadeIn">
      <Container className={clsx(styles.registerPageContent)}>
        <div className={clsx(styles.registerBox)}>
          <img src={Logo} alt="logo" className={clsx(styles.registerBoxImg)} />
          <h1 className={clsx(styles.registerBoxTitle)}>Money Guard</h1>
          <form className={clsx(styles.registerForm)} onSubmit={handleSubmit}>
            <div className={clsx(styles.registerFormFields)}>
              <label className={clsx(styles.registerFormLabel)}>
                <FaUserAlt size={24} color="rgba(255, 255, 255, 0.4)" />
                <input
                  type="text"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Name"
                  aria-label="name"
                  className={clsx(styles.registerFormLabelInput)}
                />
              </label>
              <label className={clsx(styles.registerFormLabel)}>
                <MdEmail size={24} color="rgba(255, 255, 255, 0.4)" />
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="E-mail"
                  aria-label="email"
                  className={clsx(styles.registerFormLabelInput)}
                />
              </label>
              <label className={clsx(styles.registerFormLabel)}>
                <FaLock size={24} color="rgba(255, 255, 255, 0.4)" />
                <input
                  type="password"
                  value={password}
                  onChange={handleChange}
                  placeholder="Password"
                  aria-label="password"
                  className={clsx(styles.registerFormLabelInput)}
                />
              </label>
              <label className={clsx(styles.registerFormLabel)}>
                <FaLock size={24} color="rgba(255, 255, 255, 0.4)" />
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm password"
                  aria-label="confirm password"
                  className={clsx(styles.registerFormLabelInput)}
                />
              </label>
            </div>
            <LinearProgress
              variant="determinate"
              value={strength}
              sx={{
                height: 5,
                borderRadius: 5,
                marginTop: 1,
                boxShadow: '0px 1px 8px 0px rgba(255, 199, 39, 0.5)',
                backgroundColor: 'rgba(255, 255, 255, 0.6)', // Фон дорожки,
                width: '100%',
                '& .MuiLinearProgress-bar': {
                  backgroundColor:
                    strength < 50
                      ? '#ff3d00'
                      : strength < 75
                        ? '#ffc727'
                        : '#87f00f',
                },
              }}
            />
            {confirmPassword && confirmPassword !== password && (
              <h2 className={clsx(styles.registerFormPassword)}>
                Passwords do not match
              </h2>
            )}
            <div className={clsx(styles.formBtns)}>
              <button className={clsx(styles.regFormBtn)} type="submit">
                Register
              </button>
              <button
                className={clsx(styles.loginFormBtn)}
                type="button"
                onClick={() => setCurrentPage('login')}
              >
                Log in
              </button>
            </div>
          </form>
        </div>
      </Container>
    </section>
  );
};

export default RegisterPage;
