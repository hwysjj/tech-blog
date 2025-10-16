import React from 'react';
import Giscus from '@giscus/react';
import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../theme/ThemeProvider';

export const CommentSection: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { mode } = useTheme();

  // 注意：你需要替换这些值为你自己的 GitHub 仓库信息
  // 请参考 https://giscus.app 获取配置
  const REPO = 'your-username/your-repo'; // 替换为你的仓库
  const REPO_ID = 'your-repo-id'; // 替换为你的仓库 ID
  const CATEGORY = 'General'; // 替换为你的 Discussion 分类
  const CATEGORY_ID = 'your-category-id'; // 替换为你的分类 ID

  return (
    <Box sx={{ mt: 6 }}>
      <Typography variant="h5" gutterBottom>
        {t('post.comments')}
      </Typography>
      <Giscus
        repo={REPO}
        repoId={REPO_ID}
        category={CATEGORY}
        categoryId={CATEGORY_ID}
        mapping="pathname"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="top"
        theme={mode === 'light' ? 'light' : 'dark'}
        lang={i18n.language}
        loading="lazy"
      />
    </Box>
  );
};
