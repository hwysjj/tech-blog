import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Chip,
  Button,
  CircularProgress,
  Divider,
} from '@mui/material';
import { ArrowBack, CalendarToday } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import type { Post } from '../types/post';
import { getPostBySlug } from '../utils/postLoader';
import { MarkdownRenderer } from '../components/MarkdownRenderer/MarkdownRenderer';
import { TableOfContents } from '../components/TableOfContents/TableOfContents';
import { ReadingProgress } from '../components/ReadingProgress/ReadingProgress';
import { CommentSection } from '../components/CommentSection/CommentSection';

export const PostDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPost();
  }, [slug, i18n.language]);

  const loadPost = async () => {
    if (!slug) return;

    setLoading(true);
    const lang = i18n.language as 'zh' | 'en';
    const postData = await getPostBySlug(slug, lang);
    setPost(postData);
    setLoading(false);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!post) {
    return (
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <Typography variant="h4" gutterBottom>
          {t('common.notFound')}
        </Typography>
        <Button
          variant="contained"
          startIcon={<ArrowBack />}
          onClick={() => navigate('/')}
          sx={{ mt: 2 }}
        >
          {t('post.backToHome')}
        </Button>
      </Box>
    );
  }

  const { frontmatter, content } = post;
  const formattedDate = new Date(frontmatter.date).toLocaleDateString(
    frontmatter.lang === 'zh' ? 'zh-CN' : 'en-US',
    { year: 'numeric', month: 'long', day: 'numeric' }
  );

  return (
    <>
      <ReadingProgress />
      <Box>
        <Button
          startIcon={<ArrowBack />}
          onClick={() => navigate('/')}
          sx={{ mb: 3 }}
        >
          {t('post.backToHome')}
        </Button>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', lg: '3fr 1fr' },
            gap: 4,
          }}
        >
          <Box>
            <Typography variant="h3" component="h1" gutterBottom fontWeight={700}>
              {frontmatter.title}
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 1 }}>
              <CalendarToday fontSize="small" color="action" />
              <Typography variant="body2" color="text.secondary">
                {formattedDate}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                • {frontmatter.author}
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 4 }}>
              <Chip label={frontmatter.category} color="primary" />
              {frontmatter.tags.map((tag) => (
                <Chip key={tag} label={tag} variant="outlined" />
              ))}
            </Box>

            {frontmatter.cover && (
              <Box
                component="img"
                src={frontmatter.cover}
                alt={frontmatter.title}
                sx={{
                  width: '100%',
                  maxHeight: 400,
                  objectFit: 'cover',
                  borderRadius: 2,
                  mb: 4,
                }}
              />
            )}

            <Divider sx={{ mb: 4 }} />

            <MarkdownRenderer content={content} />

            <CommentSection />
          </Box>

          <Box sx={{ display: { xs: 'none', lg: 'block' } }}>
            <TableOfContents content={content} />
          </Box>
        </Box>
      </Box>
    </>
  );
};
