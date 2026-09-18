import { FocusCardData } from './types';

export const FOCUS_AREAS: FocusCardData[] = [
  {
    id: 'developer',
    title: 'Developer',
    summary: 'Writes and ships code across the stack, from first plan to working build.',
    details: 'Focusing on robust full-stack engineering, responsive interfaces, clean component hierarchies, and resilient offline-first software architectures.',
    skills: ['TypeScript', 'React', 'Node.js', 'Python', 'Tailwind CSS', 'REST / GraphQL', 'Vite & PWA'],
    projects: ['Full-Stack Web Apps', 'Offline-First PWAs', 'API Services & Micro-backends', 'Interactive Canvas Tools'],
  },
  {
    id: 'cybersecurity',
    title: 'Cybersecurity',
    summary: 'Studying how systems get broken, and what it takes to keep them from breaking.',
    details: 'Exploring defense-in-depth methodologies, threat modeling, network traffic analysis, safe cryptography usage, and vulnerability remediation.',
    skills: ['OWASP Top 10', 'Network Protocols (TCP/IP)', 'Linux Hardening', 'Vulnerability Assessment', 'Authentication & AuthZ'],
    projects: ['Security Auditing & Scanners', 'Auth & Access Control Flows', 'Penetration Testing Labs', 'Incident Response Playbooks'],
  },
  {
    id: 'dsa',
    title: 'DSA / Problem Solving',
    summary: 'Practising data structures and algorithms as the discipline behind clean, efficient code.',
    details: 'Rigorous approach to algorithmic efficiency, computational complexity, memory optimization, and intuitive data representations.',
    skills: ['Dynamic Programming', 'Graph Theory', 'Trees & Heaps', 'Sliding Window', 'Two Pointers', 'Big-O Optimization'],
    projects: ['Algorithmic Visualizations', 'Competitive Programming Challenges', 'Optimized Pathfinders', 'Cache Eviction Engines'],
  },
  {
    id: 'projects',
    title: 'Technology & Projects',
    summary: 'Turning ideas into working projects, one build at a time.',
    details: 'Transforming technical curiosity into tangible software artifacts that solve real everyday problems and perform reliably under varied conditions.',
    skills: ['Git & GitHub Workflows', 'CI/CD Pipelines', 'Performance Profiling', 'Web APIs & Service Workers', 'Docker Containers'],
    projects: ['Interactive Canvas Experiences', 'Personal Productivity Engines', 'Systems Exploration Scripts', 'Open Source Contributions'],
  },
];
