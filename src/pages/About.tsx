import React from 'react';
import { Typography, Box, Paper } from '@mui/material';
import { useTranslation } from 'react-i18next';

export const About: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Box>
      <Typography variant="h3" component="h1" gutterBottom fontWeight={700}>
        {t('about.title')}
      </Typography>

      <Paper sx={{ p: 4, mt: 3 }}>
        <Typography variant="body1" paragraph>
          {t('about.description')}
        </Typography>
      </Paper>
    </Box>
  );
};
