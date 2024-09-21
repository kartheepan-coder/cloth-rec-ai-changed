import React, { createContext, useState, FC, ReactNode } from "react";

// Define the shape of the AuthContext
interface AuthContextProps {
  user: object;
  setUser: React.Dispatch<React.SetStateAction<object>>;
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  isSignedIn: boolean;
  setisSignedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

// Create the context with a default value
export const AuthContextProvider = createContext<AuthContextProps | undefined>(
  undefined
);

// Define the props that will be passed to the AuthContext component
interface AuthProviderProps {
  children: ReactNode;
}

// AuthContext component
export const AuthContext: FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<object>({});
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isSignedIn, setisSignedIn] = useState<boolean>(false);

  return (
    <AuthContextProvider.Provider
      value={{
        user,
        setUser,
        isLoggedIn,
        setIsLoggedIn,
        isSignedIn,
        setisSignedIn,
      }}
    >
      {children}
    </AuthContextProvider.Provider>
  );
};
