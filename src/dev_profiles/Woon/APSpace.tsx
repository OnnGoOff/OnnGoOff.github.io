import React, { useState } from 'react';
import {
  Text,
  Box,
  Button,
  Container,
  Input,
  InputGroup,
  InputRightElement,
  theme,
  Spinner,
  Center,
  Heading,
} from '@chakra-ui/react';
import { getAPCardData, getStudentProfile } from './Hooks/APUServiceTicket';

interface StudentProfile {
  BLOCK: string;
  COUNTRY: string;
  DATE: string;
  EMGS_COUNTRY_CODE: string;
  IC_PASSPORT_NO: string;
  INTAKE: string;
  INTAKE_STATUS: string;
  MENTOR_NAME: string;
  MENTOR_SAMACCOUNTNAME: string;
  MESSAGE: string;
  NAME: string;
  PHOTO_NO: string;
  PL_NAME: string;
  PL_SAMACCOUNTNAME: string;
  PROGRAMME: string;
  PROVIDER_CODE: string;
  STUDENT_EMAIL: string;
  STUDENT_NUMBER: string;
  STUDENT_STATUS: string;
}

interface Transaction {
  Balance: number;
  ItemName: string;
  SNO: string;
  SpendDate: string;
  SpendTime: string;
  SpendVal: number;
  TerminalID: string;
  useTimes: number;
}

const APSpace = () => {
  const [profile, setProfile] = useState<StudentProfile>();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const username = React.createRef<HTMLInputElement>();
  const password = React.createRef<HTMLInputElement>();

  const handleLogin = async () => {
    if (username.current?.value && password.current?.value) {
      setIsLoading(true);
      setIsError(false);
      const [u, p] = [username.current.value, password.current.value];
      try {
        const APCardData = await getAPCardData(u, p);
        const StudentData = await getStudentProfile(u, p);

        setTransactions(APCardData as Transaction[]);
        setProfile(StudentData as StudentProfile);
      } catch (error) {
        setIsError(true);
      }

      setIsLoading(false);
    }
  };

  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  const StudentData = () => {
    let totalSpent = 0;
    if (transactions.length > 0) {
      const maxTxn = transactions.reduce((prev, curr, ix) => {
        if (curr.SpendVal < 0) {
          prev.SpendVal = prev.SpendVal + curr.SpendVal;
          return prev;
        } else {
          return prev;
        }
      });
      totalSpent = maxTxn.SpendVal;
    }

    if (isError) {
      return (
        <Box borderRadius={theme.radii.lg} p={6} w={theme.sizes.lg} my={theme.space[6]} color="red" bgColor="white">
          <Center w={theme.sizes.full}>
            <Text fontSize={theme.fontSizes.lg} fontWeight={theme.fontWeights.semibold}>
              Error occured! Are you sure your credentials are correct?
            </Text>
          </Center>
        </Box>
      );
    } else if (isLoading) {
      return (
        <Box borderRadius={theme.radii.lg} p={6} w={theme.sizes.lg} my={theme.space[6]} bgColor="white">
          <Center w={theme.sizes.full}>
            <Spinner thickness="5px" size="xl" color="brand.persian-green" />
          </Center>
        </Box>
      );
    } else {
      return (
        <Box borderRadius={theme.radii.lg} p={6} w={theme.sizes.lg} my={theme.space[6]} bgColor="white">
          {(() => {
            if (profile) {
              return (
                <>
                  <Text>Name: {profile.NAME}</Text>
                  <Text>Intake: {profile.INTAKE}</Text>
                  <Text>Total Spent: RM {Math.abs(totalSpent).toFixed(2)}</Text>
                </>
              );
            } else {
              return (
                <>
                  <Text>Name: </Text>
                  <Text>Intake:</Text>
                  <Text>Total Spent:</Text>
                </>
              );
            }
          })()}
        </Box>
      );
    }
  };

  // const APCardData = () => {
  //   if (transactions.length > 0) {
  //     if (isLoading) {
  //       return <Spinner thickness="5px" size="xl" color="brand.persian-green" />;
  //     } else {
  //       return (
  //         <StatGroup maxW={theme.sizes.full}>
  //           {transactions.map((txn, ix) => {
  //             return (
  //               <Box
  //                 key={ix}
  //                 bgColor="white"
  //                 flex="1 1 21%"
  //                 margin={2}
  //                 p={2}
  //                 borderRadius={theme.radii.lg}
  //                 boxShadow={theme.shadows.md}
  //                 px={theme.space[3]}
  //                 maxW={theme.sizes.full}
  //               >
  //                 <Stat>
  //                   <StatLabel>{txn.SpendDate}</StatLabel>
  //                   <StatNumber isTruncated>{txn.ItemName}</StatNumber>
  //                   <StatHelpText>
  //                     {txn.SpendVal < 0 ? <StatArrow type="decrease" /> : <StatArrow type="increase" />}
  //                     RM {txn.SpendVal.toFixed(2)}
  //                   </StatHelpText>
  //                 </Stat>
  //               </Box>
  //             );
  //           })}
  //         </StatGroup>
  //       );
  //     }
  //   } else {
  //     return <Heading size="2xl">Please Log-in to View Data.</Heading>;
  //   }
  // };

  return (
    <>
      <Container maxW={theme.sizes['6xl']} centerContent>
        <Heading size="2xl" color="white" mb={theme.space[6]}>
          View Total Spent In APCard
        </Heading>
        <Box maxW={theme.sizes.xl}>
          <InputGroup size="md" my={2}>
            <Input bgColor="white" ref={username} pr="4.5rem" type="text" placeholder="Enter TP number" />
          </InputGroup>
          <InputGroup size="md" my={1}>
            <Input
              bgColor="white"
              ref={password}
              pr="4.5rem"
              type={show ? 'text' : 'password'}
              placeholder="Enter password"
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={handleClick}>
                {show ? 'Hide' : 'Show'}
              </Button>
            </InputRightElement>
          </InputGroup>
          <Button colorScheme="teal" variant="solid" my={1} onClick={handleLogin}>
            Check Data
          </Button>
        </Box>
        <StudentData />
        <Box>{/* <APCardData /> */}</Box>
      </Container>
    </>
  );
};

export default APSpace;
