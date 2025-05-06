
export type SourceType = 'Website' | 'Manual QnA' | 'CSV';

export interface DataSource {
  id: string;
  serialNumber: number;
  sourceType: SourceType;
  name: string;
  isActive: boolean;
  lastUpdated: string;
  category?: string;
  subCategory?: string;
  tags: string[];
  parentId?: string;
  isFolder?: boolean;
  children?: DataSource[];
  url?: string;
  qnaCount?: number;
}

export interface QnA {
  id: string;
  question: string;
  answer: string;
  sourceId: string;
  sourceName: string;
  sourceType: SourceType;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}
