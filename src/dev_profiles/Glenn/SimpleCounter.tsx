import React, { useState } from 'react';
import { Box, Button, Container, Heading, Text, theme, Spacer, Flex } from "@chakra-ui/react";

const SimpleCounter = () => {

    const [counter, setCounter] = useState(0);
    //added new comments

    return (
        <Box bg="body" minHeight="92vh">
            <Container h={theme.sizes.full} centerContent>
                <Heading as="h1">This is a simple counter</Heading>
                <Text>
                    The Counter is now at :
                    </Text>
                <Box fontSize={theme.fontSizes['5xl']} >
                    {counter}
                </Box>

                <Flex justify="center" >
                    <Button
                        colorScheme="primary"
                        size="xs" color="black"
                        onClick={() => { setCounter((curr) => curr + 1); }}
                        fontSize={theme.fontSizes['3xl']}
                        height="1.6em">
                        Increment
                    </Button>
                    <Spacer w="1em" />
                    <Button
                        colorScheme="primary"
                        size="xs" color="black"
                        onClick={() => { setCounter((curr) => curr - 1); }}
                        fontSize={theme.fontSizes['3xl']}
                        height="1.6em">
                        Decrement
                    </Button>
                </Flex>
            </Container>

        </Box>
    )
}

export default SimpleCounter
