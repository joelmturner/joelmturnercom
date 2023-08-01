import { Grid } from '@chakra-ui/react';
import { Project, ProjectCard } from './ProjectCard';

const PROJECTS: Project[] = [
  {
    name: 'Emotional Recipes',
    description: 'A tool to help navigate stormy waters back to calm seas.',
    imageURL:
      'https://res.cloudinary.com/joelmturner/image/upload/v1690867310/emotional-recipes/recipe_9.webp',
    tech: ['React', 'TypeScript', 'Chakra UI', 'Next.js'],
    github: 'https://github.com/joelmturner/emotional-recipes',
    featured: false,
    url: 'https://emotional-recipes.com',
  },
  {
    name: 'PDX Food Weeks',
    description: 'Annual celebration of great food in Portland, Oregon.',
    imageURL:
      'https://res.cloudinary.com/joelmturner/image/upload/v1690867095/pdx-food-weeks-vercel-app-nacho-2023_xxfsgl.png',
    tech: ['React', 'TypeScript', 'Panda CSS', 'Next.js'],
    github: 'https://github.com/joelmturner/pdx-food-weeks',
    featured: false,
    url: 'https://pdx-food-weeks.vercel.app/',
  },
  {
    name: 'Instagram To Cloudinary',
    description: 'Pulls posts from Instagram and sends them to Cloudinary',
    imageURL:
      'https://res.cloudinary.com/joelmturner/image/upload/v1690868332/Illustrations-Joel-M-Turner_ogu9k6.png',
    tech: ['TypeScript'],
    github: 'https://github.com/joelmturner/instagram-cloudinary',
    featured: false,
    url: '/blog/instagram-cloudinary',
  },
];

export function ProjectGrid() {
  return (
    <Grid w="full" templateColumns={['1fr', 'repeat(2, minmax(100px, 1fr))']} gap="3">
      {PROJECTS.map((project) => (
        <ProjectCard key={project.name} project={project} />
      ))}
    </Grid>
  );
}
