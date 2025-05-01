
import React from 'react';
import { NavBar } from './NavBar';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      <main className="container mx-auto py-6 px-4 md:px-6">
        {children}
      </main>
    </div>
  );
};

export default Layout;
