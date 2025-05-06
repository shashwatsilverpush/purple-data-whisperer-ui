
import React from 'react';
import { useParams } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { QnASection } from '@/components/QnASection';

const QnAPage: React.FC = () => {
  const { sourceId } = useParams();

  return (
    <Layout>
      <div className="container mx-auto py-6">
        <QnASection dataSourceId={sourceId} />
      </div>
    </Layout>
  );
};

export default QnAPage;
