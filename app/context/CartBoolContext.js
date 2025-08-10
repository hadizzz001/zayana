"use client"
import { createContext, useContext, useState } from 'react';

const CartBoolContext = createContext();

export const BooleanProvider = ({ children }) => {
  const [isBooleanValue, setBooleanValue] = useState(true);  

  return (
    <CartBoolContext.Provider value={{ isBooleanValue, setBooleanValue }}>
      {children}
    </CartBoolContext.Provider>
  );
};

export const useBooleanValue = () => {
  return useContext(CartBoolContext);
};
