export interface PostFrontmatter {
  title: string;
  date: string;
  tags: string[];
  category: string;
  author: string;
  cover?: string;
  excerpt: string;
  lang: 'zh' | 'en';
}

export interface Post {
  id: string;
  frontmatter: PostFrontmatter;
  content: string;
  slug: string;
}

export interface PostMetadata {
  id: string;
  slug: string;
  frontmatter: PostFrontmatter;
}
