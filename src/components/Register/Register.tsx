import type { FC } from 'react';
import { useState } from 'react';
import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';
import { FaUserAlt, FaLock } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { LinearProgress } from '@mui/material';
import styles from './register.module.css';
import Logo from '@assets/moneyguard.webp';
import Container from '../../Container';
import { useAppDispatch } from '../../store';
import { registerThunk } from '../../store/async/AuthThunk';
import { setIsAlert, setAlertType } from '../../store/slices/AuthSlice';

const Register: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [strength, setStrength] = useState<number>(0);

  const checkStrength = (value: string): void => {
    let score = 0;

    if (value.length >= 8) score += 25;
    if (/[A-Z]/.test(value)) score += 25;
    if (/[0-9]/.test(value)) score += 25;
    if (/[^A-Za-z0-9]/.test(value)) score += 25;

    setStrength(score);
  };

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const value = e.target.value;
    setPassword(value);
    checkStrength(value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name || !password || !email || !confirmPassword) {
      dispatch(setAlertType('error'));
      dispatch(setIsAlert('Please fill in all fields'));
      return;
    }

    if (password !== confirmPassword) {
      dispatch(setAlertType('error'));
      dispatch(setIsAlert('Passwords do not match!'));
      return;
    }

    const result = await dispatch(registerThunk({ name, email, password }));

    if (registerThunk.fulfilled.match(result)) {
      navigate('/login');
    }
  };

  return (
    <section className={clsx(styles.registerPage)}>
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
                backgroundColor: 'rgba(255, 255, 255, 0.6)',
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
                onClick={() => navigate('/login')}
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

export default Register;
