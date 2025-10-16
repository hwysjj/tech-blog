// 个人基本信息
export interface PersonalInfo {
  photo?: string; // 照片路径，如 '/avatar.jpg'
  gender: string; // 性别
  birthDate: string; // 出生日期（完整日期）
  politicalStatus: string; // 政治面貌
}

// 教育背景
export interface Education {
  degree: string; // 学位名称（如：工程管理硕士、计算机科学与技术学士）
  degreeLevel: '博士' | '硕士' | '本科' | 'PhD' | 'Master' | 'Bachelor'; // 学位层次
  major: string; // 专业
  school: string; // 学校
  location: string; // 地点
  period: string; // 时间段
  isInProgress?: boolean; // 是否在读
  expectedGraduation?: string; // 预计毕业时间（仅在读时需要）
  researchDirection?: string; // 研究方向（可选）
  gpa?: string; // GPA
  honors?: string[]; // 荣誉
}

// 工作经历
export interface WorkExperience {
  position: string; // 职位
  company: string; // 公司
  location: string; // 地点
  period: string; // 时间段
  responsibilities: string[]; // 工作职责
  achievements?: string[]; // 主要成就
}

// 项目经验
export interface Project {
  name: string; // 项目名称
  role: string; // 担任角色
  period: string; // 项目时间
  description: string; // 项目描述
  technologies: string[]; // 使用技术
  highlights: string[]; // 项目亮点
}

// 技能
export interface Skill {
  category: string; // 技能分类
  items: string[]; // 技能列表
}

// 语言能力
export interface Language {
  name: string; // 语言名称（如：英语、日语）
  level: string; // 水平描述（如：CET-6 | 良好的听说读写能力）
}

// 证书
export interface Certificate {
  name: string; // 证书名称
  issuer: string; // 颁发机构
  date: string; // 获得时间
  id?: string; // 证书编号（可选）
}

// 获奖经历
export interface Award {
  name: string; // 奖项名称
  issuer: string; // 颁发机构/组织
  date: string; // 获奖时间
  level?: string; // 奖项级别（如：国家级、省级、校级、院级）
}

// 联系方式
export interface ContactInfo {
  name: string; // 姓名
  email: string; // 邮箱
  phone: string; // 电话
  address: string; // 地址
  github?: string; // GitHub链接
  linkedin?: string; // LinkedIn链接
  website?: string; // 个人网站
}

// 完整简历数据结构
export interface ResumeData {
  personalInfo: PersonalInfo; // 个人基本信息
  contact: ContactInfo; // 联系方式
  jobIntention: string; // 求职意向
  personalSummary: string; // 个人简介/自我评价
  education: Education[]; // 教育背景
  workExperience: WorkExperience[]; // 工作经历
  projects: Project[]; // 项目经验
  skills: Skill[]; // 技能
  languages: Language[]; // 语言能力
  certificates: Certificate[]; // 证书
  awards: Award[]; // 获奖经历
}

// ============ 中文简历数据模板 ============
export const resumeDataZh: ResumeData = {
  // 个人基本信息
  personalInfo: {
    photo: '/avatar.jpg', // 请将您的照片放在 public/avatar.jpg
    gender: '男',
    birthDate: '1998年6月15日',
    politicalStatus: '中共党员',
  },

  // 联系方式
  contact: {
    name: '张三',
    email: 'zhangsan@example.com',
    phone: '+86 138-0000-0000',
    address: '北京市朝阳区',
    github: 'https://github.com/zhangsan',
    linkedin: 'https://linkedin.com/in/zhangsan',
    website: 'https://zhangsan.dev',
  },

  // 求职意向
  jobIntention: '高级前端工程师 / 全栈工程师',

  // 个人简介/自我评价（150-200字）
  personalSummary: `具有5年前端开发经验，精通React、Vue、Angular等主流框架。目前在读工程管理硕士，研究方向为大数据商务分析。曾在字节跳动、腾讯等头部互联网公司工作，负责多个千万级用户产品的前端架构设计与开发。擅长性能优化、工程化建设和团队协作。热衷于技术分享和开源贡献，具备良好的学习能力和问题解决能力。`,

  // 教育背景（硕士在上，本科在下）
  education: [
    {
      degree: '工程管理硕士',
      degreeLevel: '硕士',
      major: '工程管理',
      school: '清华大学',
      location: '北京',
      period: '2023.09 - 2026.01',
      isInProgress: true,
      expectedGraduation: '2026.01',
      researchDirection: '大数据商务分析',
      gpa: '3.9/4.0',
    },
    {
      degree: '计算机科学与技术学士',
      degreeLevel: '本科',
      major: '计算机科学与技术',
      school: '南京大学',
      location: '南京',
      period: '2016.09 - 2020.06',
      gpa: '3.8/4.0',
      honors: ['优秀毕业生', '优秀毕业设计', '院长奖学金'],
    },
  ],

  // 工作经历
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

  // 项目经验
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

  // 技能
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

  // 语言能力
  languages: [
    {
      name: '英语',
      level: 'CET-6 | 良好的听说读写能力',
    },
  ],

  // 证书
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

  // 获奖经历
  awards: [
    {
      name: '优秀毕业设计',
      issuer: '南京大学计算机科学与技术系',
      date: '2020.06',
      level: '院级',
    },
    {
      name: '院长奖学金',
      issuer: '南京大学',
      date: '2019.12',
      level: '院级',
    },
    {
      name: '苏北数学建模竞赛二等奖',
      issuer: '江苏省教育厅',
      date: '2018.11',
      level: '省级',
    },
  ],
};

