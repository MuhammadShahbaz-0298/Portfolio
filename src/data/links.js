// Shared social/link button lists, derived from profile.js.
// One definition feeds the hero, footer and contact card — to change a
// link or add a button everywhere, edit the list here (or profile.js).
import { profile } from './profile';

// Hero + footer: every channel (LinkedIn, GitHub, email, CV download).
export const socialLinks = [
  { id: 'linkedin', label: 'LinkedIn', href: profile.linkedin, icon: 'linkedin' },
  { id: 'github', label: 'GitHub', href: profile.github, icon: 'github' },
  { id: 'email', label: 'Email', href: `mailto:${profile.email}`, icon: 'mail' },
  { id: 'cv', label: 'Download CV', href: profile.cvFile, icon: 'download' },
];

// Contact card: only the two fastest reply channels.
export const contactLinks = socialLinks.filter(
  (link) => link.id === 'linkedin' || link.id === 'github'
);
