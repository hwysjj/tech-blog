export interface Education {
  degree: string;
  major: string;
  school: string;
  location: string;
  period: string;
  gpa?: string;
  honors?: string[];
}

export interface WorkExperience {
  position: string;
  company: string;
  location: string;
  period: string;
  responsibilities: string[];
  achievements?: string[];
}

export interface Project {
  name: string;
  role: string;
  period: string;
  description: string;
  technologies: string[];
  highlights: string[];
}

export interface Skill {
  category: string;
  items: string[];
}

export interface Certificate {
  name: string;
  issuer: string;
  date: string;
  id?: string;
}

export interface ContactInfo {
  name: string;
  email: string;
  phone: string;
  address: string;
  github?: string;
  linkedin?: string;
  website?: string;
}

export interface ResumeData {
  contact: ContactInfo;
  education: Education[];
  workExperience: WorkExperience[];
  projects: Project[];
  skills: Skill[];
  certificates: Certificate[];
}

export const resumeDataZh: ResumeData = {
  contact: {
    name: '张三',
    email: 'zhangsan@example.com',
    phone: '+86 138-0000-0000',
    address: '北京市朝阳区',
    github: 'https://github.com/zhangsan',
    linkedin: 'https://linkedin.com/in/zhangsan',
    website: 'https://zhangsan.dev',
  },
  education: [
    {
      degree: '计算机科学与技术学士',
      major: '计算机科学与技术',
      school: '清华大学',
      location: '北京',
      period: '2016.09 - 2020.06',
      gpa: '3.8/4.0',
      honors: ['优秀毕业生', '国家奖学金'],
    },
  ],
  workExperience: [
    {
      position: '高级前端工程师',
      company: '字节跳动',
      location: '北京',
      period: '2022.06 - 至今',
      responsibilities: [
        '负责公司核心产品的前端架构设计与开发',
        '带领 5 人前端团队完成多个重要项目',
        '优化应用性能，首屏加载时间减少 40%',
      ],
      achievements: [
        '成功重构遗留系统，代码可维护性提升 60%',
        '主导建立前端工程化体系和代码规范',
      ],
    },
    {
      position: '前端工程师',
      company: '腾讯',
      location: '深圳',
      period: '2020.07 - 2022.05',
      responsibilities: [
        '参与企业级 Web 应用开发',
        '实现响应式设计和跨浏览器兼容',
        '编写单元测试和 E2E 测试',
      ],
      achievements: [
        '开发的组件库被多个团队采用',
        '获得年度优秀员工奖',
      ],
    },
  ],
  projects: [
    {
      name: '企业级管理系统',
      role: '前端技术负责人',
      period: '2023.01 - 2023.08',
      description: '为大型企业客户开发的 SaaS 管理平台，支持权限管理、数据分析等功能',
      technologies: ['React 18', 'TypeScript', 'Material-UI', 'Redux Toolkit', 'React Query'],
      highlights: [
        '系统支持 10000+ 并发用户',
        '实现微前端架构，支持模块独立部署',
        '建立完整的 CI/CD 流程',
      ],
    },
    {
      name: '移动端电商应用',
      role: '核心开发者',
      period: '2021.06 - 2021.12',
      description: '开发高性能移动端电商应用，提供流畅的购物体验',
      technologies: ['React Native', 'TypeScript', 'Redux', 'Jest'],
      highlights: [
        '应用下载量超过 100 万',
        '用户评分 4.8/5.0',
        '实现购物车、支付等核心功能',
      ],
    },
  ],
  skills: [
    {
      category: '前端技术',
      items: ['React', 'Angular', 'Vue.js', 'TypeScript', 'JavaScript (ES6+)', 'HTML5', 'CSS3', 'Sass/Less'],
    },
    {
      category: '状态管理',
      items: ['Redux', 'MobX', 'Zustand', 'RxJS', 'React Query'],
    },
    {
      category: '工程化工具',
      items: ['Webpack', 'Vite', 'Rollup', 'npm/yarn/pnpm', 'Git', 'Docker'],
    },
    {
      category: '测试',
      items: ['Jest', 'React Testing Library', 'Cypress', 'Vitest'],
    },
    {
      category: '后端技能',
      items: ['Node.js', 'Express', 'NestJS', 'MongoDB', 'PostgreSQL'],
    },
    {
      category: '软技能',
      items: ['团队协作', '技术文档撰写', '代码审查', '敏捷开发', '问题解决'],
    },
  ],
  certificates: [
    {
      name: 'AWS Certified Developer - Associate',
      issuer: 'Amazon Web Services',
      date: '2023.05',
      id: 'AWS-123456',
    },
    {
      name: 'Google Cloud Professional Developer',
      issuer: 'Google Cloud',
      date: '2022.11',
    },
  ],
};

