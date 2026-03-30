import { useState } from 'react';
import AuthContext from './Auth';

const AuthProvider = ({ children }) => {
  const [loader, setLoader] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem("isLogin") === 'true';
  });
  const [alertType, setAlertType] = useState('error');
  const [isAlert, setIsAlert] = useState('');
  const [currentPage, setCurrentPage] = useState(() => {
    return localStorage.getItem("isLogin") === 'true' ? 'main' : 'login';
  });
  const [accounts, setAccounts] = useState([
    { email: 'test@gmail.com', password: 'test' },
    { email: 'roman@gmail.com', password: '12345' },
    { email: 'admin@gmail.com', password: 'admin' },
  ]);

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
      setIsAlert("You've successfully logged into your account");
      setCurrentPage('main');
    } else {
      setIsAlert("Incorrect password or you've left empty fields!");
    }
    setLoader(false);
  };

  const register = async (name, email, password) => {
    setLoader(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const exists = accounts.find((user) => user.email === email);

    if (exists) {
      setIsAlert('Account with this email already exists!');
      return;
    }

    setAccounts([...accounts, { email, password }]);
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
