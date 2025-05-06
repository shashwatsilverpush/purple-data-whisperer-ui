
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import { mockData } from '@/services/mockData';
import { DataSource } from '@/types/DataSource';
import { EditDataSourceModal } from '@/components/modals/EditDataSourceModal';

const EditDataSource: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [dataSource, setDataSource] = useState<DataSource | undefined>();
  const [isModalOpen, setIsModalOpen] = useState(true);

  useEffect(() => {
    if (id) {
      // Find the data source in the mock data
      const findSource = (sources: DataSource[]): DataSource | undefined => {
        for (const source of sources) {
          if (source.id === id) return source;
          if (source.children) {
            const found = findSource(source.children);
            if (found) return found;
          }
        }
        return undefined;
      };
      
      const foundSource = findSource(mockData);
      setDataSource(foundSource);
      
      if (!foundSource) {
        toast({
          title: "Data Source Not Found",
          description: "The data source you are trying to edit does not exist.",
          variant: "destructive",
        });
        navigate('/');
      }
    }
  }, [id, navigate]);

  const handleSave = (id: string, updatedData: any) => {
    // In a real app, this would update the data source on the server
    toast({
      title: "Data Source Updated",
      description: "The data source has been successfully updated.",
    });
    navigate('/');
  };

  const handleClose = () => {
    setIsModalOpen(false);
    navigate('/');
  };

  return (
    <Layout>
      <div className="container mx-auto py-6">
        {dataSource ? (
          <EditDataSourceModal
            isOpen={isModalOpen}
            onClose={handleClose}
            dataSource={dataSource}
            onSave={handleSave}
          />
        ) : (
          <Card className="p-6 text-center">
            <p className="mb-4">Loading data source...</p>
            <Button onClick={() => navigate('/')}>Return to Dashboard</Button>
          </Card>
        )}
      </div>
    </Layout>
  );
};

export default EditDataSource;
