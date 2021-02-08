import React from 'react';
import { Box, Flex, extendTheme, ChakraProvider, Img, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Link, theme } from "@chakra-ui/react";
import { Switch, Route, Link as RouterLinks, useRouteMatch } from 'react-router-dom';
import SpotifyApp from './SpotifyVisualiser/SpotifyApp';
import Homepage from './Homepage';
import myTheme from './myTheme';
import logo from './Images/glennLogo.png';
import SimpleCounter from './SimpleCounter';

const glennTheme = extendTheme(myTheme);


const Glenn = () => {

  const glennMatch = useRouteMatch();

  const navLinks = [
    { link: glennMatch.url, displayName: 'Home' },
    { link: `${glennMatch.url}/simple-counter`, displayName: 'Simple Counter' },
    { link: `${glennMatch.url}/spotify-visualiser`, displayName: 'Spotify Visualiser' },
  ];

  return (
    <>
      <ChakraProvider theme={glennTheme}>
        <Flex bg="body" bgGradient="linear(to-b,#bbb3a6, rgba(211, 202, 186, 0) 50%)" minHeight="5em" align="center">
          <Box>
            <RouterLinks to={`${glennMatch.url}`}>
              <Img src={logo} alt="glenn's logo" />
            </RouterLinks>
          </Box>
          <Flex w="100%" fontSize={theme.fontSizes['2xl']} fontWeight={theme.fontWeights.bold} justify="center">
            <Breadcrumb separator="|">
              {navLinks.map(link => {
                return (
                  <BreadcrumbItem>
                    <RouterLinks to={link.link}>
                      <BreadcrumbLink>{link.displayName}</BreadcrumbLink>
                    </RouterLinks>
                  </BreadcrumbItem>

                )
              })}
            </Breadcrumb>
          </Flex>
          <Box minWidth={[0, 80, 120, 150]} textAlign="right" paddingRight="10px" fontSize={theme.fontSizes['2xl']} fontWeight={theme.fontWeights.bold}>
            <RouterLinks to="/">
              <Link>Quit</Link>
            </RouterLinks>
          </Box>
        </Flex>
        <Switch>
          <Route exact path={glennMatch.path}>
            <Homepage />
          </Route>
          <Route path={`${glennMatch.path}/spotify-visualiser`}>
            <SpotifyApp />
          </Route>
          <Route path={`${glennMatch.path}/simple-counter`}>
            <SimpleCounter />
          </Route>
        </Switch>
      </ChakraProvider>
    </>
  );
};

export default Glenn;
