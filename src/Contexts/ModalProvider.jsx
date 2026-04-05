import ModalContext from './Modal';
import { useState } from 'react';

const ModalProvider = ({ children }) => {
  const [type, setType] = useState('+');
  const handleToggle = () => {
    setType(type === '+' ? '-' : '+');
  };
  return (
    <ModalContext.Provider value={{ type, setType, handleToggle }}>
      {children}
    </ModalContext.Provider>
  );
};

export default ModalProvider;
