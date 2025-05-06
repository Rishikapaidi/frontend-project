import React, { createContext, useState, ReactNode } from "react";

// UserRole supports only "provider", "customer", or null
export type UserRole = "provider" | "customer" | null;

export interface UserContextProps {
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
}

export const UserContext = createContext<UserContextProps>({
  userRole: null,
  setUserRole: () => {},
});

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [userRole, setUserRole] = useState<UserRole>(null);
  return (
    <UserContext.Provider value={{ userRole, setUserRole }}>
      {children}
    </UserContext.Provider>
  );
};
