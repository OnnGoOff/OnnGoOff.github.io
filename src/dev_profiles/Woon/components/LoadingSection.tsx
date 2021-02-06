import { Center, Spinner, theme } from '@chakra-ui/react';
import React from 'react';
import DetailSection from './DetailSection';

const LoadingSection = () => {
  return (
    <DetailSection>
      <Center w={theme.sizes.full}>
        <Spinner thickness="5px" size="xl" color="brand.400" />
      </Center>
    </DetailSection>
  );
};

export default LoadingSection;
