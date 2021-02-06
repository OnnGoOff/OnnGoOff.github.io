import { Box, theme, Center, Flex, Text, Link as ChakraLink } from '@chakra-ui/react';
import React, { useState } from 'react';
import { Switch, Route, Link, useRouteMatch } from 'react-router-dom';
import { ChevronLeftIcon } from '@chakra-ui/icons';
import Search from './Search';
import About from './About';
import Home from './Home';
import APSpace from './APSpace';

interface WoonPageContextProps {
  setBackgroundColor: (color: string) => void;
}

export const WoonPageContext = React.createContext<WoonPageContextProps>({
  setBackgroundColor: (color: string) => {
    console.error('setBackgroundColor is not getting initialized!');
  },
});

const Woon = () => {
  const [bgColor, setBgColor] = useState('brand.400');
  const woonMatch = useRouteMatch();

  const setBackgroundColor = (color: string) => {
    setBgColor(color);
  };

  const navLinks = [
    { link: woonMatch.url, displayName: 'Home' },
    { link: `${woonMatch.url}/search`, displayName: 'Student Search' },
    { link: `${woonMatch.url}/apcard`, displayName: 'APCard Info' },
    { link: `${woonMatch.url}/about`, displayName: 'About Me' },
  ];

  return (
    <>
      <WoonPageContext.Provider value={{ setBackgroundColor: setBackgroundColor }}>
        <Box minH="100vh" transition="background-color 0.25s ease-in-out" bgColor={bgColor}>
          <Box
            bgColor="white"
            w={theme.sizes.full}
            h={[theme.sizes[12], theme.sizes[20]]}
            color="brand.charcoal-black"
            marginBottom={theme.space[8]}
            pos="sticky"
            top={0}
            zIndex={theme.zIndices.docked}
            boxShadow={theme.shadows.lg}
          >
            <Center h={theme.sizes.full}>
              <Flex w={theme.sizes.container} justifyContent="space-between">
                <ChakraLink as="div" mx={2} fontWeight={theme.fontWeights.semibold} fontSize={theme.fontSizes.lg}>
                  <Link to="/">
                    <Flex>
                      <ChevronLeftIcon w={[6, 8]} h={[6, 8]} />
                      <Text d={['none', 'initial']}>Back to Home Page</Text>
                    </Flex>
                  </Link>
                </ChakraLink>
                <Flex>
                  {navLinks.map((navLink) => {
                    return (
                      <ChakraLink
                        key={navLink.displayName}
                        textAlign="center"
                        as="div"
                        fontSize={[theme.fontSizes.sm, theme.fontSizes.lg]}
                        mx={2}
                        fontWeight={theme.fontWeights.semibold}
                      >
                        <Link to={navLink.link}>{navLink.displayName}</Link>
                      </ChakraLink>
                    );
                  })}
                </Flex>
              </Flex>
            </Center>
          </Box>

          <Switch>
            <Route exact path={woonMatch.path}>
              <Home />
            </Route>
            <Route path={`${woonMatch.path}/search`}>
              <Search />
            </Route>
            <Route path={`${woonMatch.path}/apcard`}>
              <APSpace />
            </Route>
            <Route path={`${woonMatch.path}/about`}>
              <About />
            </Route>
          </Switch>
        </Box>
      </WoonPageContext.Provider>
    </>
  );
};

export default Woon;
