import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Link,
} from '@react-pdf/renderer';
import type { ResumeData } from '../data/resumeData';

// Register fonts for better Chinese support (optional)
// import { Font } from '@react-pdf/renderer';
// Font.register({
//   family: 'Noto Sans SC',
//   src: 'https://fonts.gstatic.com/s/notosanssc/v12/k3kXo84MPvpLmixcA63oeALhL4iJ-Q7m8w.ttf',
// });

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 10,
    fontFamily: 'Helvetica',
  },
  header: {
    marginBottom: 20,
    textAlign: 'center',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  contactInfo: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginBottom: 5,
  },
  contactItem: {
    marginHorizontal: 8,
    fontSize: 9,
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
    paddingBottom: 3,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  itemTitle: {
    fontSize: 11,
    fontWeight: 'bold',
  },
  itemSubtitle: {
    fontSize: 9,
    color: '#666',
    marginBottom: 3,
  },
  itemDate: {
    fontSize: 9,
    color: '#666',
    textAlign: 'right',
  },
  bulletList: {
    marginLeft: 15,
    marginTop: 3,
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
    fontSize: 9,
    lineHeight: 1.4,
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 5,
  },
  chip: {
    backgroundColor: '#f0f0f0',
    borderRadius: 3,
    padding: '3 6',
    marginRight: 5,
    marginBottom: 5,
    fontSize: 8,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 3,
    fontSize: 9,
  },
  divider: {
    borderBottomWidth: 0.5,
    borderBottomColor: '#ddd',
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
      education: '教育背景',
      workExperience: '工作经历',
      projects: '项目经验',
      skills: '技能',
      certificates: '证书',
      gpa: 'GPA',
      honors: '荣誉',
      responsibilities: '工作职责',
      achievements: '主要成就',
      role: '担任角色',
      technologies: '使用技术',
      highlights: '项目亮点',
    },
    en: {
      education: 'Education',
      workExperience: 'Work Experience',
      projects: 'Projects',
      skills: 'Skills',
      certificates: 'Certificates',
      gpa: 'GPA',
      honors: 'Honors',
      responsibilities: 'Responsibilities',
      achievements: 'Key Achievements',
      role: 'Role',
      technologies: 'Technologies',
      highlights: 'Highlights',
    },
  };

  const t = labels[language];

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.name}>{data.contact.name}</Text>
          <View style={styles.contactInfo}>
            <Text style={styles.contactItem}>{data.contact.email}</Text>
            <Text style={styles.contactItem}>{data.contact.phone}</Text>
            <Text style={styles.contactItem}>{data.contact.address}</Text>
          </View>
          {(data.contact.github || data.contact.linkedin || data.contact.website) && (
            <View style={styles.contactInfo}>
              {data.contact.github && (
                <Link src={data.contact.github} style={styles.contactItem}>
                  GitHub
                </Link>
              )}
              {data.contact.linkedin && (
                <Link src={data.contact.linkedin} style={styles.contactItem}>
                  LinkedIn
                </Link>
              )}
              {data.contact.website && (
                <Link src={data.contact.website} style={styles.contactItem}>
                  Website
                </Link>
              )}
            </View>
          )}
        </View>

        {/* Education */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t.education}</Text>
          {data.education.map((edu, index) => (
            <View key={index} style={{ marginBottom: 10 }}>
              <View style={styles.itemHeader}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.itemTitle}>{edu.degree}</Text>
                  <Text style={styles.itemSubtitle}>
                    {edu.school} - {edu.major}
                  </Text>
                </View>
                <View>
                  <Text style={styles.itemDate}>{edu.location}</Text>
                  <Text style={styles.itemDate}>{edu.period}</Text>
                </View>
              </View>
              {edu.gpa && (
                <Text style={styles.itemSubtitle}>
                  {t.gpa}: {edu.gpa}
                </Text>
              )}
              {edu.honors && edu.honors.length > 0 && (
                <View>
                  <Text style={styles.label}>{t.honors}:</Text>
                  <View style={styles.chipContainer}>
                    {edu.honors.map((honor, i) => (
                      <View key={i} style={styles.chip}>
                        <Text>{honor}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              )}
            </View>
          ))}
        </View>

        {/* Work Experience */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t.workExperience}</Text>
          {data.workExperience.map((work, index) => (
            <View key={index} style={{ marginBottom: 10 }}>
              <View style={styles.itemHeader}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.itemTitle}>{work.position}</Text>
                  <Text style={styles.itemSubtitle}>{work.company}</Text>
                </View>
                <View>
                  <Text style={styles.itemDate}>{work.location}</Text>
                  <Text style={styles.itemDate}>{work.period}</Text>
                </View>
              </View>

              <View style={{ marginTop: 5 }}>
                <Text style={styles.label}>{t.responsibilities}:</Text>
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
                <View style={{ marginTop: 3 }}>
                  <Text style={styles.label}>{t.achievements}:</Text>
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

        {/* Projects */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t.projects}</Text>
          {data.projects.map((project, index) => (
            <View key={index} style={{ marginBottom: 10 }}>
              <View style={styles.itemHeader}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.itemTitle}>{project.name}</Text>
                  <Text style={styles.itemSubtitle}>
                    {t.role}: {project.role}
                  </Text>
                </View>
                <Text style={styles.itemDate}>{project.period}</Text>
              </View>

              <Text style={styles.itemSubtitle}>{project.description}</Text>

              <View style={{ marginTop: 3 }}>
                <Text style={styles.label}>{t.technologies}:</Text>
                <View style={styles.chipContainer}>
                  {project.technologies.map((tech, i) => (
                    <View key={i} style={styles.chip}>
                      <Text>{tech}</Text>
                    </View>
                  ))}
                </View>
              </View>

              <View style={{ marginTop: 3 }}>
                <Text style={styles.label}>{t.highlights}:</Text>
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

        {/* Skills */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t.skills}</Text>
          {data.skills.map((skillGroup, index) => (
            <View key={index} style={{ marginBottom: 8 }}>
              <Text style={styles.label}>{skillGroup.category}:</Text>
              <View style={styles.chipContainer}>
                {skillGroup.items.map((skill, i) => (
                  <View key={i} style={styles.chip}>
                    <Text>{skill}</Text>
                  </View>
                ))}
              </View>
            </View>
          ))}
        </View>

        {/* Certificates */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t.certificates}</Text>
          {data.certificates.map((cert, index) => (
            <View key={index} style={{ marginBottom: 8 }}>
              <View style={styles.itemHeader}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.itemTitle}>{cert.name}</Text>
                  <Text style={styles.itemSubtitle}>{cert.issuer}</Text>
                  {cert.id && (
                    <Text style={styles.itemSubtitle}>ID: {cert.id}</Text>
                  )}
                </View>
                <Text style={styles.itemDate}>{cert.date}</Text>
              </View>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
};

export default ResumePDF;
