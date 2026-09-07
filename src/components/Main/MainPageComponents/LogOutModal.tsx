import { useState, useEffect, type FC, type MouseEvent } from 'react';
import clsx from 'clsx';
import { IoClose } from 'react-icons/io5';
import { Snackbar, Alert } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import styles from '../mainPage.module.css';
import Logo from '@assets/moneyguard.webp';
import { useAppDispatch } from '../../../store';
import { logoutThunk } from '../../../store/async/AuthThunk';
import { createPortal } from 'react-dom';

interface LogOutModalProps {
  open: boolean;
  onClose: () => void;
}

const LogOutModal: FC<LogOutModalProps> = ({ open, onClose }) => {
  const dispatch = useAppDispatch();

  const [localAlert, setLocalAlert] = useState<string>('');
  const [localAlertType] = useState<'error' | 'success' | 'info' | 'warning'>(
    'error'
  );

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

  const handleSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      await dispatch(logoutThunk()).unwrap();
      onClose();
    } catch (err) {
      setLocalAlert(typeof err === 'string' ? err : 'Logout failed');
    }
  };

  const modalRoot = document.getElementById('modal-root');
  if (!modalRoot) return null;

  return createPortal(
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

      <AnimatePresence>
        {open && (
          <motion.div
            className={clsx(styles.modalOverlay)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          >
            <motion.div
              className={clsx(styles.modalLogOutContent)}
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className={clsx(styles.modalContentMain)}>
                <img src={Logo} alt="Money Guard Logo" />
                <h2 className={clsx(styles.modalContentMainTitle)}>
                  Money Guard
                </h2>
              </div>

              <h1 className={clsx(styles.modalLogOutContentTitle)}>
                Are you sure you want to log out?
              </h1>

              <div className={clsx(styles.modalContentFormBtns)}>
                <button
                  type="button"
                  className={clsx(styles.modalContentFormBtnsItem)}
                  onClick={handleSubmit}
                >
                  Logout
                </button>
                <button
                  type="button"
                  className={clsx(styles.modalContentFormBtnsItem)}
                  onClick={onClose}
                >
                  Cancel
                </button>
              </div>

              <button
                type="button"
                className={clsx(styles.modalClose)}
                onClick={onClose}
              >
                <IoClose size={30} color="rgba(251, 251, 251, 1)" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>,
    modalRoot
  );
};

export default LogOutModal;
