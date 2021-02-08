import React from 'react';
import { Box, Container } from "@chakra-ui/react";
import { Heading, theme } from '@chakra-ui/react';

const Homepage = () => {
    return (
        <Box bg="body" minHeight="92vh">
            <Container h={theme.sizes.full} centerContent>
                <Heading as="h1">Homepage</Heading>
            </Container>
        </Box>
    )
}

export default Homepage
