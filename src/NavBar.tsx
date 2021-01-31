import { Center, Grid, Heading, HStack, Link as ChakraLink, theme } from '@chakra-ui/react';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
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
          <Heading color="white" as="h2" fontSize={'2xl'}>
            Onn Go Off
          </Heading>
        </Center>
        <HStack w="100%" alignItems="end">
          {navItems.map((obj, ix) => {
            return (
              <ChakraLink key={obj.hash} margin="0 1rem 0 1rem">
                <Link to={{ hash: `#${obj.hash}` }} onClick={() => setPage(ix)}>
                  <Heading color="white" size="md">
                    {obj.name}
                  </Heading>
                </Link>
              </ChakraLink>
            );
          })}
        </HStack>
      </Grid>
    </>
  );
};

export default NavBar;
