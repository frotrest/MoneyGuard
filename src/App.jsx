import { useContext } from 'react';
import LoginPage from './components/Login/Login';
import MainPage from './components/Main/MainPage';
import { Alert, Snackbar, Fade } from '@mui/material';
import RegisterPage from './components/Register/Register';
import AuthContext from './Contexts/Auth';
import AuthProvider from './Contexts/AuthProvider';
import CircularProgress from '@mui/material/CircularProgress';
import { useAnimateOnScroll } from './AnimateWatcher';
import BalanceProvider from './Contexts/BalanceProvider';
import ModalProvider from './Contexts/ModalProvider';

function AppContent() {
  const {
    currentPage,
    isAlert,
    setIsAlert,
    login,
    setCurrentPage,
    alertType,
    loader,
  } = useContext(AuthContext);
  useAnimateOnScroll([currentPage]);
  if (loader) {
    return (
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <CircularProgress sx={{ color: '#8d52da' }} size={120} />
      </div>
    );
  }
  return (
    <>
      {currentPage === 'login' && (
        <>
          <LoginPage
            isLogin={login}
            onRegister={() => setCurrentPage('register')}
          />
        </>
      )}
      {currentPage === 'register' && (
        <>
          <RegisterPage />
        </>
      )}
      {currentPage === 'main' && <MainPage />}
      <Snackbar
        open={Boolean(isAlert)}
        autoHideDuration={3000}
        onClose={() => setIsAlert('')}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        TransitionComponent={Fade}
      >
        <Alert
          severity={alertType === 'error' ? 'error' : 'success'}
          onClose={() => setIsAlert('')}
        >
          {isAlert}
        </Alert>
      </Snackbar>
    </>
  );
}

const App = () => {
  return (
    <AuthProvider>
      <BalanceProvider>
        <ModalProvider>
          <AppContent />
        </ModalProvider>
      </BalanceProvider>
    </AuthProvider>
  );
};

export default App;
