import React, {
  createContext,
  FC,
  ReactElement,
  ReactNode,
  useState,
} from "react";

// Create a context

// Define types for your context
// interface User {
//   name: string;
//   age: number;
// }

// interface AuthContextType {
//   user?: User;
//   setUser?: React.Dispatch<React.SetStateAction<User>>;
//   theme: string;
//   setTheme: React.Dispatch<React.SetStateAction<string>>;
//   isLoggedIn: boolean;
//   setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
// }

// // Create a context with a default value
// export const AuthContextProvider = createContext<AuthContextType | undefined>(undefined);
// // Create a provider component with types
// interface AuthContextProps {
//   children: ReactNode;
// }

export const AuthContextProvider = createContext({});
// Create a provider component with types
interface AuthContextProps {
  children: ReactNode;
}

// // Create a provider component
export const AuthContext: FC<AuthContextProps> = ({ children }) => {
  const [user, setUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSignedIn, setisSignedIn] = useState(false);

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