export const resumeDataEn: ResumeData = {
  contact: {
    name: 'San Zhang',
    email: 'zhangsan@example.com',
    phone: '+86 138-0000-0000',
    address: 'Chaoyang District, Beijing',
    github: 'https://github.com/zhangsan',
    linkedin: 'https://linkedin.com/in/zhangsan',
    website: 'https://zhangsan.dev',
  },
  education: [
    {
      degree: 'Bachelor of Science in Computer Science',
      major: 'Computer Science and Technology',
      school: 'Tsinghua University',
      location: 'Beijing',
      period: 'Sep 2016 - Jun 2020',
      gpa: '3.8/4.0',
      honors: ['Outstanding Graduate', 'National Scholarship'],
    },
  ],
  workExperience: [
    {
      position: 'Senior Frontend Engineer',
      company: 'ByteDance',
      location: 'Beijing',
      period: 'Jun 2022 - Present',
      responsibilities: [
        'Lead frontend architecture design and development for core products',
        'Manage a team of 5 frontend engineers to deliver critical projects',
        'Optimize application performance, reducing initial load time by 40%',
      ],
      achievements: [
        'Successfully refactored legacy system, improving code maintainability by 60%',
        'Established frontend engineering standards and code review process',
      ],
    },
    {
      position: 'Frontend Engineer',
      company: 'Tencent',
      location: 'Shenzhen',
      period: 'Jul 2020 - May 2022',
      responsibilities: [
        'Developed enterprise-level web applications',
        'Implemented responsive design and cross-browser compatibility',
        'Wrote unit tests and E2E tests',
      ],
      achievements: [
        'Component library adopted by multiple teams',
        'Received Employee of the Year award',
      ],
    },
  ],
  projects: [
    {
      name: 'Enterprise Management System',
      role: 'Frontend Tech Lead',
      period: 'Jan 2023 - Aug 2023',
      description: 'SaaS management platform for large enterprise clients with permission management and data analytics',
      technologies: ['React 18', 'TypeScript', 'Material-UI', 'Redux Toolkit', 'React Query'],
      highlights: [
        'System supports 10,000+ concurrent users',
        'Implemented micro-frontend architecture for independent module deployment',
        'Established complete CI/CD pipeline',
      ],
    },
    {
      name: 'Mobile E-commerce Application',
      role: 'Core Developer',
      period: 'Jun 2021 - Dec 2021',
      description: 'High-performance mobile e-commerce app providing smooth shopping experience',
      technologies: ['React Native', 'TypeScript', 'Redux', 'Jest'],
      highlights: [
        'Over 1 million downloads',
        'User rating 4.8/5.0',
        'Implemented core features including shopping cart and payment',
      ],
    },
  ],
  skills: [
    {
      category: 'Frontend Technologies',
      items: ['React', 'Angular', 'Vue.js', 'TypeScript', 'JavaScript (ES6+)', 'HTML5', 'CSS3', 'Sass/Less'],
    },
    {
      category: 'State Management',
      items: ['Redux', 'MobX', 'Zustand', 'RxJS', 'React Query'],
    },
    {
      category: 'Engineering Tools',
      items: ['Webpack', 'Vite', 'Rollup', 'npm/yarn/pnpm', 'Git', 'Docker'],
    },
    {
      category: 'Testing',
      items: ['Jest', 'React Testing Library', 'Cypress', 'Vitest'],
    },
    {
      category: 'Backend Skills',
      items: ['Node.js', 'Express', 'NestJS', 'MongoDB', 'PostgreSQL'],
    },
    {
      category: 'Soft Skills',
      items: ['Team Collaboration', 'Technical Writing', 'Code Review', 'Agile Development', 'Problem Solving'],
    },
  ],
  certificates: [
    {
      name: 'AWS Certified Developer - Associate',
      issuer: 'Amazon Web Services',
      date: 'May 2023',
      id: 'AWS-123456',
    },
    {
      name: 'Google Cloud Professional Developer',
      issuer: 'Google Cloud',
      date: 'Nov 2022',
    },
  ],
};
