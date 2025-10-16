# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a modern bilingual (Chinese/English) tech blog built with React 19, TypeScript, Vite, and Material-UI. It renders Markdown posts with frontmatter, supports theme switching (light/dark), and uses Giscus for comments.

## Development Commands

```bash
# Start development server (runs on http://localhost:5173)
npm run dev

# Build for production (runs TypeScript compiler + Vite build)
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

## Architecture

### Post Loading System

The blog uses a unique dual-file approach for bilingual posts:
- Posts are stored in `/public/posts/{date-slug}/` folders
- Each post has two files: `index.zh.md` (Chinese) and `index.en.md` (English)
- Naming convention: `YYYY-MM-DD-slug-name/` (e.g., `2025-10-17-react-principles-interview-guide/`)

**Post discovery mechanism:**
- `src/utils/postLoader.ts` uses Vite's `import.meta.glob('/public/posts/**/index.*.md', { as: 'raw' })` to load all posts
- Posts are parsed with `gray-matter` to extract frontmatter and content
- Language is determined by file suffix (`.zh.md` or `.en.md`) and filtered by current UI language

**Required frontmatter structure:**
```yaml
---
title: "Post Title"
date: "YYYY-MM-DD"
tags: ["tag1", "tag2"]
category: "Category Name"
author: "Author Name"
excerpt: "Post summary"
cover: "./cover.jpg"  # optional
---
```

### State Management

**Theme Management:**
- Custom ThemeProvider wrapper (`src/theme/ThemeProvider.tsx`) around MUI's ThemeProvider
- Theme mode stored in `localStorage` as `'theme-mode'`
- Provides `useTheme()` hook for accessing mode and `toggleTheme()` function

**Language Management:**
- Uses `i18next` + `react-i18next`
- Language preference stored in `localStorage` as `'language'`
- Default language is Chinese (`'zh'`), fallback is English (`'en'`)
- Switching language triggers post reloading to display corresponding `.zh.md` or `.en.md` files

### Browser Polyfills

The project includes Buffer polyfill to support `gray-matter` in the browser:
- `buffer` package installed as dependency
- Vite config (`vite.config.ts`) defines `global` as `globalThis` and aliases `buffer`
- `src/main.tsx` imports Buffer and assigns it to `window.Buffer` before app initialization

**Critical:** If you see `Buffer is not defined` errors, ensure:
1. `buffer` is in dependencies
2. Vite config includes the `define` and `resolve.alias` settings for buffer
3. `src/main.tsx` imports and assigns Buffer to window

### Routing Structure

- `/` - Home page (post list with category/tag filtering)
- `/post/:slug` - Post detail page (slug matches folder name without date prefix)
- `/about` - About page
- All routes use lazy loading with React Suspense

### Component Organization

**Key architectural patterns:**
- `Layout` component wraps all pages with navigation, theme toggle, and language toggle
- `MarkdownRenderer` handles all markdown parsing with rehype plugins (highlight, autolink-headings, slug)
- `PostCard` displays post metadata on home page
- `TableOfContents` auto-generates TOC from markdown headings
- `ReadingProgress` shows scroll progress for long posts
- `CommentSection` integrates Giscus (GitHub Discussions-based comments)

## Adding New Posts

1. Create folder: `public/posts/YYYY-MM-DD-title-slug/`
2. Add both `index.zh.md` and `index.en.md` with proper frontmatter
3. Posts auto-appear on next page load (no rebuild required in dev mode)

**Important:** The slug extracted from the folder name is used in the URL, not the date. For example:
- Folder: `2025-10-17-react-principles-interview-guide/`
- URL: `/post/2025-10-17-react-principles-interview-guide`

## Import Aliases

- `@/` maps to `src/` directory (configured in `vite.config.ts`)
- Use `@/components/...`, `@/utils/...`, etc. for imports

## TypeScript Configuration

The project uses TypeScript 5.9+ with strict mode enabled. Key type definitions in `src/types/post.ts`:
- `PostFrontmatter` - Frontmatter structure with required fields
- `Post` - Full post with content
- `PostMetadata` - Post metadata without content (for list views)

## When Restarting Dev Server is Required

You must restart the dev server (`npm run dev`) after:
- Modifying `vite.config.ts`
- Installing new dependencies
- Changing environment variables
- Updating Buffer polyfill configuration
