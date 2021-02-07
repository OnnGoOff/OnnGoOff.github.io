import { Box, Center, Flex, Text, theme } from '@chakra-ui/react';
import React, { FunctionComponent } from 'react';
import { ItemListItem, TransactionStatistic } from '../APSpace';
import Transaction from '../interfaces/Transaction';

interface StatCardsProps {
  purchases: Transaction[];
  lastTransaction: Transaction;
  items: ItemListItem[];
}

const StatCards: FunctionComponent<StatCardsProps> = ({ purchases, lastTransaction, items }) => {
  let totalSpent = 0;
  purchases.forEach((txn) => {
    totalSpent += txn.SpendVal;
  });

  const remainingBalance = lastTransaction.Balance;

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
      stat: mostBoughtItem.count.toString(),
      statName: 'Most Bought Item:',
      statInfo: mostBoughtItem.itemName,
    },
    {
      stat: `RM ${Math.abs(mostExpensiveItem.SpendVal).toFixed(2)}`,
      statName: 'Most Expensive Item:',
      statInfo: mostExpensiveItem.ItemName,
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
    {
      stat: `RM ${Math.abs(totalSpent).toFixed(2)}`,
      statName: 'Total Spent',
    },
  ];
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
            bgColor="brand.400"
          >
            <Center h={theme.sizes.full} flexDir="column" color="white">
              <Text textAlign="center" fontSize={[theme.fontSizes.xl, theme.fontSizes['4xl']]}>
                {stat.stat}
              </Text>
              <Text textAlign="center" fontSize={[theme.fontSizes.xs, theme.fontSizes.md]}>
                {stat.statName}
                {stat.statInfo ? (
                  <Text as="span" d="block" fontWeight={theme.fontWeights.semibold}>
                    {stat.statInfo}
                  </Text>
                ) : (
                  ''
                )}
              </Text>
            </Center>
          </Box>
        );
      })}
    </Flex>
  );
};

export default StatCards;
