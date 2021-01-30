import { Container, Divider, Heading, Text, theme } from '@chakra-ui/react';
import React from 'react';
import PageStyle from './components/PageStyle';

const About = () => {
  return (
    <>
      <PageStyle id="about">
        <Heading
          as="h1"
          fontSize={[theme.fontSizes['6xl'], theme.fontSizes['6xl']]}
          color="white"
          marginBottom={4}
          textTransform="uppercase"
        >
          About Us
          <Divider />
        </Heading>
        <Container maxW="6xl">
          <Text fontSize={['2xl', '6xl']} color="white" textAlign="center">
            We are 5 students from <Text fontWeight={theme.fontWeights.semibold}>Asia Pacific University (APU)</Text>{' '}
            pursuing a diploma in Software Engineering. This website is something of a portfolio to show what we have
            learnt.
          </Text>
        </Container>
      </PageStyle>
    </>
  );
};

export default About;
