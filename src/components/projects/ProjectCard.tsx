import {
  Flex,
  Circle,
  Box,
  Text,
  Badge,
  useColorModeValue,
  Icon,
  chakra,
  Tooltip,
} from '@chakra-ui/react';
import { BiLinkExternal, BiLogoGithub } from 'react-icons/bi';
import { PostImage } from '../CCImage';
import { TECH_VS_ICON } from './constants';
import Link from 'next/link';

export type Project = {
  name: string;
  description: string;
  imageURL: string;
  tech: string[];
  github: string;
  featured: boolean;
  url?: string;
};

function ProjectLink({ url }: { url: string }) {
  const isInternalLink = url && (url.startsWith('/') || url.startsWith('#'));
  const content = <Icon as={BiLinkExternal} h={4} w={4} alignSelf={'center'} />;

  if (isInternalLink) {
    return (
      <Flex alignItems="center">
        <Link href={url}>{content}</Link>
      </Flex>
    );
  }

  return (
    <chakra.a href={url} target="_blank" display={'flex'}>
      {content}
    </chakra.a>
  );
}

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Flex w="full" alignItems="center" justifyContent="center">
      <Box
        bg={useColorModeValue('white', 'gray.800')}
        // maxW="md"
        borderWidth="1px"
        rounded="lg"
        shadow="lg"
        position="relative"
      >
        {project.featured && (
          <Circle size="10px" position="absolute" top={2} right={2} bg="red.200" />
        )}

        <PostImage
          src={project.imageURL}
          alt={`Picture of ${project.name}`}
          width={344 * 2}
          height={160 * 2}
          roundedTop="lg"
          gravity="north"
          crop="thumb"
          objectFit="cover"
          transition="0.3s ease-in-out"
          maxHeight={['140px', '160px']}
        />

        <Flex p="6" direction="column" gap={'3'}>
          <Box display="flex" alignItems="baseline">
            {project.featured && (
              <Badge rounded="full" px="2" fontSize="0.8em" colorScheme="red">
                New
              </Badge>
            )}
          </Box>
          <Flex mt="1" justifyContent="space-between" alignContent="center">
            <Box
              fontSize="2xl"
              fontWeight="semibold"
              as="h4"
              lineHeight="tight"
              maxW="3xs"
              //   isTruncated
            >
              {project.name}
            </Box>
            <Flex gap={'3'}>
              <chakra.a href={project.github} target="_blank" display={'flex'}>
                <Icon as={BiLogoGithub} h={4} w={4} alignSelf={'center'} />
              </chakra.a>
              {project.url ? <ProjectLink url={project.url} /> : null}
            </Flex>
          </Flex>

          <Text as="p" fontSize="md" marginTop="2">
            {project.description}
          </Text>

          <Flex alignItems="center" gap={'3'} fontSize="xl">
            {project.tech.map((tech) => {
              const Icon = TECH_VS_ICON[tech.toLowerCase()]
                ? TECH_VS_ICON[tech.toLowerCase()]
                : null;
              return Icon ? (
                <Tooltip label={tech} key={tech}>
                  <span>
                    <Icon />
                  </span>
                </Tooltip>
              ) : null;
            })}
          </Flex>
        </Flex>
      </Box>
    </Flex>
  );
}
