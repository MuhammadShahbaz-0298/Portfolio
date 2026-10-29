import { profile } from './profile';

export const socialLinks = [
  { id: 'linkedin', label: 'LinkedIn', href: profile.linkedin, icon: 'linkedin' },
  { id: 'github', label: 'GitHub', href: profile.github, icon: 'github' },
  { id: 'email', label: 'Email', href: `mailto:${profile.email}`, icon: 'mail' },
  { id: 'cv', label: 'Download CV', href: profile.cvFile, icon: 'download' },
];

export const contactLinks = socialLinks.filter(
  (link) => link.id === 'linkedin' || link.id === 'github'
);
