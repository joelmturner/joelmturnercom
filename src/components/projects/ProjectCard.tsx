// import {
//   Flex,
//   Circle,
//   Box,
//   Text,
//   Badge,
//   useColorModeValue,
//   Icon,
//   chakra,
//   Tooltip,
// } from '@chakra-ui/react';
import { BiLinkExternal, BiLogoGithub } from 'react-icons/bi';
import { PostImage } from '../CCImage';
import { TECH_VS_ICON } from './constants';
import Link from 'next/link';
import { Icon } from '../Icon';
import { Github, Link2 } from 'lucide-react';
import { Flex, styled } from 'styled-system/jsx';
import { Badge } from '../Badge';
import { Text } from '../Text';
import { Heading } from '../Heading';
import { ProjectIcon } from './ProjectIcon';

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
  const content = (
    <Icon h={4} w={4} alignSelf={'center'}>
      <Link2 />
    </Icon>
  );

  if (isInternalLink) {
    return (
      <Flex alignItems="center">
        <Link href={url}>{content}</Link>
      </Flex>
    );
  }

  return (
    <styled.a href={url} target="_blank" display={'flex'}>
      {content}
    </styled.a>
  );
}

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Flex w="full" alignItems="center" justifyContent="center">
      <styled.div
        bg="transparent"
        // maxW="md"
        borderWidth="1px"
        rounded="lg"
        shadow="lg"
        position="relative"
      >
        {project.featured && (
          <styled.div
            borderRadius={'100%'}
            // size="10px"
            position="absolute"
            top={2}
            right={2}
            bg="red.200"
          />
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
          <styled.div display="flex" alignItems="baseline">
            {project.featured && (
              <Badge rounded="full" px="2" fontSize="0.8em" colorScheme="red">
                New
              </Badge>
            )}
          </styled.div>
          <Flex mt="1" justifyContent="space-between" alignContent="center">
            <Heading
              textStyle="2xl"
              fontWeight="semibold"
              as="h4"
              lineHeight="tight"
              maxW="3xs"
              //   isTruncated
            >
              {project.name}
            </Heading>
            <Flex gap={'3'}>
              <styled.a href={project.github} target="_blank" display={'flex'}>
                <Icon h={4} w={4} alignSelf={'center'}>
                  <Github />
                </Icon>
              </styled.a>
              {project.url ? <ProjectLink url={project.url} /> : null}
            </Flex>
          </Flex>

          <Text as="p" fontSize="md" marginTop="2">
            {project.description}
          </Text>

          <Flex alignItems="center" gap={'3'} fontSize="xl">
            {project.tech.map((tech) => (
              <ProjectIcon tech={tech} key={tech} />
            ))}
          </Flex>
        </Flex>
      </styled.div>
    </Flex>
  );
}
