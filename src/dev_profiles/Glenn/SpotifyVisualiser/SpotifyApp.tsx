import React from 'react';
import { Heading, theme, Box, Container } from '@chakra-ui/react';

const SpotifyApp = () => {
    return (
        <Box bg="body" minHeight="92vh">
            <Container h={theme.sizes.full} centerContent>
                <Heading as="h1">Spotify visualiser App</Heading>
            </Container>
        </Box>
    )
}

export default SpotifyApp
