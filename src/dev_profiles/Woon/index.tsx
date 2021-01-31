import { Box, theme, Center, HStack, Link as ChakraLink, Heading } from '@chakra-ui/react';
import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link, useRouteMatch, useParams } from 'react-router-dom';
import HomePage from './HomePage';
import About from './About';

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

  console.log(`${woonMatch.path}/about`);
  console.log(`${woonMatch.url}/about`);

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
          <Center w={theme.sizes.full} h={theme.sizes.full}>
            <HStack>
              <ChakraLink mx={2} color="white" fontWeight={theme.fontWeights.semibold} fontSize={theme.fontSizes.lg}>
                <Link to="/">Back to Home Page</Link>
              </ChakraLink>
              <ChakraLink mx={2} color="white" fontWeight={theme.fontWeights.semibold} fontSize={theme.fontSizes.lg}>
                <Link to={woonMatch.url}>Student Search</Link>
              </ChakraLink>
              <ChakraLink mx={2} color="white" fontWeight={theme.fontWeights.semibold} fontSize={theme.fontSizes.lg}>
                <Link to={`${woonMatch.url}/about`}>About Me</Link>
              </ChakraLink>
            </HStack>
          </Center>
        </Box>

        <Switch>
          <Route exact path={woonMatch.path}>
            <HomePage />
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
