import { useState } from 'react';
import AuthContext from './Auth';

const AuthProvider = ({ children }) => {
  const [loader, setLoader] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('isLogin') === 'true';
  });
  const [alertType, setAlertType] = useState('error');
  const [isAlert, setIsAlert] = useState('');
  const [currentPage, setCurrentPage] = useState(() => {
    return localStorage.getItem('isLogin') === 'true' ? 'main' : 'login';
  });
  const [accounts, setAccounts] = useState(() => {
    const saved = localStorage.getItem('accounts');
    const lastReset = localStorage.getItem('accounts_lastReset');

    if (lastReset) {
      const diffDays = (Date.now() - Number(lastReset)) / (1000 * 60 * 60 * 24);
      if (diffDays >= 3) {
        localStorage.removeItem('accounts');
        localStorage.removeItem('currentUserEmail');
        localStorage.removeItem('currentUserName');
        localStorage.setItem('isLogin', 'false');
      }
    }
    return saved
      ? JSON.parse(saved)
      : [
          { name: 'Test', email: 'test@gmail.com', password: 'test' },
          { name: 'Roman', email: 'roman@gmail.com', password: '12345' },
          { name: 'Admin', email: 'admin@gmail.com', password: 'admin' },
        ];
  });
  const [currentUserName, setCurrentUserName] = useState(
    localStorage.getItem('currentUserName') || ''
  );

  const logout = () => {
    setIsAuthenticated(false);
    setCurrentPage('login');
    localStorage.setItem('isLogin', 'false');
    localStorage.removeItem('currentUserName');
    localStorage.removeItem('currentUserEmail');
    setCurrentUserName('');
    setAlertType('success');
    setIsAlert("You've successfully logged out");
  };

  const login = async (email, password) => {
    setLoader(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const found = accounts.find(
      (user) => user.email === email && user.password === password
    );
    if (found) {
      setIsAuthenticated(true);
      setIsAlert('');
      localStorage.setItem('isLogin', 'true');
      localStorage.setItem('currentUserName', found.name);
      localStorage.setItem('currentUserEmail', found.email);
      localStorage.setItem('accounts_lastReset', Date.now());
      setCurrentUserName(found.name);
      setAlertType('success');
      setIsAlert("You've successfully logged into your account");
      setCurrentPage('main');
    } else {
      setAlertType('error');
      setIsAlert("Incorrect password or you've left empty fields!");
    }
    setLoader(false);
  };

  const register = async (name, email, password) => {
    setLoader(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const exists = accounts.find((user) => user.email === email || user.name === name);

    if (exists) {
      setAlertType('error');
      setIsAlert('Account with this email already exists!');
      setLoader(false);
      return;
    }

    setAccounts([...accounts, { name, email, password }]);
    localStorage.setItem(
      'accounts',
      JSON.stringify([...accounts, { name, email, password }])
    );
    localStorage.setItem('accounts_lastReset', Date.now());
    setCurrentPage('login');
    setLoader(false);
  };

  return (
    <AuthContext.Provider
      value={{
        accounts,
        isAuthenticated,
        currentPage,
        isAlert,
        login,
        register,
        setCurrentPage,
        setIsAlert,
        alertType,
        setAlertType,
        loader,
        setLoader,
        logout,
        currentUserName,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
