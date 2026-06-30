export interface Project {
  id: string;
  name: string;
  tagline: string;
  shortDescription: string;
  description: string;
  technologies: string[];
  features: string[];
  challenges: string[];
  githubUrl: string;
  liveUrl: string;
  thumbnail: string;
  gallery: string[];
  videoUrl: string;
  accent: string;
}

export const projects: Project[] = [
  {
    id: 'cloudvm',
    name: 'CloudVM',
    tagline: 'Self-Hosted IaaS Cloud Platform',
    shortDescription:
      'A full-stack self-hosted cloud platform for provisioning and managing virtual machines, with browser-based SSH/VNC access and Stripe billing.',
    description:
      'CloudVM is a self-hosted Infrastructure-as-a-Service platform built around a microservices architecture (NestJS + NATS JetStream) that talks to OpenNebula/KVM to provision, monitor, and control the full lifecycle of virtual machines. It was developed as my final-year capstone internship project at ReaddlyTech, with a Spring Boot service layer handling VM creation, start/stop operations, and resource tracking, and a responsive React/Next.js dashboard for real-time status and admin controls. The platform ships with secure authentication (JWT, MFA, OAuth2), role-based access control for multi-user environments, Stripe-based subscription billing, and browser-based SSH and VNC so users can reach their VMs without leaving the dashboard.',
    technologies: [
      'NestJS',
      'Next.js',
      'Spring Boot',
      'Python',
      'NATS JetStream',
      'Docker',
      'PostgreSQL',
      'Redis',
      'Stripe',
      'Socket.IO',
      'OpenNebula/KVM',
    ],
    features: [
      'VM provisioning, start/stop, and full lifecycle control through a microservices architecture',
      'Browser-based SSH and VNC so users can access their VMs with no local client needed',
      'Secure authentication with JWT, MFA, and OAuth2, plus role-based access control',
      'Stripe-powered subscription billing for usage tiers',
      'Real-time VM status and metrics over Socket.IO',
      'AI assistant integrated into the dashboard for platform support',
    ],
    challenges: [
      'Orchestrating VM lifecycle events across OpenNebula/KVM through an event-driven NATS JetStream layer',
      'Streaming low-latency SSH/VNC sessions straight into the browser',
      'Designing secure multi-tenant access control alongside subscription billing',
    ],
    githubUrl: 'https://github.com/Mohamed-Rayen-Brahmi',
    liveUrl: '',
    thumbnail:
      'https://res.cloudinary.com/dsjglgcnu/image/upload/v1782813359/Capture_d_%C3%A9cran_2026-06-16_112745_h5zn6v.png',
    gallery: [
      'https://res.cloudinary.com/dsjglgcnu/image/upload/v1782813359/Capture_d_%C3%A9cran_2026-06-16_112745_h5zn6v.png',
      'https://res.cloudinary.com/dsjglgcnu/image/upload/v1782813507/WhatsApp_Image_2026-05-17_at_17.31.56_v6zfy2.jpg',
      'https://res.cloudinary.com/dsjglgcnu/image/upload/v1782813557/WhatsApp_Image_2026-05-17_at_15.32.11_ttbnym.jpg',
      'https://res.cloudinary.com/dsjglgcnu/image/upload/v1782813763/WhatsApp_Image_2026-06-30_at_11.02.25_ejevkg.jpg',
    ],
    videoUrl: 'https://res.cloudinary.com/dsjglgcnu/video/upload/v1782813390/full_video_voenjq.mp4',
    accent: 'steel',
  },
  {
    id: 'medtun',
    name: 'MedTUN',
    tagline: 'Medical Appointment Platform',
    shortDescription:
      'A full-stack healthcare platform connecting patients, doctors, and admins, with role-based access, doctor discovery, and a pharmacy locator.',
    description:
      'MedTUN is a full-stack healthcare platform that connects patients, doctors, and administrators in one system. It handles JWT-based authentication with role-based access control across three distinct user types, lets patients discover and book appointments with doctors, and includes a pharmacy locator to help users find nearby pharmacies. The backend is built with Spring Boot and MySQL, with a React frontend styled using Bootstrap.',
    technologies: ['React', 'Spring Boot', 'MySQL', 'Bootstrap', 'JWT'],
    features: [
      'Role-based access for patients, doctors, and admins',
      'Doctor discovery and appointment booking',
      'Pharmacy locator for nearby pharmacies',
      'JWT-secured authentication across all user roles',
    ],
    challenges: [
      'Designing role-based access control that cleanly separates three different user experiences',
      'Structuring relational data to support doctor discovery and pharmacy lookup efficiently',
    ],
    githubUrl: 'https://github.com/Mohamed-Rayen-Brahmi',
    liveUrl: '',
    thumbnail: 'https://res.cloudinary.com/dsjglgcnu/image/upload/v1782813200/image_original_qx0wgx.png',
    gallery: ['https://res.cloudinary.com/dsjglgcnu/image/upload/v1782813200/image_original_qx0wgx.png'],
    videoUrl: '',
    accent: 'ember',
  },
  {
    id: 'devquest',
    name: 'DevQuest',
    tagline: 'Gamified Developer Career Platform (Concept)',
    shortDescription:
      'Professional networking reimagined as an RPG — developers level up their careers through quests, XP, and achievements instead of a static resume.',
    description:
      'DevQuest reimagines professional networking as an RPG-style game, where developers level up their careers instead of just listing them on a resume. Users create characters — Frontend Knight, Backend Wizard, Design Enchanter — that earn XP, unlock achievements, and progress through levels by completing real-world "quests" like shipping projects, learning new skills, or landing roles. With a retro pixel-art aesthetic, live leaderboards, and a community feed showcasing peer milestones, DevQuest blends the networking value of platforms like LinkedIn with the motivation and progression mechanics of a game, turning career growth into something genuinely engaging rather than a static profile page.',
    technologies: ['React', 'Node.js', 'Tailwind CSS', 'Game Design'],
    features: [
      'RPG-style character creation across class archetypes (Frontend Knight, Backend Wizard, Design Enchanter)',
      'XP and leveling system tied to real career milestones — shipping projects, learning skills, landing roles',
      'Live leaderboards and a community feed showcasing peer achievements',
      'Retro pixel-art visual identity throughout the experience',
    ],
    challenges: [
      'Designing quest and XP systems that map meaningfully to genuine career progress',
      'Balancing playful game mechanics with real professional networking value',
    ],
    githubUrl: 'https://github.com/Mohamed-Rayen-Brahmi',
    liveUrl: '',
    thumbnail: 'https://res.cloudinary.com/dsjglgcnu/image/upload/v1782814625/devquest_fdq84w.png',
    gallery: [
      'https://res.cloudinary.com/dsjglgcnu/image/upload/v1782814625/devquest_fdq84w.png',
      'https://res.cloudinary.com/dsjglgcnu/image/upload/v1782814632/realm_aauas5.png',
      'https://res.cloudinary.com/dsjglgcnu/image/upload/v1782814633/profil_rku9rk.png',
      'https://res.cloudinary.com/dsjglgcnu/image/upload/v1782814652/quests_asi2nd.png',
    ],
    videoUrl: '',
    accent: 'steel',
  },
  {
    id: 'code-it-up',
    name: 'Code It Up',
    tagline: 'Hackathon Project — CIS ISET Bizerte',
    shortDescription:
      'A web app built for a hackathon organized with CIS ISET Bizerte, where I serve as volunteer webmaster.',
    description:
      'Code It Up is a web application I built during a hackathon hosted in collaboration with CIS ISET Bizerte, the student club where I volunteer as webmaster. The project was developed under hackathon time constraints, focused on a clean, functional UI and a working end-to-end experience deployed live for judging and demos.',
    technologies: ['React', 'TypeScript', 'Tailwind CSS'],
    features: [
      'Built and deployed within a hackathon timeframe',
      'Clean, responsive landing experience',
      'Live deployment on Vercel for real-time demoing',
    ],
    challenges: [
      'Designing and shipping a polished, working product under tight hackathon time constraints',
    ],
    githubUrl: 'https://github.com/Mohamed-Rayen-Brahmi',
    liveUrl: 'https://code-it-up-6.vercel.app/',
    thumbnail:
      'https://res.cloudinary.com/dsjglgcnu/image/upload/v1782814702/Capture_d_%C3%A9cran_2026-06-25_204102_b41dwq.png',
    gallery: [
      'https://res.cloudinary.com/dsjglgcnu/image/upload/v1782814702/Capture_d_%C3%A9cran_2026-06-25_204102_b41dwq.png',
    ],
    videoUrl: '',
    accent: 'ember',
  },
];
