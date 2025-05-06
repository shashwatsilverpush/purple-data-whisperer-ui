
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  Sidebar, 
  SidebarContent, 
  SidebarFooter, 
  SidebarGroup, 
  SidebarGroupContent, 
  SidebarGroupLabel, 
  SidebarHeader, 
  SidebarMenu, 
  SidebarMenuButton, 
  SidebarMenuItem,
  useSidebar
} from '@/components/ui/sidebar';
import { BarChart3, Database, FileQuestion, Settings, LogOut } from 'lucide-react';
import { mockData, getAllCategories } from '@/services/mockData';
import { DataSource } from '@/types/DataSource';
import { Button } from './ui/button';

export const AppSidebar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isOpen } = useSidebar();
  const [activeItem, setActiveItem] = useState<string>('/');
  const [dataSources, setDataSources] = useState<DataSource[]>([]);

  useEffect(() => {
    setActiveItem(location.pathname);
  }, [location]);

  useEffect(() => {
    // Get data sources for the sidebar
    setDataSources(mockData);
  }, []);

  // Get source counts by type
  const websiteCount = mockData.filter(source => source.sourceType === 'Website').length;
  const manualQnACount = mockData.filter(source => source.sourceType === 'Manual QnA').length;
  const csvCount = mockData.filter(source => source.sourceType === 'CSV').length;

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
                
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    asChild
                    className="text-purple-800 hover:text-purple-900 hover:bg-purple-50"
                  >
                    <button>
                      <BarChart3 className="w-5 h-5 mr-2" />
                      <span>Analytics</span>
                    </button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    asChild
                    className="text-purple-800 hover:text-purple-900 hover:bg-purple-50"
                  >
                    <button>
                      <Settings className="w-5 h-5 mr-2" />
                      <span>Settings</span>
                    </button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
          
          <SidebarGroup>
            <SidebarGroupLabel>Data Source Types</SidebarGroupLabel>
            <SidebarGroupContent>
              <div className="space-y-1 px-2 text-sm">
                <div className="flex items-center justify-between text-gray-500 py-1">
                  <span>Website</span>
                  <span className="bg-purple-100 text-purple-800 text-xs px-2 py-0.5 rounded-full">
                    {websiteCount}
                  </span>
                </div>
                <div className="flex items-center justify-between text-gray-500 py-1">
                  <span>Manual Q&A</span>
                  <span className="bg-purple-100 text-purple-800 text-xs px-2 py-0.5 rounded-full">
                    {manualQnACount}
                  </span>
                </div>
                <div className="flex items-center justify-between text-gray-500 py-1">
                  <span>CSV</span>
                  <span className="bg-purple-100 text-purple-800 text-xs px-2 py-0.5 rounded-full">
                    {csvCount}
                  </span>
                </div>
              </div>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarGroup>
            <SidebarGroupLabel>Recent Data Sources</SidebarGroupLabel>
            <SidebarGroupContent>
              <div className="space-y-2 px-2">
                {mockData.slice(0, 5).map(source => (
                  <button 
                    key={source.id}
                    className="w-full text-left text-sm truncate text-gray-600 hover:text-purple-600 py-0.5"
                    onClick={() => navigate(`/edit-data-source/${source.id}`)}
                  >
                    {source.name}
                  </button>
                ))}
              </div>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        
        <SidebarFooter className="border-t border-gray-200">
          <Button 
            variant="outline" 
            className="flex items-center w-full"
          >
            <LogOut className="w-4 h-4 mr-2" />
            <span>Logout</span>
          </Button>
        </SidebarFooter>
      </Sidebar>
    </>
  );
};
