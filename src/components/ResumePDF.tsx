import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Link,
  Font,
  Image,
} from '@react-pdf/renderer';
import type { ResumeData } from '../data/resumeData';
import { resumeTheme } from '../theme/resumeTheme';

// Register Chinese fonts from local files for better compatibility
Font.register({
  family: 'Source Han Sans CN',
  fonts: [
    {
      src: '/fonts/SourceHanSansCN-Regular.ttf',
      fontWeight: 'normal',
    },
    {
      src: '/fonts/SourceHanSansCN-Bold.ttf',
      fontWeight: 'bold',
    },
  ],
});

const colors = {
  primary: resumeTheme.colors.primary,
  sidebarBg: resumeTheme.colors.sidebarBg,
  sidebarText: resumeTheme.colors.sidebarText,
  textPrimary: resumeTheme.colors.textPrimary,
  textSecondary: resumeTheme.colors.textSecondary,
};

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    fontSize: 9,
    fontFamily: 'Source Han Sans CN',
  },
  // 侧边栏样式
  sidebar: {
    width: resumeTheme.pdf.sidebarWidth,
    backgroundColor: colors.sidebarBg,
    color: colors.sidebarText,
    padding: 20,
  },
  sidebarAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
    alignSelf: 'center',
  },
  sidebarName: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
    color: colors.sidebarText,
  },
  sidebarSection: {
    marginBottom: 12,
  },
  sidebarSectionTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    marginBottom: 6,
    color: colors.sidebarText,
  },
  sidebarText: {
    fontSize: 8,
    lineHeight: 1.4,
    marginBottom: 4,
    color: colors.sidebarText,
  },
  sidebarLink: {
    fontSize: 8,
    color: colors.sidebarText,
    textDecoration: 'none',
    marginBottom: 4,
  },
  sidebarDivider: {
    borderBottomWidth: 0.5,
    borderBottomColor: 'rgba(255,255,255,0.3)',
    marginVertical: 8,
  },
  skillCategory: {
    fontSize: 8,
    fontWeight: 'bold',
    marginBottom: 3,
    color: colors.primary,
  },
  skillItem: {
    fontSize: 7,
    marginBottom: 2,
    color: colors.sidebarText,
  },

  // 主体内容样式
  main: {
    flex: 1,
    padding: 30,
    backgroundColor: 'white',
  },
  jobIntention: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 5,
  },
  jobTitle: {
    fontSize: 14,
    color: colors.textPrimary,
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.primary,
    paddingBottom: 3,
  },
  subsectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  subsectionTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  subsectionSubtitle: {
    fontSize: 9,
    color: colors.textSecondary,
    marginBottom: 3,
  },
  subsectionDate: {
    fontSize: 8,
    color: colors.textSecondary,
    textAlign: 'right',
  },
  bodyText: {
    fontSize: 8.5,
    lineHeight: 1.5,
    color: colors.textPrimary,
    marginBottom: 3,
    textAlign: 'justify',
  },
  bulletList: {
    marginLeft: 10,
    marginTop: 3,
    marginBottom: 8,
  },
  bulletItem: {
    flexDirection: 'row',
    marginBottom: 3,
  },
  bullet: {
    width: 5,
    fontSize: 8,
  },
  bulletText: {
    flex: 1,
    fontSize: 8,
    lineHeight: 1.4,
  },
  labelBold: {
    fontSize: 8,
    fontWeight: 'bold',
    marginBottom: 3,
    color: colors.textPrimary,
  },
  chip: {
    fontSize: 7,
    backgroundColor: '#f0f0f0',
    borderRadius: 3,
    padding: '2 5',
    marginRight: 4,
    marginBottom: 4,
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 3,
    marginBottom: 5,
  },
  card: {
    marginBottom: 10,
    padding: 8,
    backgroundColor: '#fafafa',
    borderRadius: 4,
  },
  badge: {
    fontSize: 7,
    backgroundColor: colors.primary,
    color: 'white',
    borderRadius: 2,
    padding: '2 4',
    marginLeft: 4,
  },
  divider: {
    borderBottomWidth: 0.5,
    borderBottomColor: '#e0e0e0',
    marginVertical: 10,
  },
});

interface ResumePDFProps {
  data: ResumeData;
  language: 'zh' | 'en';
}

