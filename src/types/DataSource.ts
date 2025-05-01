
export type SourceType = 'Website' | 'Manual QnA' | 'CSV';

export interface DataSource {
  id: string;
  serialNumber: number;
  sourceType: SourceType;
  name: string;
  isActive: boolean;
  lastUpdated: string;
  category: string;
  subCategory: string;
  tags: string[];
  parentId?: string;
  isFolder?: boolean;
  children?: DataSource[];
}
