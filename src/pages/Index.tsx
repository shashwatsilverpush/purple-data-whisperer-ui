
import React, { useState, useEffect } from 'react';
import { Layout } from '@/components/Layout';
import { SearchBar } from '@/components/SearchBar';
import { FilterBar } from '@/components/FilterBar';
import { DataSourceList } from '@/components/DataSourceList';
import { AddDataSourceModal } from '@/components/modals/AddDataSourceModal';
import { TestDataSourceModal } from '@/components/modals/TestDataSourceModal';
import { DeleteConfirmationModal } from '@/components/modals/DeleteConfirmationModal';
import { mockData, getAllCategories, getAllSubCategories, getAllTags } from '@/services/mockData';
import { DataSource } from '@/types/DataSource';
import { toast } from '@/hooks/use-toast';

const Index = () => {
  const [dataSources, setDataSources] = useState<DataSource[]>(mockData);
  const [filteredSources, setFilteredSources] = useState<DataSource[]>(mockData);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showTestModal, setShowTestModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [idsToDelete, setIdsToDelete] = useState<string[]>([]);
  const [sortField, setSortField] = useState('lastUpdated');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [showAllQnA, setShowAllQnA] = useState(false);
  const [selectedSourceType, setSelectedSourceType] = useState<string | null>(null);

  // Get filter options
  const categories = getAllCategories();
  const subCategories = getAllSubCategories();
  const tags = getAllTags();
  const sourceTypes = ['Website', 'Manual QnA', 'CSV'];

  // Apply filters and sort whenever data or filter settings change
  useEffect(() => {
    let filtered = [...dataSources];
    
    // Apply source type filter
    if (selectedSourceType) {
      filtered = filtered.filter(source => source.sourceType === selectedSourceType);
    }
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(source => 
        source.name.toLowerCase().includes(query)
      );
    }

    // Sort the filtered results
    filtered.sort((a, b) => {
      if (sortField === 'name') {
        return sortDirection === 'asc' 
          ? a.name.localeCompare(b.name) 
          : b.name.localeCompare(a.name);
      } else if (sortField === 'lastUpdated') {
        return sortDirection === 'asc'
          ? new Date(a.lastUpdated).getTime() - new Date(b.lastUpdated).getTime()
          : new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime();
      }
      return 0;
    });

    setFilteredSources(filtered);
  }, [dataSources, searchQuery, sortField, sortDirection, selectedSourceType, showAllQnA]);

  const handleFilterChange = (filterType: string, value: string) => {
    if (filterType === 'sourceType') {
      setSelectedSourceType(value === 'all' ? null : value);
    } else {
      toast({
        title: "Filter Applied",
        description: `${filterType}: ${value}`,
      });
    }
  };

  const handleSortChange = (field: string, direction: 'asc' | 'desc') => {
    setSortField(field);
    setSortDirection(direction);
  };

  const handleDelete = (ids: string[]) => {
    setIdsToDelete(ids);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    // Logic to delete data sources
    setDataSources(prevSources => {
      const deleteFromArray = (sources: DataSource[]): DataSource[] => {
        return sources.filter(source => {
          if (idsToDelete.includes(source.id)) return false;
          if (source.children) {
            source.children = deleteFromArray(source.children);
          }
          return true;
        });
      };
      
      const newSources = deleteFromArray([...prevSources]);
      return newSources;
    });
    
    toast({
      title: "Data Sources Deleted",
      description: `${idsToDelete.length} item(s) have been deleted.`,
      variant: "destructive",
    });
    
    setShowDeleteModal(false);
    setIdsToDelete([]);
  };

  const handleAddDataSource = (type: string, data: any) => {
    // Logic to add a new data source
    toast({
      title: "Data Source Added",
      description: `New ${type} data source has been added.`,
    });
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-purple-800">Data Sources</h1>
          <div className="w-72">
            <SearchBar 
              className="w-full" 
            />
          </div>
        </div>

        <FilterBar 
          sourceTypes={sourceTypes as any}
          categories={categories}
          subCategories={subCategories}
          tags={tags}
          onFilterChange={handleFilterChange}
          onSortChange={handleSortChange}
          onToggleShowAll={() => setShowAllQnA(!showAllQnA)}
          showAllQnA={showAllQnA}
          sortField={sortField}
          sortDirection={sortDirection}
          selectedSourceType={selectedSourceType}
          onAddDataSource={() => setShowAddModal(true)}
          onTestDataSource={() => setShowTestModal(true)}
        />

        <DataSourceList dataSources={filteredSources} onDelete={handleDelete} />
      </div>

      <AddDataSourceModal 
        isOpen={showAddModal} 
        onClose={() => setShowAddModal(false)} 
        onAddDataSource={handleAddDataSource}
      />

      <TestDataSourceModal 
        isOpen={showTestModal} 
        onClose={() => setShowTestModal(false)}
      />

      <DeleteConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={confirmDelete}
        itemCount={idsToDelete.length}
        includesFolders={true}
      />
    </Layout>
  );
};

export default Index;
