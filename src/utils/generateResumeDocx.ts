import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  AlignmentType,
  BorderStyle,
  Table,
  TableRow,
  TableCell,
  WidthType,
  ImageRun,
} from 'docx';
import type { ResumeData } from '../data/resumeData';

interface Labels {
  basicInfo: string;
  contact: string;
  skills: string;
  languages: string;
  certificates: string;
  jobIntention: string;
  personalSummary: string;
  education: string;
  workExperience: string;
  projects: string;
  awards: string;
  gender: string;
  birthDate: string;
  political: string;
  researchDirection: string;
  gpa: string;
  honors: string;
  responsibilities: string;
  achievements: string;
  role: string;
  technologies: string;
  highlights: string;
  level: string;
  inProgress: string;
  expected: string;
}

const labelsZh: Labels = {
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
};

const labelsEn: Labels = {
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
};

const PRIMARY_COLOR = '2C3E50';

export async function generateResumeDocx(
  data: ResumeData,
  language: 'zh' | 'en'
): Promise<Blob> {
  const t = language === 'zh' ? labelsZh : labelsEn;

  // Load photo if available
  let photoBuffer: ArrayBuffer | undefined;
  if (data.personalInfo.photo) {
    try {
      const response = await fetch(data.personalInfo.photo);
      photoBuffer = await response.arrayBuffer();
    } catch (error) {
      console.error('Failed to load photo:', error);
    }
  }

  const children: (Paragraph | Table)[] = [];

  // Header with name and photo
  if (photoBuffer) {
    children.push(
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [
          new ImageRun({
            data: photoBuffer,
            transformation: {
              width: 120,
              height: 120,
            },
            type: 'png',
          }),
        ],
        spacing: { after: 200 },
      })
    );
  }

  // Name
  children.push(
    new Paragraph({
      text: data.contact.name,
      heading: HeadingLevel.TITLE,
      alignment: AlignmentType.CENTER,
      spacing: { after: 100 },
    })
  );

  // Job Intention
  children.push(
    new Paragraph({
      text: data.jobIntention,
      heading: HeadingLevel.HEADING_2,
      alignment: AlignmentType.CENTER,
      spacing: { after: 300 },
    })
  );

  // Divider
  children.push(
    new Paragraph({
      border: {
        bottom: {
          color: PRIMARY_COLOR,
          space: 1,
          style: BorderStyle.SINGLE,
          size: 6,
        },
      },
      spacing: { after: 200 },
    })
  );

  // Basic Info and Contact - Two columns
  const basicInfoRows: TableRow[] = [
    new TableRow({
      children: [
        new TableCell({
          children: [
            new Paragraph({
              children: [
                new TextRun({ text: `${t.gender}: `, bold: true }),
                new TextRun({ text: data.personalInfo.gender }),
              ],
            }),
          ],
          width: { size: 50, type: WidthType.PERCENTAGE },
        }),
        new TableCell({
          children: [
            new Paragraph({
              children: [
                new TextRun({ text: `${t.birthDate}: `, bold: true }),
                new TextRun({ text: data.personalInfo.birthDate }),
              ],
            }),
          ],
          width: { size: 50, type: WidthType.PERCENTAGE },
        }),
      ],
    }),
    new TableRow({
      children: [
        new TableCell({
          children: [
            new Paragraph({
              children: [
                new TextRun({ text: `${t.political}: `, bold: true }),
                new TextRun({ text: data.personalInfo.politicalStatus }),
              ],
            }),
          ],
        }),
        new TableCell({
          children: [
            new Paragraph({
              children: [
                new TextRun({ text: 'Email: ', bold: true }),
                new TextRun({ text: data.contact.email }),
              ],
            }),
          ],
        }),
      ],
    }),
    new TableRow({
      children: [
        new TableCell({
          children: [
            new Paragraph({
              children: [
                new TextRun({ text: `${t.contact}: `, bold: true }),
                new TextRun({ text: data.contact.phone }),
              ],
            }),
          ],
        }),
        new TableCell({
          children: [
            new Paragraph({
              children: [
                new TextRun({ text: 'Address: ', bold: true }),
                new TextRun({ text: data.contact.address }),
              ],
            }),
          ],
        }),
      ],
    }),
  ];

  if (data.contact.wechat) {
    basicInfoRows.push(
      new TableRow({
        children: [
          new TableCell({
            children: [
              new Paragraph({
                children: [
                  new TextRun({ text: '微信/WeChat: ', bold: true }),
                  new TextRun({ text: data.contact.wechat }),
                ],
              }),
            ],
            columnSpan: 2,
          }),
        ],
      })
    );
  }

  if (data.contact.github) {
    basicInfoRows.push(
      new TableRow({
        children: [
          new TableCell({
            children: [
              new Paragraph({
                children: [
                  new TextRun({ text: 'GitHub: ', bold: true }),
                  new TextRun({ text: data.contact.github }),
                ],
              }),
            ],
            columnSpan: 2,
          }),
        ],
      })
    );
  }

  if (data.contact.linkedin) {
    basicInfoRows.push(
      new TableRow({
        children: [
          new TableCell({
            children: [
              new Paragraph({
                children: [
                  new TextRun({ text: 'LinkedIn: ', bold: true }),
                  new TextRun({ text: data.contact.linkedin }),
                ],
              }),
            ],
            columnSpan: 2,
          }),
        ],
      })
    );
  }

  if (data.contact.website) {
    basicInfoRows.push(
      new TableRow({
        children: [
          new TableCell({
            children: [
              new Paragraph({
                children: [
                  new TextRun({ text: '博客/Blog: ', bold: true }),
                  new TextRun({ text: data.contact.website }),
                ],
              }),
            ],
            columnSpan: 2,
          }),
        ],
      })
    );
  }

  if (data.contact.resumeUrl) {
    basicInfoRows.push(
      new TableRow({
        children: [
          new TableCell({
            children: [
              new Paragraph({
                children: [
                  new TextRun({ text: '在线简历/Resume: ', bold: true }),
                  new TextRun({ text: data.contact.resumeUrl }),
                ],
              }),
            ],
            columnSpan: 2,
          }),
        ],
      })
    );
  }

  children.push(
    new Table({
      rows: basicInfoRows,
      width: { size: 100, type: WidthType.PERCENTAGE },
      borders: {
        top: { style: BorderStyle.NONE },
        bottom: { style: BorderStyle.NONE },
        left: { style: BorderStyle.NONE },
        right: { style: BorderStyle.NONE },
        insideHorizontal: { style: BorderStyle.NONE },
        insideVertical: { style: BorderStyle.NONE },
      },
    })
  );

  children.push(new Paragraph({ spacing: { after: 200 } }));

  // Personal Summary
  children.push(
    new Paragraph({
      text: t.personalSummary,
      heading: HeadingLevel.HEADING_1,
      spacing: { before: 200, after: 100 },
    })
  );

  children.push(
    new Paragraph({
      text: data.personalSummary,
      spacing: { after: 300 },
      alignment: AlignmentType.JUSTIFIED,
    })
  );

  // Work Experience
  children.push(
    new Paragraph({
      text: t.workExperience,
      heading: HeadingLevel.HEADING_1,
      spacing: { before: 200, after: 100 },
    })
  );

  data.workExperience.forEach((work) => {
    children.push(
      new Paragraph({
        children: [
          new TextRun({
            text: work.position,
            bold: true,
            size: 24,
            color: PRIMARY_COLOR,
          }),
        ],
        spacing: { after: 50 },
      })
    );

    children.push(
      new Paragraph({
        children: [
          new TextRun({ text: `${work.company} | ${work.location}`, italics: true }),
          new TextRun({ text: ` | ${work.period}`, italics: true }),
        ],
        spacing: { after: 100 },
      })
    );

    children.push(
      new Paragraph({
        children: [new TextRun({ text: t.responsibilities, bold: true })],
        spacing: { after: 50 },
      })
    );

    work.responsibilities.forEach((resp) => {
      children.push(
        new Paragraph({
          text: resp,
          bullet: { level: 0 },
          spacing: { after: 50 },
        })
      );
    });

    if (work.achievements && work.achievements.length > 0) {
      children.push(
        new Paragraph({
          children: [new TextRun({ text: t.achievements, bold: true })],
          spacing: { before: 100, after: 50 },
        })
      );

      work.achievements.forEach((achievement) => {
        children.push(
          new Paragraph({
            text: achievement,
            bullet: { level: 0 },
            spacing: { after: 50 },
          })
        );
      });
    }

    children.push(new Paragraph({ spacing: { after: 200 } }));
  });

  // Projects
  children.push(
    new Paragraph({
      text: t.projects,
      heading: HeadingLevel.HEADING_1,
      spacing: { before: 200, after: 100 },
    })
  );

  data.projects.forEach((project) => {
    children.push(
      new Paragraph({
        children: [
          new TextRun({
            text: project.name,
            bold: true,
            size: 24,
            color: PRIMARY_COLOR,
          }),
        ],
        spacing: { after: 50 },
      })
    );

    children.push(
      new Paragraph({
        children: [
          new TextRun({ text: `${t.role}: ${project.role}`, italics: true }),
          new TextRun({ text: ` | ${project.period}`, italics: true }),
        ],
        spacing: { after: 100 },
      })
    );

    children.push(
      new Paragraph({
        text: project.description,
        spacing: { after: 100 },
        alignment: AlignmentType.JUSTIFIED,
      })
    );

    children.push(
      new Paragraph({
        children: [
          new TextRun({ text: `${t.technologies}: `, bold: true }),
          new TextRun({ text: project.technologies.join(', ') }),
        ],
        spacing: { after: 100 },
      })
    );

    if (project.highlights && project.highlights.length > 0) {
      children.push(
        new Paragraph({
          children: [new TextRun({ text: t.highlights, bold: true })],
          spacing: { after: 50 },
        })
      );

      project.highlights.forEach((highlight) => {
        children.push(
          new Paragraph({
            text: highlight,
            bullet: { level: 0 },
            spacing: { after: 50 },
          })
        );
      });
    }

    children.push(new Paragraph({ spacing: { after: 200 } }));
  });

  // Education
  children.push(
    new Paragraph({
      text: t.education,
      heading: HeadingLevel.HEADING_1,
      spacing: { before: 200, after: 100 },
    })
  );

  data.education.forEach((edu) => {
    const degreeText = edu.isInProgress ? `${edu.degree} (${t.inProgress})` : edu.degree;

    children.push(
      new Paragraph({
        children: [
          new TextRun({
            text: degreeText,
            bold: true,
            size: 24,
            color: PRIMARY_COLOR,
          }),
        ],
        spacing: { after: 50 },
      })
    );

    let periodText = edu.period;
    if (edu.isInProgress && edu.expectedGraduation) {
      periodText += ` (${t.expected} ${edu.expectedGraduation})`;
    }

    children.push(
      new Paragraph({
        children: [
          new TextRun({ text: `${edu.school} · ${edu.major}`, italics: true }),
          new TextRun({ text: ` | ${edu.location} | ${periodText}`, italics: true }),
        ],
        spacing: { after: 50 },
      })
    );

    if (edu.researchDirection) {
      children.push(
        new Paragraph({
          children: [
            new TextRun({ text: `${t.researchDirection}: `, bold: true }),
            new TextRun({ text: edu.researchDirection }),
          ],
          spacing: { after: 50 },
        })
      );
    }

    if (edu.gpa) {
      children.push(
        new Paragraph({
          children: [
            new TextRun({ text: `${t.gpa}: `, bold: true }),
            new TextRun({ text: edu.gpa }),
          ],
          spacing: { after: 50 },
        })
      );
    }

    if (edu.honors && edu.honors.length > 0) {
      children.push(
        new Paragraph({
          children: [
            new TextRun({ text: `${t.honors}: `, bold: true }),
            new TextRun({ text: edu.honors.join(', ') }),
          ],
          spacing: { after: 50 },
        })
      );
    }

    children.push(new Paragraph({ spacing: { after: 200 } }));
  });

  // Skills
  children.push(
    new Paragraph({
      text: t.skills,
      heading: HeadingLevel.HEADING_1,
      spacing: { before: 200, after: 100 },
    })
  );

  data.skills.forEach((skillGroup) => {
    children.push(
      new Paragraph({
        children: [
          new TextRun({ text: `${skillGroup.category}: `, bold: true }),
          new TextRun({ text: skillGroup.items.join(', ') }),
        ],
        spacing: { after: 100 },
      })
    );
  });

  children.push(new Paragraph({ spacing: { after: 200 } }));

  // Languages
  children.push(
    new Paragraph({
      text: t.languages,
      heading: HeadingLevel.HEADING_1,
      spacing: { before: 200, after: 100 },
    })
  );

  data.languages.forEach((lang) => {
    children.push(
      new Paragraph({
        children: [
          new TextRun({ text: `${lang.name}: `, bold: true }),
          new TextRun({ text: lang.level }),
        ],
        spacing: { after: 50 },
      })
    );
  });

  // Certificates
  if (data.certificates.length > 0) {
    children.push(
      new Paragraph({
        text: t.certificates,
        heading: HeadingLevel.HEADING_1,
        spacing: { before: 200, after: 100 },
      })
    );

    data.certificates.forEach((cert) => {
      children.push(
        new Paragraph({
          children: [
            new TextRun({ text: cert.name, bold: true }),
            new TextRun({ text: ` - ${cert.issuer} (${cert.date})` }),
          ],
          spacing: { after: 50 },
        })
      );
    });
  }

  // Awards
  if (data.awards.length > 0) {
    children.push(
      new Paragraph({
        text: t.awards,
        heading: HeadingLevel.HEADING_1,
        spacing: { before: 200, after: 100 },
      })
    );

    data.awards.forEach((award) => {
      const levelText = award.level ? ` (${award.level})` : '';
      children.push(
        new Paragraph({
          children: [
            new TextRun({ text: `${award.name}${levelText}`, bold: true }),
            new TextRun({ text: ` - ${award.issuer} (${award.date})` }),
          ],
          spacing: { after: 50 },
        })
      );
    });
  }

  const doc = new Document({
    sections: [
      {
        properties: {},
        children,
      },
    ],
  });

  return await Packer.toBlob(doc);
}
