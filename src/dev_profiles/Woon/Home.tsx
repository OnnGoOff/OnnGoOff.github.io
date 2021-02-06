import { Box, Text, theme } from '@chakra-ui/react';
import React, { useContext, useEffect } from 'react';
import { WoonPageContext } from './index';

const Home = () => {
  const { setBackgroundColor } = useContext(WoonPageContext);

  useEffect(() => {
    setBackgroundColor('brand.persian-green');
  }, [setBackgroundColor]);
  return (
    <>
      <Box
        maxW={theme.sizes.lg}
        top="50%"
        left="50%"
        transform="translate(-50%,-50%)"
        pos="absolute"
        color="white"
        textAlign="center"
      >
        <Text fontSize={theme.fontSizes['9xl']}>Hello</Text>
        <Text fontSize={theme.fontSizes['3xl']}>I am Woon Eusean</Text>
        <Text>
          I am a 2nd year Diploma student in Asia Pacific University. I am currently pursuing a Diploma in ICT with
          specialisation in Software Engineering. This is my page to show what I've learnt and some fun stuff.
        </Text>
      </Box>
    </>
  );
};

export default Home;
