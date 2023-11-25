import { Github, Instagram, Linkedin, Twitter } from 'lucide-react';
import { FaDev, FaMastodon } from 'react-icons/fa';

export const SOCIAL_LINKS: { href: string; label: string; icon: JSX.Element }[] = [
  {
    href: 'https://www.instagram.com/joelmturner/',
    label: 'Instagram',
    icon: <Instagram />,
  },
  {
    href: 'https://twitter.com/joelmturner',
    label: 'Twitter',
    icon: <Twitter />,
  },
  {
    href: 'https://linkedin.com/in/joelmturner',
    label: 'LinkedIn',
    icon: <Linkedin />,
  },
  {
    href: 'https://github.com/joelmturner',
    label: 'GitHub',
    icon: <Github />,
  },
  {
    href: 'https://dev.to/joelmturner',
    label: 'DEV',
    icon: <FaDev />,
  },
  {
    href: 'https://mas.to/@joelmturner',
    label: 'Mastodon',
    icon: <FaMastodon />,
  },
];
