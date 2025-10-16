import { useState } from 'react';
import {
  Container,
  Box,
  Typography,
  Button,
  Paper,
  Divider,
  Chip,
  Stack,
  Link,
  IconButton,
  ToggleButtonGroup,
  ToggleButton,
} from '@mui/material';
import {
  Download,
  Email,
  Phone,
  LocationOn,
  GitHub,
  LinkedIn,
  Public,
} from '@mui/icons-material';
import { pdf } from '@react-pdf/renderer';
import type { ResumeData } from '../data/resumeData';
import { resumeDataZh, resumeDataEn } from '../data/resumeData';
import ResumePDF from '../components/ResumePDF';

const Resume = () => {
  const [language, setLanguage] = useState<'zh' | 'en'>('zh');

  const data: ResumeData = language === 'zh' ? resumeDataZh : resumeDataEn;

  const labels = {
    zh: {
      download: '下载简历',
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
      present: '至今',
    },
    en: {
      download: 'Download Resume',
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
      present: 'Present',
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
      // Generate PDF
      const blob = await pdf(<ResumePDF data={data} language={language} />).toBlob();

      // Create download link
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;

      // Set filename based on language
      const fileName = language === 'zh'
        ? `${data.contact.name}_简历_${new Date().toISOString().split('T')[0]}.pdf`
        : `${data.contact.name}_Resume_${new Date().toISOString().split('T')[0]}.pdf`;

      link.download = fileName;

      // Trigger download
      document.body.appendChild(link);
      link.click();

      // Cleanup
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header with Language Toggle and Download Button */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <ToggleButtonGroup
          value={language}
          exclusive
          onChange={handleLanguageChange}
          size="small"
        >
          <ToggleButton value="zh">
            中文
          </ToggleButton>
          <ToggleButton value="en">
            English
          </ToggleButton>
        </ToggleButtonGroup>

        <Button
          variant="contained"
          startIcon={<Download />}
          onClick={handleDownload}
          size="large"
        >
          {t.download}
        </Button>
      </Box>

      <Paper elevation={3} sx={{ p: 4 }}>
        {/* Contact Information */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold', textAlign: 'center' }}>
            {data.contact.name}
          </Typography>

          <Stack
            direction="row"
            spacing={3}
            justifyContent="center"
            flexWrap="wrap"
            sx={{ mt: 2 }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <Email fontSize="small" color="action" />
              <Link href={`mailto:${data.contact.email}`} underline="hover">
                {data.contact.email}
              </Link>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <Phone fontSize="small" color="action" />
              <Link href={`tel:${data.contact.phone}`} underline="hover">
                {data.contact.phone}
              </Link>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <LocationOn fontSize="small" color="action" />
              <Typography variant="body2">{data.contact.address}</Typography>
            </Box>
          </Stack>

          <Stack
            direction="row"
            spacing={2}
            justifyContent="center"
            sx={{ mt: 1 }}
          >
            {data.contact.github && (
              <Link href={data.contact.github} target="_blank" rel="noopener">
                <IconButton size="small">
                  <GitHub />
                </IconButton>
              </Link>
            )}
            {data.contact.linkedin && (
              <Link href={data.contact.linkedin} target="_blank" rel="noopener">
                <IconButton size="small">
                  <LinkedIn />
                </IconButton>
              </Link>
            )}
            {data.contact.website && (
              <Link href={data.contact.website} target="_blank" rel="noopener">
                <IconButton size="small">
                  <Public />
                </IconButton>
              </Link>
            )}
          </Stack>
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* Education */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', mb: 2 }}>
            {t.education}
          </Typography>
          {data.education.map((edu, index) => (
            <Box key={index} sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2, flexWrap: 'wrap' }}>
                <Box sx={{ flex: '1 1 60%', minWidth: '200px' }}>
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    {edu.degree}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {edu.school} - {edu.major}
                  </Typography>
                </Box>
                <Box sx={{ flex: '0 0 auto', textAlign: 'right' }}>
                  <Typography variant="body2" color="text.secondary">
                    {edu.location}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {edu.period}
                  </Typography>
                </Box>
              </Box>
              {edu.gpa && (
                <Typography variant="body2" sx={{ mt: 1 }}>
                  {t.gpa}: {edu.gpa}
                </Typography>
              )}
              {edu.honors && edu.honors.length > 0 && (
                <Box sx={{ mt: 1 }}>
                  <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                    {t.honors}:
                  </Typography>
                  <Stack direction="row" spacing={1} sx={{ mt: 0.5 }}>
                    {edu.honors.map((honor, i) => (
                      <Chip key={i} label={honor} size="small" color="primary" variant="outlined" />
                    ))}
                  </Stack>
                </Box>
              )}
            </Box>
          ))}
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* Work Experience */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', mb: 2 }}>
            {t.workExperience}
          </Typography>
          {data.workExperience.map((work, index) => (
            <Box key={index} sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2, flexWrap: 'wrap' }}>
                <Box sx={{ flex: '1 1 60%', minWidth: '200px' }}>
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    {work.position}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {work.company}
                  </Typography>
                </Box>
                <Box sx={{ flex: '0 0 auto', textAlign: 'right' }}>
                  <Typography variant="body2" color="text.secondary">
                    {work.location}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {work.period}
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ mt: 2 }}>
                <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1 }}>
                  {t.responsibilities}:
                </Typography>
                <ul style={{ margin: 0, paddingLeft: '20px' }}>
                  {work.responsibilities.map((resp, i) => (
                    <li key={i}>
                      <Typography variant="body2">{resp}</Typography>
                    </li>
                  ))}
                </ul>
              </Box>

              {work.achievements && work.achievements.length > 0 && (
                <Box sx={{ mt: 1 }}>
                  <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1 }}>
                    {t.achievements}:
                  </Typography>
                  <ul style={{ margin: 0, paddingLeft: '20px' }}>
                    {work.achievements.map((achievement, i) => (
                      <li key={i}>
                        <Typography variant="body2">{achievement}</Typography>
                      </li>
                    ))}
                  </ul>
                </Box>
              )}
            </Box>
          ))}
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* Projects */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', mb: 2 }}>
            {t.projects}
          </Typography>
          {data.projects.map((project, index) => (
            <Box key={index} sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2, flexWrap: 'wrap' }}>
                <Box sx={{ flex: '1 1 60%', minWidth: '200px' }}>
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    {project.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {t.role}: {project.role}
                  </Typography>
                </Box>
                <Box sx={{ flex: '0 0 auto', textAlign: 'right' }}>
                  <Typography variant="body2" color="text.secondary">
                    {project.period}
                  </Typography>
                </Box>
              </Box>

              <Typography variant="body2" sx={{ mt: 1 }}>
                {project.description}
              </Typography>

              <Box sx={{ mt: 1 }}>
                <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 0.5 }}>
                  {t.technologies}:
                </Typography>
                <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                  {project.technologies.map((tech, i) => (
                    <Chip key={i} label={tech} size="small" />
                  ))}
                </Stack>
              </Box>

              <Box sx={{ mt: 1 }}>
                <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1 }}>
                  {t.highlights}:
                </Typography>
                <ul style={{ margin: 0, paddingLeft: '20px' }}>
                  {project.highlights.map((highlight, i) => (
                    <li key={i}>
                      <Typography variant="body2">{highlight}</Typography>
                    </li>
                  ))}
                </ul>
              </Box>
            </Box>
          ))}
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* Skills */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', mb: 2 }}>
            {t.skills}
          </Typography>
          {data.skills.map((skillGroup, index) => (
            <Box key={index} sx={{ mb: 2 }}>
              <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 1 }}>
                {skillGroup.category}:
              </Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                {skillGroup.items.map((skill, i) => (
                  <Chip key={i} label={skill} size="small" color="primary" variant="outlined" />
                ))}
              </Stack>
            </Box>
          ))}
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* Certificates */}
        <Box>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', mb: 2 }}>
            {t.certificates}
          </Typography>
          {data.certificates.map((cert, index) => (
            <Box key={index} sx={{ mb: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2, flexWrap: 'wrap' }}>
                <Box sx={{ flex: '1 1 60%', minWidth: '200px' }}>
                  <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                    {cert.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {cert.issuer}
                  </Typography>
                  {cert.id && (
                    <Typography variant="body2" color="text.secondary">
                      ID: {cert.id}
                    </Typography>
                  )}
                </Box>
                <Box sx={{ flex: '0 0 auto', textAlign: 'right' }}>
                  <Typography variant="body2" color="text.secondary">
                    {cert.date}
                  </Typography>
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
      </Paper>
    </Container>
  );
};

export default Resume;
