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
    birthDate: '1989年11月12日',
    politicalStatus: '中共党员',
  },

  // 联系方式
  contact: {
    name: '华文益',
    email: 'william_cumt@hotmail.com',
    phone: '+86 185-0215-5866',
    address: '上海市浦东新区',
    github: 'https://github.com/zhangsan',
    linkedin: '',
    website: '',
  },

  // 求职意向
  jobIntention: ' Web前端 / .NET / 全栈工程师',

  // 个人简介/自我评价（150-200字）
  personalSummary: `具有10年多的软件前后端开发经验，精通React、Angular、AngularJS等主流框架，后端熟悉C#，NodeJS, Python等语言。注重代码质量与自动化流程建设，推动开发效率与交付稳定性持续提升。热衷于技术交流，具备良好的学习能力和问题解决能力。并具备良好的英语听说读写能力。`,

  // 教育背景（硕士在上，本科在下）
  education: [
    {
      degree: '硕士',
      degreeLevel: '硕士',
      major: '工程管理',
      school: '华东理工大学',
      location: '上海',
      period: '2023.09 - 2026.01',
      isInProgress: true,
      expectedGraduation: '2026.01',
      researchDirection: '大数据商务分析',
      gpa: '',
      honors: ['学科总成绩班级第一，专业年级前三'],
    },
    {
      degree: '本科',
      degreeLevel: '本科',
      major: '计算机科学与技术',
      school: '中国矿业大学',
      location: '徐州',
      period: '2009.09 - 2013.07',
      gpa: '',
      honors: ['优秀毕业设计', '院长奖学金', '苏北数学建模竞赛二等奖', '学习优秀奖', '担任主要学生干部职务'],
    },
  ],

  // 工作经历
  workExperience: [
    {
      position: '软件开发工程师主管',
      company: '碧点（上海）软件技术有限公司',
      location: '上海',
      period: '2015.03 - 至今',
      responsibilities: [
        '职位晋升：软件开发工程师（2015.03 - 2018.02）→ 高级软件开发工程师（2018.03 - 2021.03）→ 软件工程师主管（2021.04 - 至今）',
        '和美国团队技术leader一起主导Web前端从0到1搭建Whitelabel Web平台，主要采用Angular/React + .NET + TypeScript技术栈，为公司建立统一的Web前端BaaS平台，支持新业务快速扩展和旧业务平滑迁移',
        '主导Walmart和GD两大合作伙伴从旧系统向BaaS平台的前端迁移，负责迁移计划制定、技术架构设计和实施落地。Walmart项目已成功上线，为数千万用户提供更敏捷、高质量的金融服务体验',
        '担任Google reCAPTCHA项目Tech Leader，主导前后端全栈开发，覆盖公司大部分Web和Mobile应用的多个业务流程。提出创新技术方案，通过智能触发机制减少不必要的API调用，为公司降低70%的reCAPTCHA月度成本',
        '负责多个Web网站的日常维护和技术升级，涉及.NET、AngularJS、Angular等技术栈。为某些项目从0搭建Jenkins CI/CD流程，显著提升前端部署效率和发布质量',
        '需求讨论、技术选型、系统设计、代码编写、生产测试问题解决等工作',
        '参与Web前端技术面试，和新员工培训工作'
      ],
    },
    {
      position: '.NET软件工程师',
      company: '麻州信息技术（上海）有限公司',
      location: '上海',
      period: '2013.08 - 2015.07',
      responsibilities: [
        '基于.NET的美国众筹项目， 负责该项目从0-1的全栈开发（web前端+C#后端，开始共3人发展到后来数十人）',
        '基于AngularJS+.NET的云协作项目， 负责Web前端模块的开发与维护',
      ],
    },
  ],

  // 项目经验
  projects: [
    {
      name: 'Walmart/Greedot Migration',
      role: 'Web前端技术负责人',
      period: '2024.02 - 现在',
      description: '把Walmart和Greedot这两个系统从旧系统迁移到公司最新的BaaS平台，我负责主导Web前端的迁移工作。',
      technologies: ['ReactJS 18', 'Angular', 'TypeScript', 'Karma', 'Jest', 'MUI', 'Webpack', '.Net', 'TeamCity', 'Git', 'Azure FrontDoor'],
      highlights: [
        '主导Web前端从onprem服务器迁移到了Azure Cloud，实现同一个域名同时支持新老系统，并解决了迁移过程中遇到的各种技术难题，例如旧系统不支持IPV6，新老系统URL冲突等问题。',
        '实现同代码多租户架构，通过路由与配置隔离机制，使不同产品用户自动访问对应云端环境。',
        'UT覆盖率达到80%以上，确保系统稳定可靠',
      ],
    },
    {
      name: 'BaaS项目',
      role: 'Web前端技术负责',
      period: '2021.06 - 2022.12',
      description: '构建全新从0-1的BaaS（Banking-as-a-service） whitelabel平台，支持公司未来多个新业务的快速上线和旧业务的平滑迁移。我和美国的前端开发leader一起主导构建Web前端系统架构，以及平台上所有功能的实现，包含公司银行系统的几乎所有功能。',
      technologies: ['ReactJS 18', 'Angular', 'TypeScript', 'Module Federation', 'Karma', 'Jest', 'MUI', 'Webpack', '.Net', 'TeamCity', 'Git'],
      highlights: [
        '使用微前端架构设计，实现各个模块的独立部署和升级',
        '实现项目 100% 可配置化架构，支持不同 Brand/Partner 使用同一代码基线满足差异化业务需求，动态加载品牌主题、图片与文案，大幅提升开发效率并显著加快业务 Onboarding 速度。',
        '实现公司银行产品的所有核心功能模块，包括用户注册、登录、账户管理、转账支付、交易明细等功能',
      ],
    },
    {
      name: 'Google ReCaptcha',
      role: 'Tech Lead',
      period: '2023.06 - 2024.12',
      description: '主导公司信息安全部门提出的Google reCAPTCHA安全接入项目，作为Tech Lead兼Web端开发负责人，负责在全公司各Web与App安全敏感流程中集成Google reCAPTCHA，提升整体防攻击与防自动化风险能力。',
      technologies: ['ReactJS 18', 'Angular', 'TypeScript', '.Net', 'Web API', 'TeamCity', 'Git'],
      highlights: [
        '提出以及实施one time token机制, 以进一步提高系统安全性',
        '提出基于IP Audit + IOvation的触发机制减少不必要的API调用，为公司降低70%的reCAPTCHA月度成本',
      ],
    },
    {
      name: 'GoBank',
      role: '核心Web前端开发',
      period: '2015.08 - 2017.12',
      description: '基于AngularJS的银行在线项目，我负责项目的功能开发与维护，以及搭建jenkins CI/CD流程。',
      technologies: ['AngularJS 1.5', 'Jade', 'Stylus', 'Jenkins', 'Perforce', 'Grunt', 'Gulp', 'Protractor', 'Karma'],
      highlights: [
        '搭建Jenkins CI/CD流程，显著提升前端部署效率和发布质量',
        '基于protractor的前端E2E测试',
        'grunt构建流程优化(20min -> 2min)',
        '组件化推广',
        'ng-router到ui-router的迁移',
        'angular 1.2升级到angular 1.5'
      ],
    },
    {
      name: '全携通',
      role: '核心Web前端开发',
      period: '2015.08 - 2017.12',
      description: '全携通支持两种文件分享的方式：模拟现实中组建团队的方式，将不同的人以不同的权限邀请到文件夹中参与协作，从而共享其中的资源，针对写作文件可以发表评论，版本控制；同时支持为文件或文件夹生成可访问的链接进行分享与下载。我负责web前端的功能开发与维护。',
      technologies: ['AngularJS', 'Bootstrap', 'Less', 'Grunt', 'SVN'],
      highlights: [
      ],
    },
    {
      name: 'DreamFund',
      role: '.Net全栈开发（Web前端+后端）',
      period: '2013.08 - 2017.12',
      description: 'DreamFund是一个帮助他人筹集资金完成理想并可以赞助他人梦想的social savings平台，本系统是一个国际化的众筹项目，完成了包括create dream, overview dream, fund dream, withdraw等等模块。我负责web前端的功能开发与维护。',
      technologies: ['.NET', 'Bootstrap', 'Less', 'JQuery', 'SVN'],
      highlights: [
      ],
    },
  ],

  // 技能
  skills: [
    {
      category: '前端技术',
      items: ['React', 'Angular', 'AngularJS', 'TypeScript', 'JavaScript (ES6+)', 'HTML5', 'CSS3', 'Sass/Less/Stylus'],
    },
    // {
    //   category: '状态管理',
    //   items: ['Redux', 'MobX', 'Zustand', 'RxJS', 'React Query'],
    // },
    {
      category: '工程化工具',
      items: ['Webpack', 'Vite', 'Gulp', 'Grunt', 'npm/yarn', 'Git', 'Perforce', 'Jenkins'],
    },
    {
      category: '测试',
      items: ['Jest', 'Karma', 'Protractor'],
    },
    {
      category: '后端技能',
      items: ['Node.js', '.Net', 'C#', 'Express', 'Python', 'Java'],
    },
    {
      category: 'AI复制编程',
      items: ['Claude Code', 'Codex', 'Copilot'],
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
    // {
    //   name: 'AWS Certified Developer - Associate',
    //   issuer: 'Amazon Web Services',
    //   date: '2023.05',
    //   id: 'AWS-123456',
    // },
    // {
    //   name: 'Google Cloud Professional Developer',
    //   issuer: 'Google Cloud',
    //   date: '2022.11',
    // },
  ],

  // 获奖经历
  awards: [
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
      position: 'Software Engineering Manager',
      company: 'Biopoint (Shanghai) Software Technology Co., Ltd.',
      location: 'Shanghai',
      period: 'Mar 2015 - Present',
      responsibilities: [
        '▸ Career Progression: Software Engineer (Mar 2015 - Feb 2018) → Senior Software Engineer (Mar 2018 - Mar 2021) → Software Engineering Manager (Apr 2021 - Present)',
        '',
        'Led a 5-person frontend team to build a White-label Web platform from scratch using Angular/React + .NET + TypeScript stack, establishing unified multi-tenant frontend infrastructure to support rapid business expansion and legacy system migration',
        '',
        'Spearheaded frontend migration for two major partners (Walmart & GD) from legacy systems to BaaS platform, responsible for migration planning, technical architecture design, and implementation. Walmart project successfully launched, serving tens of millions of users with more agile and high-quality financial services',
        '',
        'Served as Tech Leader for Google reCAPTCHA optimization project, leading full-stack development across all company web and mobile applications. Proposed innovative technical solutions that reduced unnecessary API calls through intelligent trigger mechanisms, cutting reCAPTCHA monthly costs by 70%',
        '',
        'Managed maintenance and technical upgrades for dozens of web projects involving .NET, AngularJS, and Angular stacks. Built Jenkins CI/CD pipelines from scratch for multiple legacy projects, significantly improving frontend deployment efficiency and release quality',
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
