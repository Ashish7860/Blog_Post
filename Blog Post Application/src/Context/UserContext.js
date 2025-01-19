import React, { createContext, useContext } from 'react';

// Create a context for the developer's name
const UserContext = createContext();

// Create a custom hook to access the developer's name
export const useUserName = () => {
  return useContext(UserContext);
};

// Create a context provider component
export const UserProvider = ({ children }) => {
  const UserName = 'Ashutosh Yagyasaini';
  return (
    <UserContext.Provider value={UserName}>
      {children}
    </UserContext.Provider>
  );
};

 