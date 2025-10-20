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
    github: '',
    linkedin: '',
    website: '',
  },

  // 求职意向
  jobIntention: '高级前端工程师 / 前端架构师',

  // 个人简介/自我评价（150-200字）
  personalSummary: `拥有11年软件开发经验，精通React、Angular等主流前端框架，擅长架构设计与性能优化。后端熟悉C#、Node.js、Python等技术栈。现任软件工程师主管，曾主导多个千万级用户金融产品的前端架构设计与开发，成功为公司节省70%的安全成本。注重代码质量与工程化建设，推动开发效率与交付稳定性持续提升。具备优秀的跨国团队协作能力和英语沟通能力，热衷于技术交流与团队成长。`,

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
        '晋升轨迹：软件开发工程师（2015.03-2018.02）→ 高级工程师（2018.03-2021.03）→ 主管（2021.04至今）',
        '与美国技术团队共同主导Whitelabel BaaS平台建设，采用Angular/React + .NET + TypeScript技术栈，支持新业务快速扩展和遗留系统平滑迁移',
        '主导Walmart和GD两大合作伙伴的前端系统迁移，成功上线后服务数千万用户，显著提升金融服务的敏捷性和稳定性',
        '担任Google reCAPTCHA项目Tech Leader，通过创新的智能触发机制优化API调用策略，为公司降低70%的月度成本',
        '建立Jenkins CI/CD流程，推动多个遗留项目的自动化部署，显著提升发布效率和代码质量',
        '负责前端技术面试与新员工培训，推动团队技术能力提升',
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
      description: '主导Walmart和Greedot两大金融系统向BaaS平台的Web前端迁移，负责技术选型、架构设计与实施落地。',
      technologies: ['React 18', 'Angular', 'TypeScript', 'Karma', 'Jest', 'MUI', 'Webpack', '.NET', 'TeamCity', 'Git', 'Azure Front Door'],
      highlights: [
        '主导Web前端从本地服务器迁移至Azure云端，实现同域名支持新老系统并存，解决IPv6兼容性、URL冲突等技术难题',
        '实现多租户架构，通过路由与配置隔离机制，使不同产品用户自动访问对应云端环境',
        '单元测试覆盖率达80%以上，确保系统稳定可靠',
      ],
    },
    {
      name: 'BaaS平台',
      role: 'Web前端技术负责人',
      period: '2021.06 - 2022.12',
      description: '从0到1构建Banking-as-a-Service Whitelabel平台，与美国团队共同主导Web前端架构设计，实现银行核心功能模块，支持多业务快速上线与遗留系统迁移。',
      technologies: ['React 18', 'Angular', 'TypeScript', 'Module Federation', 'Karma', 'Jest', 'MUI', 'Webpack', '.NET', 'TeamCity', 'Git'],
      highlights: [
        '采用微前端架构设计，实现各模块独立部署和升级',
        '实现100%可配置化架构，支持不同品牌/合作伙伴使用同一代码基线满足差异化业务需求，动态加载主题、图片与文案',
        '完成银行产品所有核心功能模块，包括用户注册、登录、账户管理、转账支付、交易明细等',
      ],
    },
    {
      name: 'Google reCAPTCHA安全优化',
      role: 'Tech Lead',
      period: '2023.06 - 2024.12',
      description: '主导公司信息安全部门提出的Google reCAPTCHA安全接入项目，作为Tech Lead兼Web端开发负责人，在全公司各Web与App安全敏感流程中集成Google reCAPTCHA。',
      technologies: ['React 18', 'Angular', 'TypeScript', '.NET', 'Web API', 'TeamCity', 'Git'],
      highlights: [
        '提出并实施one-time token机制，进一步提高系统安全性',
        '基于IP Audit + IOvation的智能触发机制减少不必要的API调用，为公司降低70%的reCAPTCHA月度成本',
      ],
    },
    {
      name: 'GoBank',
      role: '核心Web前端开发',
      period: '2015.08 - 2017.12',
      description: '基于AngularJS的银行在线项目，负责功能开发、维护及CI/CD流程搭建。',
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
      category: 'AI辅助编程',
      items: ['Claude Code', 'GitHub Copilot', 'Cursor'],
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
    birthDate: 'November 12, 1989',
    politicalStatus: 'CPC Member',
  },

  // Contact
  contact: {
    name: 'Wenyi Hua',
    email: 'william_cumt@hotmail.com',
    phone: '+86 185-0215-5866',
    address: 'Pudong District, Shanghai',
    github: '',
    linkedin: '',
    website: '',
  },

  // Job Intention
  jobIntention: 'Senior Frontend Engineer / Frontend Architect',

  // Personal Summary (150-200 words)
  personalSummary: `Software engineer with 11 years of experience, proficient in React and Angular frontend frameworks, specialized in architecture design and performance optimization. Familiar with C#, Node.js, and Python on the backend. Currently serving as Software Engineering Manager, led frontend architecture design and development for multiple financial products serving tens of millions of users, successfully reducing company security costs by 70%. Committed to code quality and engineering infrastructure, continuously improving development efficiency and delivery stability. Possess excellent cross-cultural team collaboration and English communication skills, passionate about technical exchange and team growth.`,

  // Education (Master first, Bachelor second)
  education: [
    {
      degree: 'Master of Engineering Management',
      degreeLevel: 'Master',
      major: 'Engineering Management',
      school: 'East China University of Science and Technology',
      location: 'Shanghai',
      period: 'Sep 2023 - Jan 2026',
      isInProgress: true,
      expectedGraduation: 'Jan 2026',
      researchDirection: 'Big Data Business Analytics',
      gpa: '',
      honors: ['Top 1 in class, Top 3 in department'],
    },
    {
      degree: 'Bachelor of Computer Science',
      degreeLevel: 'Bachelor',
      major: 'Computer Science and Technology',
      school: 'China University of Mining and Technology',
      location: 'Xuzhou',
      period: 'Sep 2009 - Jul 2013',
      gpa: '',
      honors: ['Outstanding Graduation Project', 'Dean\'s Scholarship', 'Second Prize in Subei Mathematical Modeling Competition', 'Academic Excellence Award', 'Student Leader'],
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
        'Career Progression: Software Engineer (Mar 2015 - Feb 2018) → Senior Engineer (Mar 2018 - Mar 2021) → Manager (Apr 2021 - Present)',
        'Collaborated with US technical team to lead Whitelabel BaaS platform development using Angular/React + .NET + TypeScript stack, supporting rapid business expansion and legacy system migration',
        'Led frontend migration for Walmart and GD partners, successfully serving tens of millions of users with significantly improved financial service agility and stability',
        'Served as Tech Leader for Google reCAPTCHA project, optimizing API call strategy through innovative smart trigger mechanism, reducing monthly costs by 70%',
        'Established Jenkins CI/CD pipelines, promoting automated deployment for multiple legacy projects and significantly improving release efficiency and code quality',
        'Responsible for frontend technical interviews and new employee training, driving team capability enhancement',
      ],
    },
    {
      position: '.NET Software Engineer',
      company: 'Massachusetts Information Technology (Shanghai) Co., Ltd.',
      location: 'Shanghai',
      period: 'Aug 2013 - Jul 2015',
      responsibilities: [
        'US-based crowdfunding project using .NET, responsible for full-stack development from 0 to 1 (web frontend + C# backend, team grew from 3 to dozens)',
        'Cloud collaboration project using AngularJS + .NET, responsible for web frontend module development and maintenance',
      ],
    },
  ],

  // Projects
  projects: [
    {
      name: 'Walmart/Greedot Migration',
      role: 'Frontend Tech Lead',
      period: 'Feb 2024 - Present',
      description: 'Led web frontend migration for Walmart and Greedot financial systems to BaaS platform, responsible for technology selection, architecture design, and implementation.',
      technologies: ['React 18', 'Angular', 'TypeScript', 'Karma', 'Jest', 'MUI', 'Webpack', '.NET', 'TeamCity', 'Git', 'Azure Front Door'],
      highlights: [
        'Led web frontend migration from on-premises servers to Azure cloud, enabling coexistence of new and legacy systems under the same domain, solving IPv6 compatibility and URL conflict challenges',
        'Implemented multi-tenant architecture with routing and configuration isolation, enabling automatic access to corresponding cloud environments for different product users',
        'Achieved 80%+ unit test coverage to ensure system stability and reliability',
      ],
    },
    {
      name: 'BaaS Platform',
      role: 'Frontend Tech Lead',
      period: 'Jun 2021 - Dec 2022',
      description: 'Built Banking-as-a-Service Whitelabel platform from 0 to 1, collaborated with US team to lead web frontend architecture design, implementing core banking modules to support rapid business onboarding and legacy system migration.',
      technologies: ['React 18', 'Angular', 'TypeScript', 'Module Federation', 'Karma', 'Jest', 'MUI', 'Webpack', '.NET', 'TeamCity', 'Git'],
      highlights: [
        'Adopted micro-frontend architecture design for independent module deployment and upgrades',
        'Implemented 100% configurable architecture supporting different brands/partners using same codebase for differentiated business needs with dynamic theme, image, and copy loading',
        'Completed all core banking modules including user registration, login, account management, fund transfer, and transaction history',
      ],
    },
    {
      name: 'Google reCAPTCHA Security Optimization',
      role: 'Tech Lead',
      period: 'Jun 2023 - Dec 2024',
      description: 'Led Google reCAPTCHA security integration project initiated by company security department, serving as Tech Lead and web development lead, integrating Google reCAPTCHA across all company web and app security-sensitive workflows.',
      technologies: ['React 18', 'Angular', 'TypeScript', '.NET', 'Web API', 'TeamCity', 'Git'],
      highlights: [
        'Proposed and implemented one-time token mechanism to further enhance system security',
        'Reduced unnecessary API calls by 70% through intelligent trigger mechanism based on IP Audit + IOvation, cutting reCAPTCHA monthly costs by 70%',
      ],
    },
    {
      name: 'GoBank',
      role: 'Core Frontend Developer',
      period: 'Aug 2015 - Dec 2017',
      description: 'AngularJS-based online banking project, responsible for feature development, maintenance, and CI/CD pipeline setup.',
      technologies: ['AngularJS 1.5', 'Jade', 'Stylus', 'Jenkins', 'Perforce', 'Grunt', 'Gulp', 'Protractor', 'Karma'],
      highlights: [
        'Established Jenkins CI/CD pipeline, significantly improving frontend deployment efficiency and release quality',
        'Implemented frontend E2E testing based on Protractor',
        'Optimized Grunt build process (20min → 2min)',
        'Promoted component-based development',
        'Migrated from ng-router to ui-router',
        'Upgraded Angular from 1.2 to 1.5',
      ],
    },
  ],

  // Skills
  skills: [
    {
      category: 'Frontend Technologies',
      items: ['React', 'Angular', 'AngularJS', 'TypeScript', 'JavaScript (ES6+)', 'HTML5', 'CSS3', 'Sass/Less/Stylus'],
    },
    {
      category: 'Engineering Tools',
      items: ['Webpack', 'Vite', 'Gulp', 'Grunt', 'npm/yarn', 'Git', 'Perforce', 'Jenkins'],
    },
    {
      category: 'Testing',
      items: ['Jest', 'Karma', 'Protractor'],
    },
    {
      category: 'Backend Skills',
      items: ['Node.js', '.NET', 'C#', 'Express', 'Python', 'Java'],
    },
    {
      category: 'AI-Assisted Programming',
      items: ['Claude Code', 'GitHub Copilot', 'Cursor'],
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
  ],

  // Awards
  awards: [
  ],
};
