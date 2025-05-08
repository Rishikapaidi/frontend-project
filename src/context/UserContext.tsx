import React, { createContext, useState, useContext, ReactNode, useEffect } from "react";

interface User {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  dateOfBirth: string;
  profilePic: string;
}

interface UserContextType {
  user: User;
  updateUser: (newUserData: Partial<User>) => void;
}

const defaultUser: User = {
  firstName: "Allen",
  lastName: "Baby",
  email: "allenbaby@gmail.com",
  phone: "",
  address: "",
  dateOfBirth: "",
  profilePic: ""
};

// Helper functions for localStorage
const loadUserFromStorage = (): User => {
  try {
    const storedUser = localStorage.getItem('userProfile');
    return storedUser ? JSON.parse(storedUser) : defaultUser;
  } catch (error) {
    console.error('Error loading user from localStorage:', error);
    return defaultUser;
  }
};

const saveUserToStorage = (user: User): void => {
  try {
    localStorage.setItem('userProfile', JSON.stringify(user));
  } catch (error) {
    console.error('Error saving user to localStorage:', error);
  }
};

export const UserContext = createContext<UserContextType>({
  user: defaultUser,
  updateUser: () => {},
});

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User>(loadUserFromStorage);

  const updateUser = (newUserData: Partial<User>) => {
    setUser(prevUser => {
      const updatedUser = { ...prevUser, ...newUserData };
      saveUserToStorage(updatedUser);
      return updatedUser;
    });
  };

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext); 