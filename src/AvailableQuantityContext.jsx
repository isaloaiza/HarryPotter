import { createContext, useState } from 'react';

export const AvailableQuantityContext = createContext({
  availableQuantity: 0,
  setAvailableQuantity: () => {},
});

export const AvailableQuantityProvider = ({ children }) => {
  const [availableQuantity, setAvailableQuantity] = useState(15);
  

  return (
    <AvailableQuantityContext.Provider value={{ availableQuantity, setAvailableQuantity }}>
      {children}
    </AvailableQuantityContext.Provider>
  );
};

