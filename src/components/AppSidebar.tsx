
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  Sidebar, 
  SidebarContent, 
  SidebarGroup, 
  SidebarGroupContent, 
  SidebarGroupLabel, 
  SidebarHeader, 
  SidebarMenu, 
  SidebarMenuButton, 
  SidebarMenuItem,
  useSidebar
} from '@/components/ui/sidebar';
import { Database, FileQuestion } from 'lucide-react';

export const AppSidebar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isOpen } = useSidebar();
  const [activeItem, setActiveItem] = React.useState<string>('/');

  React.useEffect(() => {
    setActiveItem(location.pathname);
  }, [location]);

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black/30 z-10 lg:hidden" onClick={() => useSidebar().setIsOpen(false)} />
      )}
      
      <Sidebar className="border-r border-gray-200 bg-white">
        <SidebarHeader className="flex items-center justify-center border-b border-gray-200">
          <h1 className="text-xl font-bold text-purple-800">DataSource Manager</h1>
        </SidebarHeader>
        
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Navigation</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem isActive={activeItem === '/'}>
                  <SidebarMenuButton 
                    asChild
                    isActive={activeItem === '/'}
                    className="text-purple-800 hover:text-purple-900 hover:bg-purple-50"
                  >
                    <button onClick={() => navigate('/')}>
                      <Database className="w-5 h-5 mr-2" />
                      <span>Data Sources</span>
                    </button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                
                <SidebarMenuItem isActive={activeItem === '/qna' || activeItem.startsWith('/qna/')}>
                  <SidebarMenuButton 
                    asChild
                    isActive={activeItem === '/qna' || activeItem.startsWith('/qna/')}
                    className="text-purple-800 hover:text-purple-900 hover:bg-purple-50"
                  >
                    <button onClick={() => navigate('/qna')}>
                      <FileQuestion className="w-5 h-5 mr-2" />
                      <span>Q&A Library</span>
                    </button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </>
  );
};
