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
  Link,
  VStack,
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
    <Box
      borderRadius={theme.radii.lg}
      p={6}
      w={theme.sizes.full}
      my={theme.space[6]}
      mx={[theme.space[2], theme.space[6]]}
      bgColor="white"
    >
      {children}
    </Box>
  );
};

const APSpace = () => {
  const brandTheme = useTheme();

  /**
   * Student data
   */
  const [profile, setProfile] = useState<StudentProfile>();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [photo, setPhoto] = useState<StudentPhoto>({ base64_photo: '', id: '' });

  /**
   * Feedback from querying services
   */
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  /**
   * Sorting stuff,
   * 0 - by count
   * 1 - by subtotal
   */
  const [sortBy, setSortBy] = useState(1);

  /**
   * Pagination stuff
   */
  const [perPage] = useState(10);
  const [page, setPage] = useState(1);

  /**
   * Username and password inputs
   */
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

  const handleSort = (sortBy: number) => {
    setSortBy(sortBy);
  };

  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  const StudentData = () => {
    let totalSpent = 0;
    const purchases = transactions.filter((txn) => txn.SpendVal < 0);
    purchases.forEach((txn) => {
      totalSpent += txn.SpendVal;
    });
    if (isError) {
      return (
        <DetailSection>
          <Text
            textAlign="center"
            fontSize={[theme.fontSizes.lg, theme.fontSizes['2xl']]}
            fontWeight={theme.fontWeights.semibold}
          >
            Error occured! Are you sure your credentials are correct?
          </Text>
        </DetailSection>
      );
    } else if (isLoading) {
      return <LoadingSection />;
    } else {
      return (
        <DetailSection>
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
                  <Text fontWeight={theme.fontWeights.semibold}>Total Spent: RM {Math.abs(totalSpent).toFixed(2)}</Text>
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
                  <Heading textAlign="center" fontSize={['md', '4xl']}>
                    Login to view your data.
                  </Heading>
                </>
              );
            }
          })()}
        </DetailSection>
      );
    }
  };

  interface TransactionStatistic {
    stat: string;
    statName: string;
    statInfo?: string;
  }
  interface StatCardsProps {
    transactionStatistics: TransactionStatistic[];
  }
  const StatCards = ({ transactionStatistics }: StatCardsProps) => {
    return (
      <Flex justifyContent="space-around" flexWrap="wrap">
        {transactionStatistics.map((stat) => {
          return (
            <Box
              key={stat.statName}
              m={2}
              flex={['1 0 8rem', '1 0 12rem']}
              h={['6rem', '8rem']}
              boxShadow={theme.shadows.md}
              borderRadius={theme.radii.lg}
              bgColor="brand.700"
            >
              <Center h={theme.sizes.full} flexDir="column" color="white">
                <Text textAlign="center" fontSize={[theme.fontSizes.xl, theme.fontSizes['4xl']]}>
                  {stat.stat}
                </Text>
                <Text textAlign="center" fontSize={[theme.fontSizes.xs, theme.fontSizes.md]}>
                  {stat.statName}
                  {stat.statInfo ? <Text fontWeight={theme.fontWeights.semibold}>{stat.statInfo}</Text> : ''}
                </Text>
              </Center>
            </Box>
          );
        })}
      </Flex>
    );
  };

  interface ItemListItem {
    hash: number;
    itemName: string;
    itemPrice: number;
    count: number;
  }
  interface ItemListProps {
    items: ItemListItem[];
  }
  const ItemList = ({ items }: ItemListProps) => {
    return (
      <VStack>
        {items.slice((page - 1) * perPage, perPage * page).map((item, ix) => {
          return (
            <Box key={ix}>
              <Text fontSize={theme.fontSizes.md} d="inline" fontWeight={theme.fontWeights.semibold}>
                (RM {Math.abs(item.itemPrice).toFixed(2)}){' '}
              </Text>
              <Text fontSize={theme.fontSizes.xl} d="inline">
                {item.itemName}
              </Text>
              <Text d="inline"> x </Text>
              <Text fontSize={theme.fontSizes.md} d="inline">
                {item.count}
              </Text>
              <Text fontSize={theme.fontSizes.xl} d="inline" fontWeight={theme.fontWeights.semibold}>
                {' '}
                (RM {Math.abs(item.count * item.itemPrice).toFixed(2)})
              </Text>
            </Box>
          );
        })}
      </VStack>
    );
  };

  const TransactionStats = () => {
    const handlePageChange = (pageNumber: number) => {
      setPage(pageNumber);
    };

    if (isLoading) {
      return <LoadingSection />;
    } else {
      return (
        <DetailSection>
          {(() => {
            const purchases = transactions.filter((txn) => txn.SpendVal < 0);
            let items: ItemListItem[] = [];
            if (purchases.length > 0) {
              const remainingBalance = transactions[0].Balance;
              for (let i = 0; i < purchases.length; i++) {
                let foundIx = -1;
                if (
                  items.some((item, ix) => {
                    if (item.hash === hashCode(purchases[i].ItemName)) {
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
                    hash: hashCode(purchases[i].ItemName),
                    itemName: purchases[i].ItemName,
                    itemPrice: purchases[i].SpendVal,
                  });
                }
              }
              items.sort((a, b) => {
                if (sortBy === 0) {
                  return b.count - a.count;
                } else if (sortBy === 1) {
                  return a.count * a.itemPrice - b.count * b.itemPrice;
                } else {
                  return b.count - a.count;
                }
              });

              const mostExpensiveItem = purchases.reduce((prev, curr) => {
                if (prev.SpendVal < curr.SpendVal) {
                  return prev;
                } else {
                  return curr;
                }
              });

              const mostBoughtItem = items.reduce((prev, curr) => {
                if (prev.count > curr.count) {
                  return prev;
                } else {
                  return curr;
                }
              });

              const mostSpentItem = items.reduce((prev, curr) => {
                if (prev.itemPrice * prev.count < curr.itemPrice * curr.count) {
                  return prev;
                } else {
                  return curr;
                }
              });

              const transactionStatistics: TransactionStatistic[] = [
                {
                  stat: purchases.length.toString(),
                  statName: 'Total Items Purchased',
                },
                {
                  stat: items.length.toString(),
                  statName: 'Unique Purchases',
                },
                {
                  stat: `RM ${Math.abs(mostExpensiveItem.SpendVal).toFixed(2)}`,
                  statName: 'Most Expensive Item:',
                  statInfo: mostExpensiveItem.ItemName,
                },
                {
                  stat: mostBoughtItem.count.toString(),
                  statName: 'Most Bought Item:',
                  statInfo: mostBoughtItem.itemName,
                },
                {
                  stat: `RM ${Math.abs(mostSpentItem.itemPrice * mostSpentItem.count).toFixed(2)}`,
                  statName: 'Most Spent on an Item:',
                  statInfo: mostSpentItem.itemName,
                },
                {
                  stat: `RM ${remainingBalance.toFixed(2)}`,
                  statName: 'Remaining Balance',
                },
              ];

              const paginationLinks = [];
              for (let i = 0; i < Math.ceil(items.length / perPage); i++) {
                paginationLinks.push(
                  <Button
                    key={i}
                    w={theme.sizes[10]}
                    bgColor={page === i + 1 ? 'brand.700' : 'white'}
                    color={page === i + 1 ? 'brand.50' : 'unset'}
                    h={theme.sizes[10]}
                    borderRadius={theme.radii.none}
                    onClick={() => {
                      handlePageChange(i + 1);
                    }}
                  >
                    {i + 1}
                  </Button>
                );
              }

              return (
                <>
                  <StatCards transactionStatistics={transactionStatistics} />
                  <Heading textAlign="center" textDecor="underline">
                    Purchased Items
                  </Heading>
                  <Box textAlign="right">
                    <Text d="inline">Sort By</Text>
                    <Box d="inline" textDecor="underline">
                      <Link
                        mx={2}
                        fontWeight={sortBy === 0 ? theme.fontWeights.semibold : theme.fontWeights.normal}
                        onClick={() => handleSort(0)}
                      >
                        Quantity
                      </Link>
                      <Link
                        mx={2}
                        fontWeight={sortBy === 1 ? theme.fontWeights.semibold : theme.fontWeights.normal}
                        onClick={() => handleSort(1)}
                      >
                        Subtotal
                      </Link>
                    </Box>
                  </Box>
                  <ItemList items={items} />
                  <Center w={theme.sizes.full}>
                    <Box my={theme.space[6]}>{paginationLinks}</Box>
                  </Center>
                </>
              );
            } else {
              return (
                <>
                  <Heading textAlign="center" fontSize={['md', '4xl']}>
                    Login to view your transaction statistics.
                  </Heading>
                </>
              );
            }
          })()}
        </DetailSection>
      );
    }
  };

  return (
    <>
      <Container maxW={theme.sizes['6xl']} centerContent>
        <Heading textAlign="center" size="2xl" color="white" mb={theme.space[6]}>
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
        <Flex maxW={theme.sizes.full} flexWrap="wrap" shrink={1} grow={1}>
          <StudentData />
          <TransactionStats />
        </Flex>
      </Container>
    </>
  );
};

export default APSpace;
