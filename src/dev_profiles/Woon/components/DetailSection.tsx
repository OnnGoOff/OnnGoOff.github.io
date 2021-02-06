import { Box, theme } from '@chakra-ui/react';
import React, { FunctionComponent } from 'react';

const DetailSection: FunctionComponent = ({ children }) => {
  return (
    <Box
      borderRadius={theme.radii.lg}
      p={6}
      w={[theme.sizes.container.md, theme.sizes.container.lg]}
      my={[theme.space[2], theme.space[6]]}
      mx={[theme.space[2], theme.space[6]]}
      bgColor="white"
    >
      {children}
    </Box>
  );
};

export default DetailSection;
