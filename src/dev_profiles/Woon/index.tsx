import { Box, theme, Center, Flex, Text, Link as ChakraLink, Grid } from '@chakra-ui/react';
import React from 'react';
import { Switch, Route, Link, useRouteMatch } from 'react-router-dom';
import { ChevronLeftIcon } from '@chakra-ui/icons';
import Search from './Search';
import About from './About';
import Home from './Home';
import APSpace from './APSpace';

export interface WoonPageContextProps {
  students: StudentInformation[] | undefined;
  handleSliderChange: (value: number) => void;
  setPage: (page: number) => void;
  page: number;
  perPage: number;
}

export interface StudentInformation {
  name: string;
  tp: string;
  tutorial: number;
}

export const WoonPageContext = React.createContext<WoonPageContextProps>({
  handleSliderChange: (value: number) => {
    console.warn('No slider change handler');
  },
  setPage: (page: number) => {
    console.warn("No 'page' setter.");
  },
  page: 1,
  perPage: 30,
  students: [],
});

const Woon = () => {
  const woonMatch = useRouteMatch();
  return (
    <>
      <Box minH="100vh" bgColor="brand.charcoal-black">
        <Box
          height={[theme.sizes[16], theme.sizes[20]]}
          bgGradient="linear(to-b, rgba(0, 0, 0, 0.5), transparent)"
          w={theme.sizes.full}
          h={theme.sizes[16]}
          marginBottom={theme.space[8]}
          paddingBottom={theme.space[2]}
        >
          <Center h={theme.sizes.full}>
            <Grid autoFlow="column" w={[theme.sizes.full, 'initial']} templateColumns={['1fr 4fr', '3fr 1fr']}>
              <ChakraLink
                as="div"
                mx={2}
                color="white"
                fontWeight={theme.fontWeights.semibold}
                fontSize={theme.fontSizes.lg}
              >
                <Link to="/">
                  <Flex>
                    <ChevronLeftIcon w={8} h={8} />
                    <Text d={['none', 'initial']}>Back to Home Page</Text>
                  </Flex>
                </Link>
              </ChakraLink>
              <Flex>
                <ChakraLink
                  as="div"
                  fontSize={[theme.fontSizes.md, theme.fontSizes.lg]}
                  mx={2}
                  color="white"
                  fontWeight={theme.fontWeights.semibold}
                >
                  <Link to={woonMatch.url}>Home</Link>
                </ChakraLink>
                <ChakraLink
                  as="div"
                  fontSize={[theme.fontSizes.md, theme.fontSizes.lg]}
                  mx={2}
                  color="white"
                  fontWeight={theme.fontWeights.semibold}
                >
                  <Link to={`${woonMatch.url}/search`}>Student Search</Link>
                </ChakraLink>
                <ChakraLink
                  as="div"
                  fontSize={[theme.fontSizes.md, theme.fontSizes.lg]}
                  mx={2}
                  color="white"
                  fontWeight={theme.fontWeights.semibold}
                >
                  <Link to={`${woonMatch.url}/APCard`}>APCard Info</Link>
                </ChakraLink>
                <ChakraLink
                  as="div"
                  fontSize={[theme.fontSizes.md, theme.fontSizes.lg]}
                  mx={2}
                  color="white"
                  fontWeight={theme.fontWeights.semibold}
                >
                  <Link to={`${woonMatch.url}/about`}>About Me</Link>
                </ChakraLink>
              </Flex>
            </Grid>
          </Center>
        </Box>

        <Switch>
          <Route exact path={woonMatch.path}>
            <Home />
          </Route>
          <Route path={`${woonMatch.path}/search`}>
            <Search />
          </Route>
          <Route path={`${woonMatch.path}/APCard`}>
            <APSpace />
          </Route>
          <Route path={`${woonMatch.path}/about`}>
            <About />
          </Route>
        </Switch>
      </Box>
    </>
  );
};

export default Woon;
