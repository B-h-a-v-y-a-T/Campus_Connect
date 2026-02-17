"use client";

import { UserProvider } from "@/context/user-context";
import Navbar from "@/components/layout/navbar";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <UserProvider>
      <Navbar />
      <main className="pt-16 min-h-screen">{children}</main>
    </UserProvider>
  );
}
