import styles from '../mainPage.module.css';
import clsx from 'clsx';
import { useState, useContext, useEffect } from 'react';
import AuthContext from '../../../Contexts/Auth';
import { IoClose } from 'react-icons/io5';
import Logo from '@assets/moneyguard.png';
import { Snackbar, Alert } from '@mui/material';

const LogOutModal = ({ open, onClose }) => {
  const [localAlert, setLocalAlert] = useState('');
  const [localAlertType] = useState('error');
  const [closing, setClosing] = useState(false);

  const { logout } = useContext(AuthContext);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [open]);
  if (!open) return null;

  const handleClose = () => {
    setClosing(true);
    setTimeout(() => {
      setClosing(false);
      onClose();
    }, 1000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    logout();
    handleClose();
  };
  return (
    <>
      <Snackbar
        open={Boolean(localAlert)}
        autoHideDuration={3000}
        onClose={() => setLocalAlert('')}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          severity={localAlertType}
          onClose={() => setLocalAlert('')}
          variant="filled"
        >
          {localAlert}
        </Alert>
      </Snackbar>
      <div
        className={clsx(
          styles.modalOverlay,
          'animate__animated',
          closing ? 'animate__fadeOut' : 'animate__fadeIn'
        )}
        onClick={handleClose}
        data-animate="fadeIn"
      >
        <div
          className={clsx(styles.modalLogOutContent)}
          onClick={(e) => e.stopPropagation()}
        >
          <div className={clsx(styles.modalContentMain)}>
            <img src={Logo} alt="logo" />
            <h2 className={clsx(styles.modalContentMainTitle)}>Money Guard</h2>
          </div>
          <h1 className={clsx(styles.modalLogOutContentTitle)}>
            Are you sure you want to log out?
          </h1>
          <div className={clsx(styles.modalContentFormBtns)}>
            <button
              className={clsx(styles.modalContentFormBtnsItem)}
              onClick={handleSubmit}
            >
              Logout
            </button>
            <button
              className={clsx(styles.modalContentFormBtnsItem)}
              onClick={handleClose}
              type="button"
            >
              Cancel
            </button>
          </div>
          <button className={clsx(styles.modalClose)} onClick={handleClose}>
            <IoClose size={30} color="rgba(251, 251, 251, 1)" />
          </button>
        </div>
      </div>
    </>
  );
};

export default LogOutModal;
