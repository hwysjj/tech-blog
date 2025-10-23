import { useState } from 'react';
import {
  Container,
  Box,
  Typography,
  Button,
  Divider,
  Chip,
  Stack,
  Link,
  ToggleButtonGroup,
  ToggleButton,
  Avatar,
  Card,
  CardContent,
  useMediaQuery,
  useTheme as useMuiTheme,
} from '@mui/material';
import {
  Download,
  Email,
  Phone,
  LocationOn,
  GitHub,
  LinkedIn,
  Public,
  Person,
  Cake,
  Flag,
  School,
  Work,
  Code,
  EmojiEvents,
  Language as LanguageIcon,
  CardMembership,
} from '@mui/icons-material';
import { pdf } from '@react-pdf/renderer';
import type { ResumeData } from '../data/resumeData';
import { resumeDataZh, resumeDataEn } from '../data/resumeData';
import ResumePDF from '../components/ResumePDF';
import { resumeTheme } from '../theme/resumeTheme';

const Resume = () => {
  const [language, setLanguage] = useState<'zh' | 'en'>('zh');
  const muiTheme = useMuiTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('md'));

  const data: ResumeData = language === 'zh' ? resumeDataZh : resumeDataEn;

  const labels = {
    zh: {
      download: '下载简历',
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
      degreeLevel: '学位',
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
      download: 'Download Resume',
      basicInfo: 'Basic Information',
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
      birthDate: 'Birth Date',
      political: 'Political Status',
      degreeLevel: 'Degree',
      researchDirection: 'Research',
      gpa: 'GPA',
      honors: 'Honors',
      responsibilities: 'Responsibilities',
      achievements: 'Key Achievements',
      role: 'Role',
      technologies: 'Technologies',
      highlights: 'Highlights',
      level: 'Level',
      inProgress: 'In Progress',
      expected: 'Expected',
    },
  };

  const t = labels[language];

  const handleLanguageChange = (_: React.MouseEvent<HTMLElement>, newLanguage: 'zh' | 'en' | null) => {
    if (newLanguage !== null) {
      setLanguage(newLanguage);
    }
  };

  const handleDownload = async () => {
    try {
      const blob = await pdf(<ResumePDF data={data} language={language} />).toBlob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      const fileName = language === 'zh'
        ? `${data.contact.name}_简历_${new Date().toISOString().split('T')[0]}.pdf`
        : `${data.contact.name}_Resume_${new Date().toISOString().split('T')[0]}.pdf`;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  // 左侧边栏组件
  const Sidebar = () => (
    <Box
      sx={{
        backgroundColor: resumeTheme.colors.sidebarBg,
        color: resumeTheme.colors.sidebarText,
        p: 3,
        minHeight: isMobile ? 'auto' : '100vh',
      }}
    >
      {/* 照片 */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
        <Avatar
          src={data.personalInfo.photo}
          alt={data.contact.name}
          sx={{
            width: 150,
            height: 150,
            border: `4px solid ${resumeTheme.colors.primary}`,
          }}
        />
      </Box>

      {/* 姓名 */}
      <Typography
        variant="h4"
        sx={{
          fontWeight: 'bold',
          textAlign: 'center',
          mb: 1,
          color: resumeTheme.colors.sidebarText,
        }}
      >
        {data.contact.name}
      </Typography>

      <Divider sx={{ my: 2, borderColor: 'rgba(255,255,255,0.2)' }} />

      {/* 基本信息 */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
          <Person fontSize="small" />
          {t.basicInfo}
        </Typography>
        <Stack spacing={1.5}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Person fontSize="small" sx={{ opacity: 0.7 }} />
            <Typography variant="body2">{t.gender}: {data.personalInfo.gender}</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Cake fontSize="small" sx={{ opacity: 0.7 }} />
            <Typography variant="body2">{t.birthDate}: {data.personalInfo.birthDate}</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Flag fontSize="small" sx={{ opacity: 0.7 }} />
            <Typography variant="body2">{t.political}: {data.personalInfo.politicalStatus}</Typography>
          </Box>
        </Stack>
      </Box>

      <Divider sx={{ my: 2, borderColor: 'rgba(255,255,255,0.2)' }} />

      {/* 联系方式 */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>{t.contact}</Typography>
        <Stack spacing={1.5}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Email fontSize="small" sx={{ opacity: 0.7 }} />
            <Link
              href={`mailto:${data.contact.email}`}
              sx={{ color: resumeTheme.colors.sidebarText, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
            >
              <Typography variant="body2" sx={{ wordBreak: 'break-all' }}>
                {data.contact.email}
              </Typography>
            </Link>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Phone fontSize="small" sx={{ opacity: 0.7 }} />
            <Link
              href={`tel:${data.contact.phone}`}
              sx={{ color: resumeTheme.colors.sidebarText, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
            >
              <Typography variant="body2">{data.contact.phone}</Typography>
            </Link>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <LocationOn fontSize="small" sx={{ opacity: 0.7 }} />
            <Typography variant="body2">{data.contact.address}</Typography>
          </Box>
          {data.contact.github && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <GitHub fontSize="small" sx={{ opacity: 0.7 }} />
              <Link
                href={data.contact.github}
                target="_blank"
                rel="noopener"
                sx={{ color: resumeTheme.colors.sidebarText, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
              >
                <Typography variant="body2" sx={{ wordBreak: 'break-all' }}>GitHub</Typography>
              </Link>
            </Box>
          )}
          {data.contact.linkedin && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <LinkedIn fontSize="small" sx={{ opacity: 0.7 }} />
              <Link
                href={data.contact.linkedin}
                target="_blank"
                rel="noopener"
                sx={{ color: resumeTheme.colors.sidebarText, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
              >
                <Typography variant="body2" sx={{ wordBreak: 'break-all' }}>LinkedIn</Typography>
              </Link>
            </Box>
          )}
          {data.contact.website && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Public fontSize="small" sx={{ opacity: 0.7 }} />
              <Link
                href={data.contact.website}
                target="_blank"
                rel="noopener"
                sx={{ color: resumeTheme.colors.sidebarText, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
              >
                <Typography variant="body2" sx={{ wordBreak: 'break-all' }}>Website</Typography>
              </Link>
            </Box>
          )}
        </Stack>
      </Box>

      <Divider sx={{ my: 2, borderColor: 'rgba(255,255,255,0.2)' }} />

      {/* 语言能力 */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
          <LanguageIcon fontSize="small" />
          {t.languages}
        </Typography>
        <Stack spacing={1.5}>
          {data.languages.map((lang, index) => (
            <Box key={index}>
              <Typography variant="body2" sx={{ fontWeight: 'bold', color: resumeTheme.colors.primary }}>
                {lang.name}
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.9, fontSize: '0.85rem' }}>
                {lang.level}
              </Typography>
            </Box>
          ))}
        </Stack>
      </Box>

      <Divider sx={{ my: 2, borderColor: 'rgba(255,255,255,0.2)' }} />

      {/* 技能 */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
          <Code fontSize="small" />
          {t.skills}
        </Typography>
        <Stack spacing={2}>
          {data.skills.map((skillGroup, index) => (
            <Box key={index}>
              <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1, color: resumeTheme.colors.primary }}>
                {skillGroup.category}
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {skillGroup.items.map((skill, i) => (
                  <Chip
                    key={i}
                    label={skill}
                    size="small"
                    sx={{
                      backgroundColor: 'rgba(255,255,255,0.1)',
                      color: resumeTheme.colors.sidebarText,
                      fontSize: '0.7rem',
                    }}
                  />
                ))}
              </Box>
            </Box>
          ))}
        </Stack>
      </Box>

      {/* 证书 */}
      {data.certificates.length > 0 && (
        <>
          <Divider sx={{ my: 2, borderColor: 'rgba(255,255,255,0.2)' }} />
          <Box>
            <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
              <CardMembership fontSize="small" />
              {t.certificates}
            </Typography>
            <Stack spacing={2}>
              {data.certificates.map((cert, index) => (
                <Box key={index}>
                  <Typography variant="body2" sx={{ fontWeight: 'bold', color: resumeTheme.colors.primary }}>
                    {cert.name}
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.9, fontSize: '0.85rem' }}>
                    {cert.issuer}
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.7, fontSize: '0.75rem' }}>
                    {cert.date}
                  </Typography>
                </Box>
              ))}
            </Stack>
          </Box>
        </>
      )}
    </Box>
  );

  // 右侧主体内容组件
  const MainContent = () => (
    <Box sx={{ p: isMobile ? 2 : 4 }}>
      {/* 求职意向 */}
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 'bold',
            color: resumeTheme.colors.primary,
            mb: 1,
            display: 'flex',
            alignItems: 'center',
            gap: 1,
          }}
        >
          <Work />
          {t.jobIntention}
        </Typography>
        <Typography variant="h5">
          {data.jobIntention}
        </Typography>
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* 个人简介 */}
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h5"
          sx={{
            fontWeight: 'bold',
            color: resumeTheme.colors.primary,
            mb: 2,
          }}
        >
          {t.personalSummary}
        </Typography>
        <Card elevation={1}>
          <CardContent>
            <Typography variant="body1" sx={{ lineHeight: 1.8, textAlign: 'justify' }}>
              {data.personalSummary}
            </Typography>
          </CardContent>
        </Card>
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* 工作经历 */}
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h5"
          sx={{
            fontWeight: 'bold',
            color: resumeTheme.colors.primary,
            mb: 2,
            display: 'flex',
            alignItems: 'center',
            gap: 1,
          }}
        >
          <Work />
          {t.workExperience}
        </Typography>
        <Stack spacing={3}>
          {data.workExperience.map((work, index) => (
            <Card key={index} elevation={1}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', mb: 2 }}>
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                      {work.position}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      {work.company}
                    </Typography>
                  </Box>
                  <Box sx={{ textAlign: isMobile ? 'left' : 'right', mt: isMobile ? 1 : 0 }}>
                    <Typography variant="body2" color="text.secondary">
                      {work.location}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {work.period}
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ mb: 1.5 }}>
                  <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1 }}>
                    {t.responsibilities}:
                  </Typography>
                  <ul style={{ margin: 0, paddingLeft: '20px' }}>
                    {work.responsibilities.map((resp, i) => (
                      <li key={i}>
                        <Typography variant="body2" sx={{ lineHeight: 1.6 }}>{resp}</Typography>
                      </li>
                    ))}
                  </ul>
                </Box>

                {work.achievements && work.achievements.length > 0 && (
                  <Box>
                    <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1, color: resumeTheme.colors.primary }}>
                      {t.achievements}:
                    </Typography>
                    <ul style={{ margin: 0, paddingLeft: '20px' }}>
                      {work.achievements.map((achievement, i) => (
                        <li key={i}>
                          <Typography variant="body2" sx={{ lineHeight: 1.6 }}>{achievement}</Typography>
                        </li>
                      ))}
                    </ul>
                  </Box>
                )}
              </CardContent>
            </Card>
          ))}
        </Stack>
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* 项目经验 */}
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h5"
          sx={{
            fontWeight: 'bold',
            color: resumeTheme.colors.primary,
            mb: 2,
            display: 'flex',
            alignItems: 'center',
            gap: 1,
          }}
        >
          <Code />
          {t.projects}
        </Typography>
        <Stack spacing={3}>
          {data.projects.map((project, index) => (
            <Card key={index} elevation={1}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', mb: 1 }}>
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                      {project.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {t.role}: {project.role}
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: isMobile ? 1 : 0 }}>
                    {project.period}
                  </Typography>
                </Box>

                <Typography variant="body2" sx={{ my: 1.5, lineHeight: 1.6 }}>
                  {project.description}
                </Typography>

                <Box sx={{ mb: 1.5 }}>
                  <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 0.5 }}>
                    {t.technologies}:
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {project.technologies.map((tech, i) => (
                      <Chip key={i} label={tech} size="small" sx={{ fontSize: '0.75rem' }} />
                    ))}
                  </Box>
                </Box>

                {project.highlights && project.highlights.length > 0 && (
                  <Box>
                    <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1, color: resumeTheme.colors.primary }}>
                      {t.highlights}:
                    </Typography>
                    <ul style={{ margin: 0, paddingLeft: '20px' }}>
                      {project.highlights.map((highlight, i) => (
                        <li key={i}>
                          <Typography variant="body2" sx={{ lineHeight: 1.6 }}>{highlight}</Typography>
                        </li>
                      ))}
                    </ul>
                  </Box>
                )}
              </CardContent>
            </Card>
          ))}
        </Stack>
      </Box>

      {/* 教育背景 */}
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h5"
          sx={{
            fontWeight: 'bold',
            color: resumeTheme.colors.primary,
            mb: 2,
            display: 'flex',
            alignItems: 'center',
            gap: 1,
          }}
        >
        <School />
          {t.education}
        </Typography>
        <Stack spacing={3}>
          {data.education.map((edu, index) => (
            <Card key={index} elevation={1}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', mb: 1 }}>
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                      {edu.degree}
                      {edu.isInProgress && (
                        <Chip
                          label={t.inProgress}
                          size="small"
                          color="primary"
                          sx={{ ml: 1, fontSize: '0.7rem' }}
                        />
                      )}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      {edu.school} · {edu.major}
                    </Typography>
                    {edu.researchDirection && (
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                        {t.researchDirection}: {edu.researchDirection}
                      </Typography>
                    )}
                  </Box>
                  <Box sx={{ textAlign: isMobile ? 'left' : 'right', mt: isMobile ? 1 : 0 }}>
                    <Typography variant="body2" color="text.secondary">
                      {edu.location}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {edu.period}
                      {edu.isInProgress && edu.expectedGraduation && ` (${t.expected} ${edu.expectedGraduation})`}
                    </Typography>
                  </Box>
                </Box>
                {edu.gpa && (
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    {t.gpa}: <strong>{edu.gpa}</strong>
                  </Typography>
                )}
                {edu.honors && edu.honors.length > 0 && (
                  <Box sx={{ mt: 1 }}>
                    <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 0.5 }}>
                      {t.honors}:
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {edu.honors.map((honor, i) => (
                        <Chip key={i} label={honor} size="small" color="primary" />
                      ))}
                    </Box>
                  </Box>
                )}
              </CardContent>
            </Card>
          ))}
        </Stack>
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* 获奖经历 */}
      {data.awards.length > 0 && (
        <>
          <Divider sx={{ my: 3 }} />
          <Box>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 'bold',
                color: resumeTheme.colors.primary,
                mb: 2,
                display: 'flex',
                alignItems: 'center',
                gap: 1,
              }}
            >
              <EmojiEvents />
              {t.awards}
            </Typography>
            <Stack spacing={2}>
              {data.awards.map((award, index) => (
                <Card key={index} elevation={1}>
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                          {award.name}
                          {award.level && (
                            <Chip
                              label={award.level}
                              size="small"
                              color="success"
                              sx={{ ml: 1, fontSize: '0.7rem' }}
                            />
                          )}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {award.issuer}
                        </Typography>
                      </Box>
                      <Typography variant="body2" color="text.secondary" sx={{ mt: isMobile ? 1 : 0 }}>
                        {award.date}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Stack>
          </Box>
        </>
      )}
    </Box>
  );

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      {/* 顶部工具栏 */}
      <Box
        sx={{
          position: 'sticky',
          top: 0,
          zIndex: 1000,
          backgroundColor: 'white',
          borderBottom: '1px solid #e0e0e0',
          py: 2,
          px: 3,
        }}
      >
        <Container maxWidth="xl">
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <ToggleButtonGroup
              value={language}
              exclusive
              onChange={handleLanguageChange}
              size="small"
            >
              <ToggleButton value="zh">中文</ToggleButton>
              <ToggleButton value="en">English</ToggleButton>
            </ToggleButtonGroup>

            <Button
              variant="contained"
              startIcon={<Download />}
              onClick={handleDownload}
              size="large"
              sx={{
                backgroundColor: resumeTheme.colors.primary,
                '&:hover': {
                  backgroundColor: resumeTheme.colors.primaryDark,
                },
              }}
            >
              {t.download}
            </Button>
          </Box>
        </Container>
      </Box>

      {/* 主要内容区域 - 侧边栏布局 */}
      <Container maxWidth="xl" disableGutters>
        <Box
          sx={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            minHeight: isMobile ? 'auto' : 'calc(100vh - 80px)',
          }}
        >
          {/* 左侧边栏 */}
          <Box
            sx={{
              width: isMobile ? '100%' : '30%',
              minWidth: isMobile ? 'auto' : '280px',
              maxWidth: isMobile ? '100%' : '350px',
            }}
          >
            <Sidebar />
          </Box>

          {/* 右侧主体内容 */}
          <Box
            sx={{
              flex: 1,
              backgroundColor: 'white',
              overflow: 'auto',
            }}
          >
            <MainContent />
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Resume;
