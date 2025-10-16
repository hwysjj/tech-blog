import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Chip,
  Box,
  CardActionArea,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import type { PostMetadata } from '../../types/post';
import { CalendarToday } from '@mui/icons-material';

interface PostCardProps {
  post: PostMetadata;
}

export const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const navigate = useNavigate();
  const { frontmatter, slug } = post;

  const handleClick = () => {
    navigate(`/post/${slug}`);
  };

  const formattedDate = new Date(frontmatter.date).toLocaleDateString(
    frontmatter.lang === 'zh' ? 'zh-CN' : 'en-US',
    { year: 'numeric', month: 'long', day: 'numeric' }
  );

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardActionArea onClick={handleClick} sx={{ flexGrow: 1 }}>
        {frontmatter.cover && (
          <CardMedia
            component="img"
            height="200"
            image={frontmatter.cover}
            alt={frontmatter.title}
            sx={{ objectFit: 'cover' }}
          />
        )}
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography gutterBottom variant="h5" component="h2">
            {frontmatter.title}
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, gap: 0.5 }}>
            <CalendarToday fontSize="small" color="action" />
            <Typography variant="body2" color="text.secondary">
              {formattedDate}
            </Typography>
          </Box>

          <Typography variant="body2" color="text.secondary" paragraph>
            {frontmatter.excerpt}
          </Typography>

          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 2 }}>
            <Chip
              label={frontmatter.category}
              size="small"
              color="primary"
              variant="outlined"
            />
            {frontmatter.tags.slice(0, 3).map((tag) => (
              <Chip key={tag} label={tag} size="small" variant="outlined" />
            ))}
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
