/**
 * Resume Theme Configuration
 * 简历主题配置 - 统一颜色、间距、字体等样式常量
 */

export const resumeTheme = {
  // 颜色系统
  colors: {
    // 主题色：深蓝色
    primary: '#1976d2',
    primaryLight: '#42a5f5',
    primaryDark: '#1565c0',

    // 侧边栏配色
    sidebarBg: '#2c3e50',
    sidebarText: '#ffffff',
    sidebarTextSecondary: '#ecf0f1',

    // 主体内容配色
    mainBg: '#ffffff',
    textPrimary: '#212121',
    textSecondary: '#757575',
    textLight: '#9e9e9e',

    // 辅助色
    divider: '#e0e0e0',
    cardBg: '#fafafa',
    success: '#4caf50',
    warning: '#ff9800',
    error: '#f44336',
  },

  // 间距系统（基于8px网格）
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    xxl: '48px',
  },

  // 字体大小
  fontSize: {
    xs: '10px',
    sm: '12px',
    base: '14px',
    md: '16px',
    lg: '18px',
    xl: '20px',
    xxl: '24px',
    xxxl: '28px',
  },

  // 字重
  fontWeight: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },

  // 布局
  layout: {
    sidebarWidth: '30%',
    sidebarMinWidth: '280px',
    sidebarMaxWidth: '350px',
    containerMaxWidth: '1200px',
    mobileBreakpoint: '768px',
    tabletBreakpoint: '1024px',
  },

  // 圆角
  borderRadius: {
    none: '0',
    sm: '4px',
    md: '8px',
    lg: '12px',
    xl: '16px',
    full: '50%',
  },

  // 阴影
  shadows: {
    sm: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
    md: '0 3px 6px rgba(0,0,0,0.15), 0 2px 4px rgba(0,0,0,0.12)',
    lg: '0 10px 20px rgba(0,0,0,0.15), 0 3px 6px rgba(0,0,0,0.10)',
    xl: '0 15px 25px rgba(0,0,0,0.15), 0 5px 10px rgba(0,0,0,0.05)',
  },

  // PDF特定配置
  pdf: {
    pageWidth: 595, // A4宽度（磅）
    pageHeight: 842, // A4高度（磅）
    sidebarWidth: 170, // PDF侧边栏宽度（磅）
    padding: 40, // 页面内边距
    lineHeight: 1.5,
  },
};

// 导出类型定义
export type ResumeTheme = typeof resumeTheme;
