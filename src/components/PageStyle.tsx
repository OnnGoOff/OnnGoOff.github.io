import { Box, Center, Container, theme } from '@chakra-ui/react';
import React from 'react';

interface PageStyleProps {
  children: React.ReactNode;
  id: string;
}

const PageStyle = ({ children, id }: PageStyleProps) => {
  return (
    <>
      <Box padding="4" height="100vh" id={id}>
        <Center h={theme.sizes.full}>
          <Container centerContent maxW={theme.sizes.full}>
            {children}
          </Container>
        </Center>
      </Box>
    </>
  );
};

export default PageStyle;
