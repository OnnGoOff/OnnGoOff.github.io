import React, { useContext, useEffect, useState } from 'react';
import {
  Text,
  Box,
  Button,
  Container,
  Input,
  InputGroup,
  InputRightElement,
  theme,
  Center,
  Heading,
  Flex,
  useTheme,
  Link,
  Divider,
} from '@chakra-ui/react';
import { getAPCardData, getStudentImage, getStudentProfile } from './hooks/APSpaceServices';
import StudentProfile from './interfaces/StudentProfile';
import Transaction from './interfaces/Transaction';
import StudentPhoto from './interfaces/StudentPhoto';

import ItemList from './components/ItemList';
import DetailSection from './components/DetailSection';
import LoadingSection from './components/LoadingSection';
import StatCards from './components/StatCards';
import StudentDataSection from './components/StudentDataSection';

import hashCode from './utils/hashCode';
import { CloseIcon } from '@chakra-ui/icons';
import { WoonPageContext } from '.';

export interface ItemListItem {
  rank: number;
  hash: number;
  itemName: string;
  itemPrice: number;
  count: number;
}

export interface TransactionStatistic {
  stat: string;
  statName: string;
  statInfo?: string;
}

const APSpace = () => {
  //#region Declarations
  const brandTheme = useTheme();

  /**
   * Getting and using the WoonPageContext for the
   * setBackgroundColor function
   */
  const { setBackgroundColor } = useContext(WoonPageContext);
  useEffect(() => {
    setBackgroundColor('brand.400');
  }, [setBackgroundColor]);

  /**
   * Student data
   */
  const [profile, setProfile] = useState<StudentProfile>();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [photo, setPhoto] = useState<StudentPhoto>();

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
  const [perPage] = useState(12);
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
  //#endregion

  const StudentData = () => {
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
    } else {
      return (
        <DetailSection>
          <StudentDataSection photo={photo} profile={profile} isLoading={isLoading} />
        </DetailSection>
      );
    }
  };

  const TransactionStats = () => {
    const sortAndRank = (purchases: Transaction[]) => {
      let items: ItemListItem[] = [];
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
            rank: i + 1,
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

      for (let i = 0; i < items.length; i++) {
        items[i].rank = i + 1;
      }

      return items;
    };

    const handlePageChange = (pageNumber: number) => {
      setPage(pageNumber);
    };

    if (isLoading) {
      return <LoadingSection />;
    } else if (isError) {
      return (
        <DetailSection>
          <Center>
            <CloseIcon boxSize={16} color="red.500" />
          </Center>
        </DetailSection>
      );
    } else {
      return (
        <DetailSection>
          {(() => {
            if (transactions.length > 0) {
              const purchases = transactions.filter((txn) => txn.SpendVal < 0);

              const items: ItemListItem[] = sortAndRank(purchases);

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
                  <StatCards items={items} lastTransaction={transactions[0]} purchases={purchases} />
                  <Box m={2} d={['block', 'flex']} justifyContent="space-between" alignItems="baseline">
                    <Heading>Purchased Items</Heading>
                    <Box>
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
                  </Box>
                  <Divider />
                  <ItemList items={items} page={page} perPage={perPage} />
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
          View APCard Stats
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
