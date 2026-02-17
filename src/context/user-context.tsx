"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { Role } from "@/lib/mock-data";

interface UserContextType {
  role: Role;
  setRole: (role: Role) => void;
  userName: string;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<Role>("student");

  const userName =
    role === "student"
      ? "Arjun Mehta"
      : role === "admin"
      ? "Dr. Ramesh Kumar"
      : "TechCorp Inc.";

  return (
    <UserContext.Provider value={{ role, setRole, userName }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within UserProvider");
  return context;
}
