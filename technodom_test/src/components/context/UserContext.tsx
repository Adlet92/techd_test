
import React, { ReactNode, createContext, useContext, useState } from "react";

const LOCAL_STORAGE_KEY = "username";

interface UserContextProps {
  username: string | null;
  setUsername: (username: string | null) => void;
  clearUserData: () => void;
}

const UserContext = createContext<UserContextProps>({
  username: null,
  setUsername: () => {},
  clearUserData: () => {},
});

export const useUser = () => {
  return useContext(UserContext);
};

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [username, setUsernameState] = useState<string | null>(() => {
    const savedUsername = localStorage.getItem(LOCAL_STORAGE_KEY);
    return savedUsername || null;
  });

  const setUsername = (newUsername: string | null) => {
    setUsernameState(newUsername);
    if (newUsername) {
      localStorage.setItem(LOCAL_STORAGE_KEY, newUsername);
    } else {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    }
  };

  const clearUserData = () => {
    setUsername(null);
  };

  return (
    <UserContext.Provider value={{ username, setUsername, clearUserData }}>
      {children}
    </UserContext.Provider>
  );
};
