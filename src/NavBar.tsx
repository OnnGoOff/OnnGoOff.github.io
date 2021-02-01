import { Center, Grid, Heading, HStack, Link as ChakraLink, theme } from '@chakra-ui/react';
import React, { useContext } from 'react';
import { HomePageContext, navItems } from './HomePage';

const NavBar = () => {
  const context = useContext(HomePageContext);
  const { setPage } = context;

  return (
    <>
      <Grid
        pos="fixed"
        width="100vw"
        height={[theme.sizes[16], theme.sizes[20]]}
        zIndex={theme.zIndices.docked}
        templateColumns={['1fr', '20rem 1fr']}
        alignContent="end"
        d={['none', 'grid']}
        bgGradient="linear(to-b, rgba(0,0,0,0.5), transparent)"
        paddingBottom={8}
      >
        <Center>
          <Heading
            textShadow="0 4px 6px rgba(0, 0, 0, 0.1),0 2px 4px rgba(0, 0, 0, 0.06)"
            color="white"
            as="h2"
            fontSize={'2xl'}
          >
            Onn Go Off
          </Heading>
        </Center>
        <HStack w="100%" alignItems="end">
          {navItems.map((obj, ix) => {
            return (
              <ChakraLink key={obj.hash} margin="0 1rem 0 1rem" onClick={() => setPage(ix)}>
                <Heading
                  color="white"
                  textShadow="0 4px 6px rgba(0, 0, 0, 0.1),0 2px 4px rgba(0, 0, 0, 0.06)"
                  size="md"
                >
                  {obj.name}
                </Heading>
              </ChakraLink>
            );
          })}
        </HStack>
      </Grid>
    </>
  );
};

export default NavBar;
