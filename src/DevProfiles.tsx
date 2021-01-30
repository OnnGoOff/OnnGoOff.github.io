import { Box, Button, Center, Container, Divider, Heading, SimpleGrid, Text, theme } from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';

const DevProfiles = () => {
  const devList = ['Onn', 'Ryan', 'Khor', 'Glenn', 'Woon'];
  return (
    <>
      <Box padding="4" height="100vh" id="dev-profiles">
        <Center h={theme.sizes.full}>
          <Container centerContent maxW={theme.sizes.full}>
            <Heading
              as="h1"
              fontSize={[theme.fontSizes['4xl'], theme.fontSizes['6xl']]}
              color="white"
              marginBottom={4}
              textTransform="uppercase"
            >
              Dev Pages
              <Divider />
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
                      color="brand.charcoal-black"
                      borderRadius={theme.radii.base}
                      width={['150px', '250px']}
                      boxShadow="base"
                      height={['100px', '125px']}
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

export default DevProfiles;