const ResumePDF = ({ data, language }: ResumePDFProps) => {
  const labels = {
    zh: {
      basicInfo: '基本信息',
      contact: '联系方式',
      skills: '专业技能',
      languages: '语言能力',
      certificates: '证书',
      jobIntention: '求职意向',
      personalSummary: '个人简介',
      education: '教育背景',
      workExperience: '工作经历',
      projects: '项目经验',
      awards: '获奖经历',
      gender: '性别',
      birthDate: '出生日期',
      political: '政治面貌',
      researchDirection: '研究方向',
      gpa: 'GPA',
      honors: '荣誉',
      responsibilities: '工作职责',
      achievements: '主要成就',
      role: '担任角色',
      technologies: '使用技术',
      highlights: '项目亮点',
      level: '级别',
      inProgress: '在读',
      expected: '预计',
    },
    en: {
      basicInfo: 'Basic Info',
      contact: 'Contact',
      skills: 'Skills',
      languages: 'Languages',
      certificates: 'Certificates',
      jobIntention: 'Job Intention',
      personalSummary: 'Personal Summary',
      education: 'Education',
      workExperience: 'Work Experience',
      projects: 'Projects',
      awards: 'Awards',
      gender: 'Gender',
      birthDate: 'Birth',
      political: 'Political',
      researchDirection: 'Research',
      gpa: 'GPA',
      honors: 'Honors',
      responsibilities: 'Responsibilities',
      achievements: 'Achievements',
      role: 'Role',
      technologies: 'Technologies',
      highlights: 'Highlights',
      level: 'Level',
      inProgress: 'In Progress',
      expected: 'Expected',
    },
  };

  const t = labels[language];

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* 左侧边栏 */}
        <View style={styles.sidebar}>
          {/* 照片 */}
          {data.personalInfo.photo && (
            <Image
              src={data.personalInfo.photo}
              style={styles.sidebarAvatar}
            />
          )}

          {/* 姓名 */}
          <Text style={styles.sidebarName}>{data.contact.name}</Text>

          <View style={styles.sidebarDivider} />

          {/* 基本信息 */}
          <View style={styles.sidebarSection}>
            <Text style={styles.sidebarSectionTitle}>{t.basicInfo}</Text>
            <Text style={styles.sidebarText}>{t.gender}: {data.personalInfo.gender}</Text>
            <Text style={styles.sidebarText}>{t.birthDate}: {data.personalInfo.birthDate}</Text>
            <Text style={styles.sidebarText}>{t.political}: {data.personalInfo.politicalStatus}</Text>
          </View>

          <View style={styles.sidebarDivider} />

          {/* 联系方式 */}
          <View style={styles.sidebarSection}>
            <Text style={styles.sidebarSectionTitle}>{t.contact}</Text>
            <Link src={`mailto:${data.contact.email}`} style={styles.sidebarLink}>
              {data.contact.email}
            </Link>
            <Text style={styles.sidebarText}>{data.contact.phone}</Text>
            <Text style={styles.sidebarText}>{data.contact.address}</Text>
            {data.contact.github && (
              <Link src={data.contact.github} style={styles.sidebarLink}>
                GitHub
              </Link>
            )}
            {data.contact.linkedin && (
              <Link src={data.contact.linkedin} style={styles.sidebarLink}>
                LinkedIn
              </Link>
            )}
            {data.contact.website && (
              <Link src={data.contact.website} style={styles.sidebarLink}>
                Website
              </Link>
            )}
          </View>

          <View style={styles.sidebarDivider} />

          {/* 技能 */}
          <View style={styles.sidebarSection}>
            <Text style={styles.sidebarSectionTitle}>{t.skills}</Text>
            {data.skills.map((skillGroup, index) => (
              <View key={index} style={{ marginBottom: 6 }}>
                <Text style={styles.skillCategory}>{skillGroup.category}</Text>
                {skillGroup.items.map((skill, i) => (
                  <Text key={i} style={styles.skillItem}>• {skill}</Text>
                ))}
              </View>
            ))}
          </View>

          <View style={styles.sidebarDivider} />

          {/* 语言能力 */}
          <View style={styles.sidebarSection}>
            <Text style={styles.sidebarSectionTitle}>{t.languages}</Text>
            {data.languages.map((lang, index) => (
              <View key={index} style={{ marginBottom: 4 }}>
                <Text style={styles.skillCategory}>{lang.name}</Text>
                <Text style={styles.sidebarText}>{lang.level}</Text>
              </View>
            ))}
          </View>

          <View style={styles.sidebarDivider} />

          {/* 证书 */}
          <View style={styles.sidebarSection}>
            <Text style={styles.sidebarSectionTitle}>{t.certificates}</Text>
            {data.certificates.map((cert, index) => (
              <View key={index} style={{ marginBottom: 5 }}>
                <Text style={styles.skillCategory}>{cert.name}</Text>
                <Text style={styles.sidebarText}>{cert.issuer}</Text>
                <Text style={styles.sidebarText}>{cert.date}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* 右侧主体内容 */}
        <View style={styles.main}>
          {/* 求职意向 */}
          <View style={{ marginBottom: 15 }}>
            <Text style={styles.jobIntention}>{t.jobIntention}</Text>
            <Text style={styles.jobTitle}>{data.jobIntention}</Text>
          </View>

          <View style={styles.divider} />

          {/* 个人简介 */}
          <View style={{ marginBottom: 15 }}>
            <Text style={styles.sectionTitle}>{t.personalSummary}</Text>
            <View style={styles.card}>
              <Text style={styles.bodyText}>{data.personalSummary}</Text>
            </View>
          </View>

          <View style={styles.divider} />

          {/* 教育背景 */}
          <View style={{ marginBottom: 15 }}>
            <Text style={styles.sectionTitle}>{t.education}</Text>
            {data.education.map((edu, index) => (
              <View key={index} style={styles.card}>
                <View style={styles.subsectionHeader}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.subsectionTitle}>
                      {edu.degree}
                      {edu.isInProgress && ` (${t.inProgress})`}
                    </Text>
                    <Text style={styles.subsectionSubtitle}>
                      {edu.school} · {edu.major}
                    </Text>
                    {edu.researchDirection && (
                      <Text style={styles.subsectionSubtitle}>
                        {t.researchDirection}: {edu.researchDirection}
                      </Text>
                    )}
                  </View>
                  <View>
                    <Text style={styles.subsectionDate}>{edu.location}</Text>
                    <Text style={styles.subsectionDate}>
                      {edu.period}
                      {edu.isInProgress && edu.expectedGraduation && ` (${t.expected} ${edu.expectedGraduation})`}
                    </Text>
                  </View>
                </View>
                {edu.gpa && (
                  <Text style={styles.bodyText}>{t.gpa}: {edu.gpa}</Text>
                )}
                {edu.honors && edu.honors.length > 0 && (
                  <View>
                    <Text style={styles.labelBold}>{t.honors}:</Text>
                    <View style={styles.chipContainer}>
                      {edu.honors.map((honor, i) => (
                        <Text key={i} style={styles.chip}>{honor}</Text>
                      ))}
                    </View>
                  </View>
                )}
              </View>
            ))}
          </View>

          <View style={styles.divider} />

          {/* 工作经历 */}
          <View style={{ marginBottom: 15 }}>
            <Text style={styles.sectionTitle}>{t.workExperience}</Text>
            {data.workExperience.map((work, index) => (
              <View key={index} style={styles.card}>
                <View style={styles.subsectionHeader}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.subsectionTitle}>{work.position}</Text>
                    <Text style={styles.subsectionSubtitle}>{work.company}</Text>
                  </View>
                  <View>
                    <Text style={styles.subsectionDate}>{work.location}</Text>
                    <Text style={styles.subsectionDate}>{work.period}</Text>
                  </View>
                </View>

                <View style={{ marginTop: 5 }}>
                  <Text style={styles.labelBold}>{t.responsibilities}:</Text>
                  <View style={styles.bulletList}>
                    {work.responsibilities.map((resp, i) => (
                      <View key={i} style={styles.bulletItem}>
                        <Text style={styles.bullet}>•</Text>
                        <Text style={styles.bulletText}>{resp}</Text>
                      </View>
                    ))}
                  </View>
                </View>

                {work.achievements && work.achievements.length > 0 && (
                  <View>
                    <Text style={styles.labelBold}>{t.achievements}:</Text>
                    <View style={styles.bulletList}>
                      {work.achievements.map((achievement, i) => (
                        <View key={i} style={styles.bulletItem}>
                          <Text style={styles.bullet}>•</Text>
                          <Text style={styles.bulletText}>{achievement}</Text>
                        </View>
                      ))}
                    </View>
                  </View>
                )}
              </View>
            ))}
          </View>

          <View style={styles.divider} />

          {/* 项目经验 */}
          <View style={{ marginBottom: 15 }}>
            <Text style={styles.sectionTitle}>{t.projects}</Text>
            {data.projects.map((project, index) => (
              <View key={index} style={styles.card}>
                <View style={styles.subsectionHeader}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.subsectionTitle}>{project.name}</Text>
                    <Text style={styles.subsectionSubtitle}>
                      {t.role}: {project.role}
                    </Text>
                  </View>
                  <Text style={styles.subsectionDate}>{project.period}</Text>
                </View>

                <Text style={styles.bodyText}>{project.description}</Text>

                <View style={{ marginTop: 3 }}>
                  <Text style={styles.labelBold}>{t.technologies}:</Text>
                  <View style={styles.chipContainer}>
                    {project.technologies.map((tech, i) => (
                      <Text key={i} style={styles.chip}>{tech}</Text>
                    ))}
                  </View>
                </View>

                <View>
                  <Text style={styles.labelBold}>{t.highlights}:</Text>
                  <View style={styles.bulletList}>
                    {project.highlights.map((highlight, i) => (
                      <View key={i} style={styles.bulletItem}>
                        <Text style={styles.bullet}>•</Text>
                        <Text style={styles.bulletText}>{highlight}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              </View>
            ))}
          </View>

          <View style={styles.divider} />

          {/* 获奖经历 */}
          <View>
            <Text style={styles.sectionTitle}>{t.awards}</Text>
            {data.awards.map((award, index) => (
              <View key={index} style={styles.card}>
                <View style={styles.subsectionHeader}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.subsectionTitle}>
                      {award.name}
                      {award.level && <Text style={styles.badge}> {award.level}</Text>}
                    </Text>
                    <Text style={styles.subsectionSubtitle}>{award.issuer}</Text>
                  </View>
                  <Text style={styles.subsectionDate}>{award.date}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default ResumePDF;
