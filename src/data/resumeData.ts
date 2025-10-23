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
  wechat?: string; // 微信号
  address: string; // 地址
  github?: string; // GitHub链接
  linkedin?: string; // LinkedIn链接
  website?: string; // 个人网站/博客
  resumeUrl?: string; // 在线简历链接
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
    wechat: '18502155866',
    address: '上海市浦东新区',
    github: '',
    linkedin: '',
    website: 'https://huawenyi.vercel.app/',
    resumeUrl: 'https://huawenyi.vercel.app/resume',
  },

  // 求职意向
  jobIntention: '高级Web前端工程师 ｜ 全栈工程师 ｜ .NET',

  // 个人简介/自我评价（150-200字）
  personalSummary: `具备十年以上的前端与全栈开发经验，精通 React、Angular 等主流框架，熟悉 C#、Node.js、Python 技术栈。擅长 Web 架构设计与性能优化，具备系统级工程化建设经验。注重代码质量与交付流程持续改进，熟练运用 Jenkins、TeamCity、Azure 等 DevOps 工具实现持续集成与部署。长期在跨国团队环境下工作，能够高效协作、推动复杂项目落地。`,

  // 教育背景（硕士在上，本科在下）
  education: [
    {
      degree: '硕士',
      degreeLevel: '硕士',
      major: '工程管理',
      school: '华东理工大学',
      location: '上海',
      period: '2023.09 - 至今',
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
      school: '中国矿业大学徐海学院',
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
      period: '2015.08 - 至今',
      responsibilities: [
        '晋升轨迹：软件开发工程师（2015.08-2018.02）→ 高级工程师（2018.03-2021.03）→ 主管（2021.04至今）',
        '负责公司 Web 前端整体架构设计与技术选型，主导基于 React / Angular + TypeScript 的开发与重构',
        '基于 Webpack + Module Federation 搭建微前端架构，提升系统的模块化与可复用性',
        '推进部分响应式页面开发，统一 PC、移动端及 Android / iOS WebView 的使用体验',
        '参与后端 .NET WebAPI 开发与集成，完善前后端数据交互流程',
        '与 DevOps 团队协作推进 CI/CD 流程建设（Jenkins / TeamCity）以及本地服务器到 Azure 云端的迁移工作，支持自动化构建、测试与发布',
        '建立前端单元测试体系，使用 Jest / Jasmine / Karma 等工具，确保关键模块 UT 覆盖率达 80% 以上',
        '作为项目 Web 前端主要沟通与推动负责人，负责跨团队需求澄清、进度跟踪与问题闭环，确保前后端协作顺畅高效',
        '参与代码评审与技术分享，指导新人培训，持续提升团队整体技术能力',
        '负责多个遗留系统的日常维护、性能优化与版本升级，降低技术债务与运维风险',
      ],
      achievements: [
        '与美国技术团队共同主导 Whitelabel BaaS 平台 Web 前端建设，支持新业务快速扩展与遗留系统平滑迁移',
        '主导 Walmart 与 Greendot 合作项目的前端系统迁移，上线后服务数千万用户，显著提升系统稳定性与金融服务的敏捷性',
        '担任 Google reCAPTCHA 项目 Tech Lead，通过智能触发机制优化调用策略，为公司降低约 70% 的安全成本',
        '推动多个项目实现自动化构建与部署流程，显著提升发布效率与代码质量',
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
      technologies: ['React', 'Angular', 'TypeScript', 'Karma', 'Jasmine', 'Jest', 'MUI', 'Webpack', '.NET', 'TeamCity', 'Git', 'Azure Front Door'],
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
      technologies: ['React', 'Angular', 'TypeScript', 'Module Federation', 'Karma', 'Jasmine', 'Jest', 'MUI', 'Webpack', '.NET', 'TeamCity', 'Git'],
      highlights: [
        '采用微前端架构设计，实现各模块独立部署和升级',
        '实现100%可配置化架构，支持不同品牌/合作伙伴使用同一代码基线满足差异化业务需求，动态加载主题、图片与文案',
        '完成银行产品所有核心功能模块，包括用户注册、登录、账户管理、转账支付、交易明细等',
      ],
    },
    {
      name: 'Google reCAPTCHA安全优化',
      role: 'Tech Lead',
      period: '2022.04 - 2023.04',
      description: '主导公司信息安全部门提出的Google reCAPTCHA安全接入项目，作为Tech Lead兼Web端开发负责人，在全公司各Web与App安全敏感流程中集成Google reCAPTCHA。',
      technologies: ['React', 'Angular', 'TypeScript', '.NET', 'Web API', 'TeamCity', 'Git'],
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
      category: '前端开发',
      items: ['React', 'Angular', 'TypeScript', 'JavaScript (ES6+)', 'HTML5', 'CSS3', 'MUI'],
    },
    {
      category: '工程化与测试',
      items: ['Webpack', 'Vite', 'Jenkins', 'TeamCity', 'Jest', 'Jasmine', 'Karma'],
    },
    {
      category: '后端与全栈',
      items: ['Node.js', '.NET', 'C#', 'RESTful API', 'Azure', 'Express'],
    },
    {
      category: '开发模式',
      items: ['微前端架构', 'CI/CD', '模块化设计', '敏捷开发'],
    },
    {
      category: 'AI工具',
      items: ['GitHub Copilot', 'Claude Code', 'Codex'],
    },
  ],

  // 语言能力
  languages: [
    {
      name: '英语',
      level: 'CET-6，熟练的跨国团队沟通与协作能力',
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
    wechat: '18502155866',
    address: 'Pudong District, Shanghai',
    github: '',
    linkedin: '',
    website: 'https://huawenyi.vercel.app/',
    resumeUrl: 'https://huawenyi.vercel.app/resume',
  },

  // Job Intention
  jobIntention: 'Web Frontend Engineer | Full Stack Engineer | .NET',

  // Personal Summary (150-200 words)
  personalSummary: `Over 10 years of front-end and full-stack development experience, proficient in React, Angular and other mainstream frameworks, familiar with C#, Node.js, Python technology stacks. Expertise in Web architecture design and performance optimization with system-level engineering construction experience. Focus on continuous improvement of code quality and delivery process, skilled in using Jenkins, TeamCity, Azure and other DevOps tools to achieve continuous integration and deployment. Long-term work experience in cross-national team environments with ability to collaborate efficiently and drive complex projects to completion.`,

  // Education (Master first, Bachelor second)
  education: [
    {
      degree: 'Master of Engineering Management',
      degreeLevel: 'Master',
      major: 'Engineering Management',
      school: 'East China University of Science and Technology',
      location: 'Shanghai',
      period: 'Sep 2023 - Now',
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
      school: 'China University of Mining and Technology, Xuhai College',
      location: 'Xuzhou',
      period: 'Sep 2009 - Jul 2013',
      gpa: '',
      honors: ['Outstanding Graduation Project', 'Dean\'s Scholarship', 'Second Prize in Subei Mathematical Modeling Competition', 'Academic Excellence Award', 'Student Leader'],
    },
  ],

  // Work Experience
  workExperience: [
    {
      position: 'Software Engineering Lead',
      company: 'Bidian (Shanghai) Software Technology Co., Ltd.',
      location: 'Shanghai',
      period: 'Aug 2015 - Present',
      responsibilities: [
        'Career Progression: Software Engineer (Mar Aug - Feb 2018) → Senior Engineer (Mar 2018 - Mar 2021) → Manager (Apr 2021 - Present)',
        'Responsible for overall Web frontend architecture design and technology selection, leading development and refactoring based on React / Angular + TypeScript',
        'Built micro-frontend architecture using Webpack + Module Federation, enhancing system modularity and reusability',
        'Drove responsive web development to unify user experience across PC, mobile, and Android / iOS WebView platforms',
        'Participated in backend .NET WebAPI development and integration, optimizing frontend-backend data interaction',
        'Collaborated with DevOps team to advance CI/CD pipeline construction (Jenkins / TeamCity) and on-premises to Azure cloud migration, supporting automated build, testing, and deployment',
        'Established frontend unit testing framework using Jest / Jasmine / Karma, ensuring 80%+ UT coverage for critical modules',
        'Served as primary Web frontend communication and project lead, responsible for cross-team requirement clarification, progress tracking, and issue resolution, ensuring smooth frontend-backend collaboration',
        'Participated in code reviews and technical sharing, mentored new team members, continuously improving overall team capability',
        'Maintained multiple legacy systems including daily maintenance, performance optimization, and version upgrades, reducing technical debt and operational risks',
      ],
      achievements: [
        'Collaborated with US technical team to lead Whitelabel BaaS platform Web frontend development, supporting rapid business expansion and legacy system migration',
        'Led frontend system migration for Walmart and Greendot partnership projects, serving tens of millions of users post-launch, significantly improving system stability and financial service agility',
        'Served as Tech Lead for Google reCAPTCHA project, optimizing call strategy through intelligent trigger mechanism, reducing security costs by approximately 70%',
        'Drove automated build and deployment processes across multiple projects, significantly improving release efficiency and code quality',
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
      technologies: ['React', 'Angular', 'TypeScript', 'Karma', 'Jasmine', 'Jest', 'MUI', 'Webpack', '.NET', 'TeamCity', 'Git', 'Azure Front Door'],
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
      technologies: ['React', 'Angular', 'TypeScript', 'Module Federation', 'Karma', 'Jasmine', 'Jest', 'MUI', 'Webpack', '.NET', 'TeamCity', 'Git'],
      highlights: [
        'Adopted micro-frontend architecture design for independent module deployment and upgrades',
        'Implemented 100% configurable architecture supporting different brands/partners using same codebase for differentiated business needs with dynamic theme, image, and copy loading',
        'Completed all core banking modules including user registration, login, account management, fund transfer, and transaction history',
      ],
    },
    {
      name: 'Google reCAPTCHA Security Optimization',
      role: 'Tech Lead',
      period: 'Apr 2022 - Apr 2023',
      description: 'Led Google reCAPTCHA security integration project initiated by company security department, serving as Tech Lead and web development lead, integrating Google reCAPTCHA across all company web and app security-sensitive workflows.',
      technologies: ['React', 'Angular', 'TypeScript', '.NET', 'Web API', 'TeamCity', 'Git'],
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
      category: 'Frontend Development',
      items: ['React', 'Angular', 'TypeScript', 'JavaScript (ES6+)', 'HTML5', 'CSS3', 'MUI'],
    },
    {
      category: 'Engineering & Testing',
      items: ['Webpack', 'Vite', 'Jenkins', 'TeamCity', 'Jest', 'Jasmine', 'Karma'],
    },
    {
      category: 'Backend & Full Stack',
      items: ['Node.js', '.NET', 'C#', 'RESTful API', 'Azure', 'Express'],
    },
    {
      category: 'Development Patterns',
      items: ['Micro-frontend Architecture', 'CI/CD', 'Modular Design', 'Agile Development'],
    },
    {
      category: 'AI Tools',
      items: ['GitHub Copilot', 'Claude Code', 'Codex'],
    },
  ],

  // Languages
  languages: [
    {
      name: 'English',
      level: 'CET-6, Proficient cross-national team communication and collaboration',
    },
  ],

  // Certificates
  certificates: [
  ],

  // Awards
  awards: [
  ],
};
