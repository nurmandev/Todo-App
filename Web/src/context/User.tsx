import React, { createContext, useState, ReactNode } from "react";

interface IUser {
  userId: string;
  name: string;
  email: string;
}
// Define the context types
interface UserContextType {
  user: IUser | null;
  setUser: (value: IUser) => void;
  logout: () => void;
}

// Create the context with a default value of null
const UserContext = createContext<UserContextType | undefined>(undefined);

// UserProvider Component
interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<IUser | null>(null);

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <UserContext.Provider value={{ user, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the UserContext
export const useUser = () => {
  const context = React.useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
