import { Box, Center, Container, Heading, Text, theme } from '@chakra-ui/react';
import React from 'react';

const Hero = () => {
  return (
    <>
      <Box padding="4" height="100vh" id="hero">
        <Center h={theme.sizes.full}>
          <Container centerContent maxW={theme.sizes.full}>
            <Heading as="h1" fontSize={theme.fontSizes['9xl']} color="white">
              Onn Go Off
            </Heading>
            <Text fontSize={['4xl', '6xl']} color="brand.50" textTransform="capitalize">
              ya yeet skrrt skrrt
            </Text>
          </Container>
        </Center>
      </Box>
    </>
  );
};

export default Hero;
