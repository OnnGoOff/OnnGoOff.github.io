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
  Image,
  Flex,
  useTheme,
  OrderedList,
  ListItem,
} from '@chakra-ui/react';
import { getAPCardData, getStudentImage, getStudentProfile } from './Hooks/APSpaceServices';
import StudentProfile from './Interfaces/StudentProfile';
import Transaction from './Interfaces/Transaction';
import StudentPhoto from './Interfaces/StudentPhoto';

const hashCode = (string: string) => {
  var hash = 0;
  if (string.length === 0) return hash;
  for (let i = 0; i < string.length; i++) {
    let char = string.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  return hash;
};

const APSpace = () => {
  const brandTheme = useTheme();
  const [profile, setProfile] = useState<StudentProfile>();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [photo, setPhoto] = useState<StudentPhoto>({ base64_photo: '', id: '' });
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
        const studentData = await getStudentProfile(u, p);
        const studentImage = await getStudentImage(u, p);

        setTransactions(APCardData as Transaction[]);
        setProfile(studentData as StudentProfile);
        setPhoto(studentImage as StudentPhoto);
      } catch (error) {
        setIsError(true);
      }

      setIsLoading(false);
    }
  };

  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  const LoadingSection = () => {
    return (
      <DetailSection>
        <Center w={theme.sizes.full}>
          <Spinner thickness="5px" size="xl" color="brand.400" />
        </Center>
      </DetailSection>
    );
  };

  const DetailSection = ({ children }: { children: React.ReactNode }) => {
    return (
      <Box borderRadius={theme.radii.lg} p={6} w={theme.sizes.full} m={theme.space[6]} bgColor="white">
        {children}
      </Box>
    );
  };

  const StudentData = () => {
    let totalSpent = 0;
    if (transactions.length > 0) {
      transactions.forEach((txn) => {
        if (txn.SpendVal < 0) {
          totalSpent += txn.SpendVal;
        }
      });
    }
    if (isError) {
      return (
        <Box borderRadius={theme.radii.lg} p={6} w={theme.sizes.full} m={theme.space[6]} color="red" bgColor="white">
          <Center w={theme.sizes.full}>
            <Text fontSize={theme.fontSizes.lg} fontWeight={theme.fontWeights.semibold}>
              Error occured! Are you sure your credentials are correct?
            </Text>
          </Center>
        </Box>
      );
    } else if (isLoading) {
      return <LoadingSection />;
    } else {
      return (
        <DetailSection>
          <Heading size="md" textDecor="underline">
            Student Details
          </Heading>
          {(() => {
            if (profile) {
              return (
                <>
                  <Center w={theme.sizes.full}>
                    <Image
                      borderRadius={theme.radii.lg}
                      boxSize="200px"
                      fit="cover"
                      src={`data:image/jpg;base64,${photo.base64_photo}`}
                      alt={profile.NAME}
                    />
                  </Center>
                  <Text>Name: {profile.NAME}</Text>
                  <Text>Intake: {profile.INTAKE}</Text>
                  <Text>Total Spent: RM {Math.abs(totalSpent).toFixed(2)}</Text>
                  <Text>IC/Passport Number: {profile.IC_PASSPORT_NO}</Text>
                  <Text>Country: {profile.COUNTRY}</Text>
                  <Text>Mentor: {profile.MENTOR_NAME}</Text>
                  <Text>Programme Leader: {profile.PL_NAME}</Text>
                  <Text>Programme: {profile.PROGRAMME}</Text>
                  <Text>Email: {profile.STUDENT_EMAIL}</Text>
                  <Text>TP Number: {profile.STUDENT_NUMBER}</Text>
                </>
              );
            } else {
              return (
                <>
                  <Center w={theme.sizes.full}>
                    <Heading size="xl">Login to view your data.</Heading>
                  </Center>
                </>
              );
            }
          })()}
        </DetailSection>
      );
    }
  };

  const TransactionStats = () => {
    if (isLoading) {
      return <LoadingSection />;
    } else {
      return (
        <DetailSection>
          <Heading size="md" textDecor="underline">
            Top bought items:
          </Heading>
          {(() => {
            let items: { hash: number; itemName: string; itemPrice: number; count: number }[] = [];
            if (transactions.length > 0) {
              for (let i = 0; i < transactions.length; i++) {
                if (transactions[i].SpendVal < 0) {
                  let foundIx = -1;
                  if (
                    items.some((item, ix) => {
                      if (item.hash === hashCode(transactions[i].ItemName)) {
                        foundIx = ix;
                        return true;
                      } else {
                        return false;
                      }
                    })
                  ) {
                    items[foundIx].count += 1;
                  } else {
                    items.push({
                      count: 1,
                      hash: hashCode(transactions[i].ItemName),
                      itemName: transactions[i].ItemName,
                      itemPrice: transactions[i].SpendVal,
                    });
                  }
                }
              }
              items.sort((a, b) => {
                return b.count - a.count;
              });
              return (
                <>
                  <OrderedList>
                    {items.map((item, ix) => {
                      return (
                        <ListItem>
                          <Text d="inline" isTruncated>
                            {item.itemName} x{' '}
                          </Text>
                          <Text d="inline" fontWeight={theme.fontWeights.semibold}>
                            {item.count} bought
                          </Text>
                          <Text d="inline" fontWeight={theme.fontWeights.semibold}>
                            {' '}
                            (RM {Math.abs(item.count * item.itemPrice).toFixed(2)})
                          </Text>
                        </ListItem>
                      );
                    })}
                  </OrderedList>
                </>
              );
            } else {
              return (
                <Center w={theme.sizes.full}>
                  <Heading size="xl">Login to view your transaction statistics.</Heading>
                </Center>
              );
            }
          })()}
        </DetailSection>
      );
    }
  };

  //#region APCard Code
  //  const APCardData = () => {
  //    if (transactions.length > 0) {
  //      if (isLoading) {
  //        return <Spinner thickness="5px" size="xl" color="brand.400" />;
  //      } else {
  //        return (
  //          <StatGroup maxW={theme.sizes.full}>
  //            {transactions.map((txn, ix) => {
  //              return (
  //                <Box
  //                  key={ix}
  //                  bgColor="white"
  //                  flex="1 1 21%"
  //                  margin={2}
  //                  p={2}
  //                  borderRadius={theme.radii.lg}
  //                  boxShadow={theme.shadows.md}
  //                  px={theme.space[3]}
  //                  maxW={theme.sizes.full}
  //                >
  //                  <Stat>
  //                    <StatLabel>{txn.SpendDate}</StatLabel>
  //                    <StatNumber isTruncated>{txn.ItemName}</StatNumber>
  //                    <StatHelpText>
  //                      {txn.SpendVal < 0 ? <StatArrow type="decrease" /> : <StatArrow type="increase" />}
  //                      RM {txn.SpendVal.toFixed(2)}
  //                    </StatHelpText>
  //                  </Stat>
  //                </Box>
  //              );
  //            })}
  //          </StatGroup>
  //        );
  //      }
  //    } else {
  //      return <Heading size="2xl">Please Log-in to View Data.</Heading>;
  //    }
  //  };
  //#endregion

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
          <Button colorScheme={brandTheme.brand} variant="solid" my={1} onClick={handleLogin}>
            Check Data
          </Button>
        </Box>
        <Flex flexWrap="wrap" shrink={1} grow={1}>
          <StudentData />
          <TransactionStats />
        </Flex>
        <Box>{/* <APCardData /> */}</Box>
      </Container>
    </>
  );
};

export default APSpace;
