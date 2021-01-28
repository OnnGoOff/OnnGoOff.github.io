import { Box, Center, Container, Heading, Text, theme } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';

function App() {
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);
  const updateDimensions = () => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  };
  useEffect(() => {
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  return (
    <>
      <Box padding="4" height={height} bg="brand.persian-green">
        <Center h={theme.sizes.full}>
          <Container centerContent maxW={theme.sizes.full}>
            <Heading as="h1" fontSize={theme.fontSizes['9xl']} color="white">
              Onn Go Off
            </Heading>
            <Text fontSize="6xl" color="brand.charcoal-black" textTransform="capitalize">
              ya yeet skrrt skrrt
            </Text>
          </Container>
        </Center>
      </Box>
    </>
  );
}

export default App;
