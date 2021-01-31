import { Container, Divider, Heading, Text, theme } from '@chakra-ui/react';
import React from 'react';

const About = () => {
  return (
    <>
      <Container centerContent maxW={theme.sizes['6xl']}>
        <Heading color="white" marginBottom={theme.space[12]}>
          About Me
          <Divider />
        </Heading>
        <Text color="white" fontSize={theme.fontSizes['2xl']} marginBottom={theme.space[12]}>
          I am a Second Year student in <b>Asia Pacific University (APU)</b> pursuing a Diploma in ICT with
          Specialisation in Software Engineering.
        </Text>
        <Text color="white" fontSize={theme.fontSizes['2xl']} marginBottom={theme.space[12]}>
          Since my childhood I have been interested in computers and software, how it works and so on. I have a keen
          interest in making things that will <b>help people</b>.
        </Text>
        <Text color="white" fontSize={theme.fontSizes['2xl']} marginBottom={theme.space[12]}>
          Over the years, since I was 11, I have been learning all sorts of languages and technologies, my first being
          <b>Visual Basic .Net</b> (VB.Net), follow by <b>C#</b> and <b>C++</b>. After that I touched on Game
          Development with <b>Unity</b> and simple web development with <b>HTML, CSS and JavaScript</b>. I realised that
          once you have grasped and understood one programming language, it is the same anywhere else, only with
          different syntax and keywords.
        </Text>
        <Text color="white" fontSize={theme.fontSizes['2xl']} marginBottom={theme.space[12]}>
          It is only recently I have found the world of <b>Modern Web Development</b> and how different it is compared
          to what I have seen before. There are so many libraries, frameworks, workflows. You won't get far making your
          own libraries and frameworks. Its the philosophy of not reinventing the wheel but 100 times more.
        </Text>
        <Text color="white" fontSize={theme.fontSizes['2xl']} marginBottom={theme.space[12]}>
          For once, I have been overwhelmed by the sheer amount of black boxes of Modern Web Development. The sheer
          amount of libraries that I try to understand but couldn't. One day I realised that I did not have to. I just
          need to use it well enough for my needs. Indeed, Modern Web Development has changed my way of thinking, to
          better or worse, I do not know. But one thing I am sure about is that Web Development is more fun that
          Software Development.
        </Text>
      </Container>
    </>
  );
};

export default About;
