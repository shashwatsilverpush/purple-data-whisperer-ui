
import { DataSource, SourceType } from '@/types/DataSource';

export const generateMockData = (): DataSource[] => {
  const websites: DataSource[] = [
    {
      id: 'web-1',
      serialNumber: 1,
      sourceType: 'Website',
      name: 'https://example.com',
      isActive: true,
      lastUpdated: '2025-04-28T10:23:45Z',
      category: 'E-commerce',
      subCategory: 'Electronics',
      tags: ['product', 'tech'],
      isFolder: true,
      children: [
        {
          id: 'web-1-1',
          serialNumber: 2,
          sourceType: 'Website',
          name: 'https://example.com/products',
          isActive: true,
          lastUpdated: '2025-04-27T15:30:20Z',
          category: 'E-commerce',
          subCategory: 'Electronics',
          tags: ['product', 'listing'],
          parentId: 'web-1'
        },
        {
          id: 'web-1-2',
          serialNumber: 3,
          sourceType: 'Website',
          name: 'https://example.com/support',
          isActive: true,
          lastUpdated: '2025-04-26T09:45:10Z',
          category: 'E-commerce',
          subCategory: 'Support',
          tags: ['help', 'faq'],
          parentId: 'web-1'
        }
      ]
    },
    {
      id: 'web-2',
      serialNumber: 4,
      sourceType: 'Website',
      name: 'https://techblog.com',
      isActive: false,
      lastUpdated: '2025-04-25T14:20:30Z',
      category: 'Blog',
      subCategory: 'Technology',
      tags: ['article', 'news'],
      isFolder: true,
      children: [
        {
          id: 'web-2-1',
          serialNumber: 5,
          sourceType: 'Website',
          name: 'https://techblog.com/ai',
          isActive: false,
          lastUpdated: '2025-04-24T11:15:40Z',
          category: 'Blog',
          subCategory: 'AI',
          tags: ['ai', 'machine learning'],
          parentId: 'web-2'
        }
      ]
    }
  ];

  const manualQnAs: DataSource[] = [
    {
      id: 'qna-1',
      serialNumber: 6,
      sourceType: 'Manual QnA',
      name: 'How do I reset my password?',
      isActive: true,
      lastUpdated: '2025-04-23T16:30:00Z',
      category: 'Account',
      subCategory: 'Security',
      tags: ['password', 'login']
    },
    {
      id: 'qna-2',
      serialNumber: 7,
      sourceType: 'Manual QnA',
      name: 'What payment methods do you accept?',
      isActive: true,
      lastUpdated: '2025-04-22T09:10:15Z',
      category: 'Payments',
      subCategory: 'Methods',
      tags: ['payment', 'checkout']
    },
    {
      id: 'qna-3',
      serialNumber: 8,
      sourceType: 'Manual QnA',
      name: 'How do I track my order?',
      isActive: true,
      lastUpdated: '2025-04-21T11:45:30Z',
      category: 'Orders',
      subCategory: 'Tracking',
      tags: ['orders', 'shipping']
    }
  ];

  const csvFiles: DataSource[] = [
    {
      id: 'csv-1',
      serialNumber: 9,
      sourceType: 'CSV',
      name: 'product_faqs.csv',
      isActive: true,
      lastUpdated: '2025-04-20T13:25:40Z',
      category: 'Products',
      subCategory: 'FAQs',
      tags: ['products', 'faqs'],
      isFolder: true,
      children: [
        {
          id: 'csv-1-1',
          serialNumber: 10,
          sourceType: 'Manual QnA',
          name: 'What is the warranty period?',
          isActive: true,
          lastUpdated: '2025-04-20T13:25:40Z',
          category: 'Products',
          subCategory: 'Warranty',
          tags: ['warranty', 'support'],
          parentId: 'csv-1'
        },
        {
          id: 'csv-1-2',
          serialNumber: 11,
          sourceType: 'Manual QnA',
          name: 'How do I return a product?',
          isActive: true,
          lastUpdated: '2025-04-20T13:25:40Z',
          category: 'Products',
          subCategory: 'Returns',
          tags: ['returns', 'refund'],
          parentId: 'csv-1'
        }
      ]
    },
    {
      id: 'csv-2',
      serialNumber: 12,
      sourceType: 'CSV',
      name: 'shipping_info.csv',
      isActive: false,
      lastUpdated: '2025-04-19T10:15:20Z',
      category: 'Shipping',
      subCategory: 'Information',
      tags: ['shipping', 'delivery'],
      isFolder: false
    }
  ];

  return [...websites, ...manualQnAs, ...csvFiles];
};

export const mockData = generateMockData();

export const getAllCategories = (): string[] => {
  const categorySet = new Set<string>();
  
  const addCategories = (sources: DataSource[]) => {
    sources.forEach(source => {
      categorySet.add(source.category);
      if (source.children) {
        addCategories(source.children);
      }
    });
  };
  
  addCategories(mockData);
  return Array.from(categorySet).sort();
};

export const getAllSubCategories = (): string[] => {
  const subCategorySet = new Set<string>();
  
  const addSubCategories = (sources: DataSource[]) => {
    sources.forEach(source => {
      subCategorySet.add(source.subCategory);
      if (source.children) {
        addSubCategories(source.children);
      }
    });
  };
  
  addSubCategories(mockData);
  return Array.from(subCategorySet).sort();
};

export const getAllTags = (): string[] => {
  const tagSet = new Set<string>();
  
  const addTags = (sources: DataSource[]) => {
    sources.forEach(source => {
      source.tags.forEach(tag => tagSet.add(tag));
      if (source.children) {
        addTags(source.children);
      }
    });
  };
  
  addTags(mockData);
  return Array.from(tagSet).sort();
};
