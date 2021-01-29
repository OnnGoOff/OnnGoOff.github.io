import { Box, Container, theme } from '@chakra-ui/react';
import React from 'react';

const PageWrapper = (Component: React.FunctionComponent<any>, Color: string) => {
  // const [width, setWidth] = useState(window.innerWidth);
  // const [height, setHeight] = useState(window.innerHeight);
  // const updateDimensions = () => {
  //   setWidth(window.innerWidth);
  //   setHeight(window.innerHeight);
  // };
  // useEffect(() => {
  //   window.addEventListener('resize', updateDimensions);
  //   return () => window.removeEventListener('resize', updateDimensions);
  // }, []);

  return (
    <Box padding="4" height="100vh" bg={Color}>
      <Container centerContent maxW={theme.sizes.full}>
        <Component />
      </Container>
    </Box>
  );
};

export default PageWrapper;
