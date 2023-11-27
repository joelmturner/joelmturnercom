import { FeaturedPost } from '../components/FeaturedPost';
import { Heading } from 'src/components/Heading';
import { LikesAnimation } from 'src/components/LikesAnimation';
import { Text } from 'src/components/Text';
import { Container, Flex, Stack } from 'styled-system/jsx';
import { ProjectGrid } from '../components/projects/ProjectGrid';
import { getAllPostsSorted } from '../lib/posts';
import { CustomLink } from 'src/components/mdxComps/CustomLink';

async function getLatestPost() {
  const posts = getAllPostsSorted();
  return posts[0];
}

export default async function Home() {
  const post = await getLatestPost();

  return (
    <>
      <Container maxW={'5xl'}>
        <Stack py={{ base: 12, md: 20 }} gap={{ base: 8, md: 10 }}>
          <Heading
            fontWeight={600}
            textStyle={{ base: '3xl', sm: '4xl', md: '6xl' }}
            lineHeight={'50%'}
            w="full"
            textAlign={'center'}
            as="h1"
          >
            {`👋🏻 Howdy! I'm Joel.`}
          </Heading>
          <Heading
            fontWeight={600}
            textStyle={{ base: 'lg', sm: 'md', md: '3xl' }}
            lineHeight={'50%'}
            w="full"
            textAlign={'center'}
          >
            <Flex
              position="relative"
              height="40px"
              overflow="hidden"
              gap={{ base: 2, sm: 1, md: 2 }}
              alignItems="center"
            >
              <Flex justifyContent="flex-end" w="100%">
                <Text as="span">I like to </Text>
              </Flex>
              <Flex
                alignItems="flex-start"
                position="relative"
                w="100%"
                textAlign={'center'}
                align={'center'}
                flexDirection="column"
              >
                <LikesAnimation />
              </Flex>
            </Flex>
          </Heading>
          <Text as="p" color="fg.default" maxW={'3xl'}>
            {`Hi there! I'm a frontend engineer with a background in graphic design and web development. By day, I'm a Senior Product Engineer at `}
            <CustomLink href="https://sprinklr.com">Sprinklr</CustomLink>
            {`, but in my free time I love to let my artistic side shine by practicing hand lettering and sketching. When I'm not busy creating, you can find me exploring the great outdoors in Portland with my awesome family (including our furry canine companions)!`}
          </Text>
          {post ? (
            <>
              <Heading as="h3" colorScheme="orange" textStyle="xl">
                Latest Post
              </Heading>
              <FeaturedPost post={post} />
            </>
          ) : null}
          <Heading as="h3" colorScheme="orange" textStyle="xl">
            Latest Explorations
          </Heading>
          <ProjectGrid />
        </Stack>
      </Container>
    </>
  );
}
