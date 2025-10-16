import matter from 'gray-matter';
import type { Post, PostFrontmatter, PostMetadata } from '../types/post';

// 获取所有文章的元数据
export const getAllPostsMetadata = async (lang: 'zh' | 'en'): Promise<PostMetadata[]> => {
  try {
    // 在静态博客中，我们需要在构建时知道所有文章
    // 这里我们使用 import.meta.glob 来获取所有 markdown 文件
    const postFiles = import.meta.glob('/public/posts/**/index.*.md', { as: 'raw' });

    const posts: PostMetadata[] = [];

    for (const path in postFiles) {
      // 检查文件是否匹配当前语言
      const fileName = `index.${lang}.md`;
      if (!path.endsWith(fileName)) continue;

      // 提取文件夹名称作为 slug
      const match = path.match(/\/posts\/([^\/]+)\//);
      if (!match) continue;

      const slug = match[1];
      const id = slug;

      try {
        const fileContent = await postFiles[path]();
        const { data } = matter(fileContent as string);

        posts.push({
          id,
          slug,
          frontmatter: {
            ...data,
            lang,
          } as PostFrontmatter,
        });
      } catch (error) {
        console.error(`Error loading post ${path}:`, error);
      }
    }

    // 按日期降序排序
    return posts.sort((a, b) => {
      return new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime();
    });
  } catch (error) {
    console.error('Error loading posts:', error);
    return [];
  }
};

// 获取单篇文章的完整内容
export const getPostBySlug = async (slug: string, lang: 'zh' | 'en'): Promise<Post | null> => {
  try {
    const response = await fetch(`/posts/${slug}/index.${lang}.md`);
    if (!response.ok) {
      return null;
    }

    const fileContent = await response.text();
    const { data, content } = matter(fileContent);

    return {
      id: slug,
      slug,
      frontmatter: {
        ...data,
        lang,
      } as PostFrontmatter,
      content,
    };
  } catch (error) {
    console.error(`Error loading post ${slug}:`, error);
    return null;
  }
};

// 按分类获取文章
export const getPostsByCategory = async (
  category: string,
  lang: 'zh' | 'en'
): Promise<PostMetadata[]> => {
  const allPosts = await getAllPostsMetadata(lang);
  return allPosts.filter((post) => post.frontmatter.category === category);
};

// 按标签获取文章
export const getPostsByTag = async (
  tag: string,
  lang: 'zh' | 'en'
): Promise<PostMetadata[]> => {
  const allPosts = await getAllPostsMetadata(lang);
  return allPosts.filter((post) => post.frontmatter.tags.includes(tag));
};

// 获取所有分类
export const getAllCategories = async (lang: 'zh' | 'en'): Promise<string[]> => {
  const allPosts = await getAllPostsMetadata(lang);
  const categories = new Set(allPosts.map((post) => post.frontmatter.category));
  return Array.from(categories);
};

// 获取所有标签
export const getAllTags = async (lang: 'zh' | 'en'): Promise<string[]> => {
  const allPosts = await getAllPostsMetadata(lang);
  const tags = new Set(allPosts.flatMap((post) => post.frontmatter.tags));
  return Array.from(tags);
};
