# 技术博客 / Tech Blog

一个基于 React + TypeScript 构建的现代化个人技术博客，支持 Markdown 文章、深色/浅色主题切换、中英文双语等功能。

A modern personal tech blog built with React + TypeScript, featuring Markdown posts, dark/light theme toggle, bilingual support (Chinese/English), and more.

## ✨ 功能特性 / Features

- 📝 **Markdown 支持** - 使用 Markdown 编写文章，支持代码高亮
- 🎨 **主题切换** - 深色/浅色主题无缝切换
- 🌍 **国际化** - 支持中文和英文双语
- 🏷️ **分类标签** - 文章分类和标签筛选
- 📖 **目录导航** - 自动生成文章目录，快速定位
- 📊 **阅读进度** - 实时显示文章阅读进度
- 💬 **评论系统** - 集成 Giscus 评论（基于 GitHub Discussions）
- 📱 **响应式设计** - 完美适配桌面端和移动端
- ⚡ **性能优化** - 代码分割、懒加载，快速加载
- 🔍 **SEO 优化** - 完善的 meta 标签和 Open Graph 支持

## 🛠️ 技术栈 / Tech Stack

- **前端框架**: React 18
- **开发语言**: TypeScript
- **构建工具**: Vite
- **UI 组件库**: Material-UI (MUI)
- **路由管理**: React Router v6
- **国际化**: i18next + react-i18next
- **Markdown 渲染**: react-markdown
- **代码高亮**: rehype-highlight
- **评论系统**: Giscus

## 📦 项目结构 / Project Structure

```
tech-blog/
├── public/
│   └── posts/                    # Markdown 文章目录
│       └── 2024-01-15-example/
│           ├── index.zh.md       # 中文版文章
│           ├── index.en.md       # 英文版文章
│           └── cover.jpg         # 封面图（可选）
├── src/
│   ├── components/               # 可复用组件
│   │   ├── Layout/              # 布局组件
│   │   ├── PostCard/            # 文章卡片
│   │   ├── TableOfContents/     # 目录导航
│   │   ├── ReadingProgress/     # 阅读进度条
│   │   ├── CommentSection/      # Giscus 评论
│   │   ├── ThemeToggle/         # 主题切换
│   │   ├── LanguageToggle/      # 语言切换
│   │   └── MarkdownRenderer/    # Markdown 渲染器
│   ├── pages/
│   │   ├── Home.tsx             # 首页（文章列表）
│   │   ├── PostDetail.tsx       # 文章详情
│   │   ├── About.tsx            # 关于页面
│   │   └── NotFound.tsx         # 404 页面
│   ├── utils/
│   │   └── postLoader.ts        # Markdown 文件加载工具
│   ├── types/
│   │   └── post.ts              # 类型定义
│   ├── i18n/                    # 国际化配置
│   ├── theme/                   # MUI 主题配置
│   └── App.tsx
└── package.json
```

## 🚀 快速开始 / Getting Started

### 安装依赖 / Install Dependencies

```bash
npm install
```

### 启动开发服务器 / Start Development Server

```bash
npm run dev
```

项目将在 `http://localhost:5173` 启动。

The project will start at `http://localhost:5173`.

### 构建生产版本 / Build for Production

```bash
npm run build
```

### 预览生产构建 / Preview Production Build

```bash
npm run preview
```

## 📝 如何添加文章 / How to Add Posts

1. 在 `public/posts/` 目录下创建新的文章文件夹（建议使用日期-标题格式）：

```bash
mkdir -p public/posts/2024-01-20-my-new-post
```

2. 在文件夹中创建中英文 Markdown 文件：

```
public/posts/2024-01-20-my-new-post/
├── index.zh.md
└── index.en.md
```

3. 按照以下格式编写文章（包含 frontmatter）：

```markdown
---
title: "文章标题"
date: "2024-01-20"
tags: ["标签1", "标签2"]
category: "分类名称"
author: "作者名"
cover: "./cover.jpg"  # 可选
excerpt: "文章摘要"
---

# 文章标题

文章内容...
```

4. 刷新页面，新文章将自动出现在首页！

## 🎨 主题自定义 / Theme Customization

你可以在 `src/theme/theme.ts` 中自定义主题颜色和样式：

You can customize theme colors and styles in `src/theme/theme.ts`:

```typescript
const getThemeOptions = (mode: 'light' | 'dark'): ThemeOptions => ({
  palette: {
    primary: {
      main: '#1976d2', // 修改主色调
    },
    // ... 更多配置
  },
});
```

## 💬 配置评论系统 / Configure Comment System

1. 访问 [giscus.app](https://giscus.app) 获取你的配置
2. 在 `src/components/CommentSection/CommentSection.tsx` 中更新配置：

```typescript
const REPO = 'your-username/your-repo';
const REPO_ID = 'your-repo-id';
const CATEGORY = 'General';
const CATEGORY_ID = 'your-category-id';
```

## 🌐 部署 / Deployment

### Vercel (推荐 / Recommended)

1. 将代码推送到 GitHub
2. 在 Vercel 中导入项目
3. 点击部署

### Netlify

1. 将代码推送到 GitHub
2. 在 Netlify 中创建新站点
3. 设置构建命令：`npm run build`
4. 设置发布目录：`dist`

### 其他静态托管平台 / Other Static Hosting

构建后的文件在 `dist` 目录，可以部署到任何静态托管服务。

The built files are in the `dist` directory and can be deployed to any static hosting service.

## 📄 License

MIT License

## 🤝 贡献 / Contributing

欢迎提交 Issue 和 Pull Request！

Issues and Pull Requests are welcome!

---

**Made with ❤️ using React + TypeScript + Vite**
