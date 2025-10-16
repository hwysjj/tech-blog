import React, { useEffect, useState } from 'react';
import { Typography, Box, Chip, CircularProgress } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { PostCard } from '../components/PostCard/PostCard';
import type { PostMetadata } from '../types/post';
import { getAllPostsMetadata, getAllCategories, getAllTags } from '../utils/postLoader';

export const Home: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [posts, setPosts] = useState<PostMetadata[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPosts();
  }, [i18n.language]);

  const loadPosts = async () => {
    setLoading(true);
    const lang = i18n.language as 'zh' | 'en';
    const allPosts = await getAllPostsMetadata(lang);
    const allCategories = await getAllCategories(lang);
    const allTags = await getAllTags(lang);

    setPosts(allPosts);
    setCategories(allCategories);
    setTags(allTags);
    setLoading(false);
  };

  const filteredPosts = posts.filter((post) => {
    if (selectedCategory && post.frontmatter.category !== selectedCategory) {
      return false;
    }
    if (selectedTag && !post.frontmatter.tags.includes(selectedTag)) {
      return false;
    }
    return true;
  });

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(selectedCategory === category ? null : category);
    setSelectedTag(null);
  };

  const handleTagClick = (tag: string) => {
    setSelectedTag(selectedTag === tag ? null : tag);
    setSelectedCategory(null);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h3" component="h1" gutterBottom fontWeight={700}>
        {t('home.allPosts')}
      </Typography>

      {categories.length > 0 && (
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            {t('home.categories')}
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {categories.map((category) => (
              <Chip
                key={category}
                label={category}
                onClick={() => handleCategoryClick(category)}
                color={selectedCategory === category ? 'primary' : 'default'}
                variant={selectedCategory === category ? 'filled' : 'outlined'}
              />
            ))}
          </Box>
        </Box>
      )}

      {tags.length > 0 && (
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            {t('home.tags')}
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {tags.map((tag) => (
              <Chip
                key={tag}
                label={tag}
                onClick={() => handleTagClick(tag)}
                color={selectedTag === tag ? 'secondary' : 'default'}
                variant={selectedTag === tag ? 'filled' : 'outlined'}
                size="small"
              />
            ))}
          </Box>
        </Box>
      )}

      {filteredPosts.length === 0 ? (
        <Typography variant="body1" color="text.secondary" align="center" py={8}>
          {t('common.notFound')}
        </Typography>
      ) : (
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(3, 1fr)',
            },
            gap: 3,
          }}
        >
          {filteredPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </Box>
      )}
    </Box>
  );
};
