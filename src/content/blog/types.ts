export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  readTime: string;
  date: string;
  author: string;
  image: string;
  seoTitle?: string;
  seoDescription?: string;
} 