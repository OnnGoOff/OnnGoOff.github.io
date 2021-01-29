import { Box, Button, Center, Container, Heading, SimpleGrid, Text, theme } from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <>
      <Box padding="4" height="100vh" bg="brand.yellow-crayola">
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
};

const DevProfiles = () => {
  const devList = ['Onn', 'Ryan', 'Khor', 'Glenn', 'Woon'];
  return (
    <>
      <Box padding="4" height="100vh" bg="brand.persian-green">
        <Center h={theme.sizes.full}>
          <Container centerContent maxW={theme.sizes.full}>
            <Heading as="h1" fontSize={theme.fontSizes['6xl']} color="white">
              View Dev Pages
            </Heading>
            <SimpleGrid columns={2} spacing={4} marginTop={6}>
              {devList.map((devName, index) => {
                return (
                  <Link key={devName} to={`/${devName}`}>
                    <Button
                      _hover={{
                        boxShadow: theme.shadows.lg,
                      }}
                      bgColor="white"
                      borderRadius={theme.radii.base}
                      width="250px"
                      boxShadow="base"
                      height="125px"
                    >
                      <Center h={theme.sizes.full}>
                        <Text
                          fontSize={theme.fontSizes['3xl']}
                          fontWeight={theme.fontWeights.semibold}
                          letterSpacing={theme.letterSpacings.widest}
                        >
                          {devName}
                        </Text>
                      </Center>
                    </Button>
                  </Link>
                );
              })}
            </SimpleGrid>
          </Container>
        </Center>
      </Box>
    </>
  );
};

const HomePage = () => {
  return (
    <>
      <DevProfiles />
      <Hero />
    </>
  );
};

export default HomePage;
