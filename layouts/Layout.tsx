import { Container, Flex, VStack } from "@chakra-ui/react";
import { Header } from "../src/components/Header";

const Layout = ({ children }) => {
  return (
    <VStack w="full" h="full" spacing="24px">
      <Header />
      <Container maxW="2xl">{children}</Container>
    </VStack>
  );
};

export default Layout;