// ============ 英文简历数据模板 ============
export const resumeDataEn: ResumeData = {
  // Personal Information
  personalInfo: {
    photo: '/avatar.jpg', // Please place your photo at public/avatar.jpg
    gender: 'Male',
    birthDate: 'June 15, 1998',
    politicalStatus: 'CPC Member',
  },

  // Contact
  contact: {
    name: 'San Zhang',
    email: 'zhangsan@example.com',
    phone: '+86 138-0000-0000',
    address: 'Chaoyang District, Beijing',
    github: 'https://github.com/zhangsan',
    linkedin: 'https://linkedin.com/in/zhangsan',
    website: 'https://zhangsan.dev',
  },

  // Job Intention
  jobIntention: 'Senior Frontend Engineer / Full-Stack Engineer',

  // Personal Summary (150-200 words)
  personalSummary: `Frontend engineer with 5 years of experience, proficient in React, Vue, Angular and other mainstream frameworks. Currently pursuing Master of Engineering Management with focus on Big Data Business Analytics. Previously worked at ByteDance and Tencent, responsible for frontend architecture design and development of products serving tens of millions of users. Specialized in performance optimization, engineering infrastructure, and team collaboration. Passionate about technology sharing and open source contribution, with strong learning ability and problem-solving skills.`,

  // Education (Master first, Bachelor second)
  education: [
    {
      degree: 'Master of Engineering Management',
      degreeLevel: 'Master',
      major: 'Engineering Management',
      school: 'Tsinghua University',
      location: 'Beijing',
      period: 'Sep 2023 - Jan 2026',
      isInProgress: true,
      expectedGraduation: 'Expected Jan 2026',
      researchDirection: 'Big Data Business Analytics',
      gpa: '3.9/4.0',
    },
    {
      degree: 'Bachelor of Science in Computer Science',
      degreeLevel: 'Bachelor',
      major: 'Computer Science and Technology',
      school: 'Nanjing University',
      location: 'Nanjing',
      period: 'Sep 2016 - Jun 2020',
      gpa: '3.8/4.0',
      honors: ['Outstanding Graduate', 'Excellent Graduation Project', 'Dean\'s Scholarship'],
    },
  ],

  // Work Experience
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

  // Projects
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

  // Skills
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

  // Languages
  languages: [
    {
      name: 'English',
      level: 'CET-6 | Proficient in listening, speaking, reading and writing',
    },
  ],

  // Certificates
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

  // Awards
  awards: [
    {
      name: 'Excellent Graduation Project',
      issuer: 'Department of Computer Science, Nanjing University',
      date: 'Jun 2020',
      level: 'Department Level',
    },
    {
      name: 'Dean\'s Scholarship',
      issuer: 'Nanjing University',
      date: 'Dec 2019',
      level: 'Department Level',
    },
    {
      name: 'Second Prize in Subei Mathematical Modeling Competition',
      issuer: 'Jiangsu Provincial Department of Education',
      date: 'Nov 2018',
      level: 'Provincial Level',
    },
  ],
};
