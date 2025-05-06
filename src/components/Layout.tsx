
import React from 'react';
import { NavBar } from './NavBar';
import { AppSidebar } from './AppSidebar';
import { SidebarTrigger } from './ui/sidebar';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-background">
      <AppSidebar />
      <div className="ml-0 lg:ml-60 min-h-screen flex flex-col">
        <NavBar />
        <SidebarTrigger className="fixed top-4 left-4 z-30 lg:hidden" />
        <main className="container mx-auto py-6 px-4 md:px-6 flex-1">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
