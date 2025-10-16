import React, { useEffect, useState } from 'react';
import {
  Typography,
  List,
  ListItemButton,
  ListItemText,
  Paper,
} from '@mui/material';
import { useTranslation } from 'react-i18next';

interface TocItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  content: string;
}

export const TableOfContents: React.FC<TableOfContentsProps> = ({ content }) => {
  const { t } = useTranslation();
  const [toc, setToc] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    // 解析 Markdown 中的标题
    const headingRegex = /^(#{1,6})\s+(.+)$/gm;
    const tocItems: TocItem[] = [];
    let match;

    while ((match = headingRegex.exec(content)) !== null) {
      const level = match[1].length;
      const text = match[2].trim();
      // 生成 ID（简单处理）
      const id = text.toLowerCase().replace(/[^\w\u4e00-\u9fa5]+/g, '-');

      tocItems.push({ id, text, level });
    }

    setToc(tocItems);
  }, [content]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-80px 0px -80% 0px' }
    );

    // 观察所有标题元素
    const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
    headings.forEach((heading) => observer.observe(heading));

    return () => observer.disconnect();
  }, [toc]);

  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  if (toc.length === 0) return null;

  return (
    <Paper
      sx={{
        p: 2,
        position: 'sticky',
        top: 80,
        maxHeight: 'calc(100vh - 100px)',
        overflowY: 'auto',
      }}
    >
      <Typography variant="h6" gutterBottom>
        {t('post.toc')}
      </Typography>
      <List dense>
        {toc.map((item) => (
          <ListItemButton
            key={item.id}
            onClick={() => handleClick(item.id)}
            selected={activeId === item.id}
            sx={{
              pl: (item.level - 1) * 2,
              borderLeft: activeId === item.id ? 2 : 0,
              borderColor: 'primary.main',
            }}
          >
            <ListItemText
              primary={item.text}
              primaryTypographyProps={{
                variant: item.level === 1 ? 'subtitle1' : 'body2',
                fontWeight: activeId === item.id ? 600 : 400,
              }}
            />
          </ListItemButton>
        ))}
      </List>
    </Paper>
  );
};
