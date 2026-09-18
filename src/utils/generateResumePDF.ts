import { jsPDF } from 'jspdf';

export function downloadResumePDF() {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;
  const contentWidth = pageWidth - margin * 2;
  let y = 22;

  // Colors
  const darkInk = [31, 43, 46];
  const feltBrown = [95, 64, 41];
  const mutedText = [75, 85, 90];
  const lineRule = [185, 201, 209];

  // Helper for horizontal line
  const drawDivider = (currentY: number) => {
    doc.setDrawColor(lineRule[0], lineRule[1], lineRule[2]);
    doc.setLineWidth(0.4);
    doc.line(margin, currentY, margin + contentWidth, currentY);
  };

  // Helper for Section Titles
  const addSectionHeader = (title: string) => {
    y += 4;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(feltBrown[0], feltBrown[1], feltBrown[2]);
    doc.text(title.toUpperCase(), margin, y);
    y += 1.5;
    drawDivider(y);
    y += 5;
  };

  // 1. Header Name
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);
  doc.setTextColor(darkInk[0], darkInk[1], darkInk[2]);
  doc.text('DEEKSHITH S', margin, y);
  y += 7;

  // Subtitle
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(11);
  doc.setTextColor(feltBrown[0], feltBrown[1], feltBrown[2]);
  doc.text('B.Tech, Computer Science & Engineering', margin, y);
  y += 5.5;

  // Contact Info Line
  doc.setFontSize(8.5);
  doc.setTextColor(mutedText[0], mutedText[1], mutedText[2]);
  const contactLine = 'Bengaluru, Karnataka, India  |  Email: d16850926@gmail.com  |  Phone: +91 81059 73843';
  doc.text(contactLine, margin, y);
  y += 4;

  const linksLine = 'LinkedIn: linkedin.com/in/deekshith-s-6b8127379';
  doc.text(linksLine, margin, y);
  y += 6;

  // 2. Summary
  addSectionHeader('Professional Summary');
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(darkInk[0], darkInk[1], darkInk[2]);
  const summaryText =
    'Computer Science & Engineering undergraduate with a strong foundation in full-stack software development, cybersecurity, and data structures & algorithms. Passionate about building resilient offline-first applications, analyzing system security architectures, and solving complex computational challenges.';
  const splitSummary = doc.splitTextToSize(summaryText, contentWidth);
  doc.text(splitSummary, margin, y);
  y += splitSummary.length * 4.2 + 2;

  // 3. Education
  addSectionHeader('Education');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(darkInk[0], darkInk[1], darkInk[2]);
  doc.text('Bachelor of Technology (B.Tech) - Computer Science & Engineering', margin, y);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(mutedText[0], mutedText[1], mutedText[2]);
  doc.text('Bengaluru, Karnataka, India', margin + contentWidth, y, { align: 'right' });
  y += 4.5;
  doc.text('Focus: Data Structures, Algorithms, Software Engineering, Networks & System Security', margin, y);
  y += 6;

  // 4. Technical Areas & Skills
  addSectionHeader('Technical Competencies');

  const competencies = [
    {
      title: 'Developer & Full-Stack:',
      items: 'TypeScript, JavaScript (ESNext), React 19, Node.js, Python, Tailwind CSS, HTML5 Canvas, REST APIs, GraphQL, Vite, PWA',
    },
    {
      title: 'Cybersecurity:',
      items: 'Network Security (TCP/IP), OWASP Top 10, System Hardening, Threat Modeling, Cryptographic Basics, Vulnerability Remediation',
    },
    {
      title: 'DSA & Algorithms:',
      items: 'Dynamic Programming, Graph Theory, Trees, Heaps, Two Pointers, Sliding Window, Asymptotic Complexity Optimization',
    },
    {
      title: 'Tools & DevOps:',
      items: 'Git, GitHub Actions, Linux/Unix Environments, Docker Containers, Service Workers, Performance Profiling',
    },
  ];

  competencies.forEach((comp) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.8);
    doc.setTextColor(darkInk[0], darkInk[1], darkInk[2]);
    doc.text(`• ${comp.title} `, margin, y);

    const titleWidth = doc.getTextWidth(`• ${comp.title} `);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(mutedText[0], mutedText[1], mutedText[2]);
    const wrappedItems = doc.splitTextToSize(comp.items, contentWidth - titleWidth);
    doc.text(wrappedItems, margin + titleWidth, y);
    y += wrappedItems.length * 4 + 1.5;
  });

  y += 2;

  // 5. Featured Projects
  addSectionHeader('Featured Projects & Practical Builds');

  const projects = [
    {
      title: 'Interactive Offline-First Portfolio & Canvas Engine',
      tech: 'TypeScript, React, Vite PWA, HTML5 Canvas, Web Audio API',
      bullets: [
        'Built a complete offline-first Progressive Web Application with client-side Service Worker caching and fast load times.',
        'Engineered an interactive 2D canvas simulation with dynamic pointer-tracking math, wander animations, and state management.',
        'Implemented sound synthesis using Web Audio API without external audio file dependencies.',
      ],
    },
    {
      title: 'Full-Stack Web Architecture & Application Suite',
      tech: 'React, Node.js, Express, TypeScript, REST APIs',
      bullets: [
        'Engineered responsive end-to-end web applications with modular components and clean data contracts.',
        'Designed secure client-server communication channels and handled asynchronous state flows effectively.',
      ],
    },
    {
      title: 'Security Auditing & Defensive Systems Exploration',
      tech: 'Linux, Wireshark, Security Protocols, OWASP Guidelines',
      bullets: [
        'Analyzed common application vulnerabilities and practiced defensive implementation patterns for access control.',
        'Conducted structured system hardening assessments across simulated network environments.',
      ],
    },
  ];

  projects.forEach((proj) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.2);
    doc.setTextColor(darkInk[0], darkInk[1], darkInk[2]);
    doc.text(proj.title, margin, y);

    doc.setFont('helvetica', 'italic');
    doc.setFontSize(8);
    doc.setTextColor(feltBrown[0], feltBrown[1], feltBrown[2]);
    doc.text(proj.tech, margin + contentWidth, y, { align: 'right' });
    y += 4;

    proj.bullets.forEach((bullet) => {
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.5);
      doc.setTextColor(mutedText[0], mutedText[1], mutedText[2]);
      const bulletLines = doc.splitTextToSize(`- ${bullet}`, contentWidth - 4);
      doc.text(bulletLines, margin + 2, y);
      y += bulletLines.length * 3.8;
    });

    y += 2;
  });

  // Footer note on PDF
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(7.5);
  doc.setTextColor(140, 155, 162);
  doc.text('Deekshith S — Resume generated from portfolio (Offline Ready)', pageWidth / 2, 287, { align: 'center' });

  // Trigger file download
  doc.save('Deekshith_S_Resume.pdf');
}
