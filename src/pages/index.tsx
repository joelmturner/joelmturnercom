import {
  Container,
  Flex,
  Heading,
  Stack,
  Text,
  useColorModeValue,
  useInterval,
} from '@chakra-ui/react';
import { AnimatePresence, motion } from 'framer-motion';
import type { InferGetStaticPropsType } from 'next';
import { useState } from 'react';
import { FeaturedPost } from '../components/FeaturedPost';
import { MDXComponents } from '../components/MDXComponents';
import { ACTIVITIES } from '../lib/constants';
import { getLatestPost } from '../lib/posts';

const VARIANTS = {
  enter: (direction: number) => {
    return {
      y: direction < 0 ? 40 : -40,
      opacity: 0,
    };
  },
  center: {
    zIndex: 1,
    y: 0,
    opacity: 1,
  },
  exit: (direction: number) => {
    return {
      zIndex: 0,
      y: direction > 0 ? 40 : -40,
      opacity: 0,
    };
  },
};

const TRANSITION = {
  ease: 'linear',
  opacity: { duration: 0.2 },
};

export default function Home({ post }: InferGetStaticPropsType<typeof getStaticProps>) {
  const [activity, setActivity] = useState(ACTIVITIES[0]);

  useInterval(() => {
    setActivity((prev) => {
      const index = ACTIVITIES.findIndex((activityItem) => activityItem === prev);
      if (index + 1 > ACTIVITIES.length - 1) {
        return ACTIVITIES[0];
      } else {
        return ACTIVITIES[index + 1];
      }
    });
  }, 2000);

  return (
    <Container maxW={'5xl'}>
      <Stack spacing={{ base: 8, md: 10 }} py={{ base: 12, md: 20 }}>
        <Heading
          fontWeight={600}
          fontSize={{ base: '3xl', sm: '4xl', md: '6xl' }}
          lineHeight={'50%'}
          w="full"
          textAlign={'center'}
          as="h1"
        >
          {`👋🏻 Howdy! I'm Joel.`}
        </Heading>
        <Heading
          fontWeight={600}
          fontSize={{ base: 'lg', sm: 'md', md: '3xl' }}
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
              <AnimatePresence initial={false}>
                <motion.div
                  key={activity}
                  variants={VARIANTS}
                  initial="enter"
                  animate="center"
                  transition={TRANSITION}
                >
                  <Text textAlign="left" as={'span'} color={'orange.400'} lineHeight="0.8">
                    {activity}
                  </Text>
                </motion.div>
              </AnimatePresence>
            </Flex>
          </Flex>
        </Heading>
        <Text as="p" color={useColorModeValue('gray.700', 'gray.300')} maxW={'3xl'}>
          {`Hi there! I'm a frontend engineer with a background in graphic design and web development. By day, I'm a Senior Product Engineer at `}
          <MDXComponents.a href="https://sprinklr.com">Sprinklr</MDXComponents.a>
          {`, but in my free time I love to let my artistic side shine by practicing hand lettering and sketching. When I'm not busy creating, you can find me exploring the great outdoors in Portland with my awesome family (including our furry canine companions)!`}
        </Text>
        {post ? (
          <>
            <Heading as="h3" colorScheme="orange">
              Latest Post
            </Heading>
            <FeaturedPost post={post} />
          </>
        ) : null}
      </Stack>
    </Container>
  );
}

export async function getStaticProps() {
  const post = await getLatestPost();
  return {
    props: {
      post,
    },
  };
}
