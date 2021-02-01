import { Container, Divider, Heading, theme } from '@chakra-ui/react';
import React from 'react';

const Home = () => {
  return (
    <Container centerContent maxW={theme.sizes['6xl']}>
      <Heading color="white" marginBottom={theme.space[12]}>
        Woon Eusean
        <Divider />
      </Heading>
    </Container>
  );
};

export default Home;
