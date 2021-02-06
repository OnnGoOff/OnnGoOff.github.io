import { Box, StatGroup, Stat, StatLabel, StatNumber, Text, theme, Grid } from '@chakra-ui/react';
import React, { FunctionComponent } from 'react';
import { ItemListItem } from '../APSpace';

interface ItemListProps {
  items: ItemListItem[];
  page: number;
  perPage: number;
}

const ItemList: FunctionComponent<ItemListProps> = ({ items, page, perPage }) => {
  return (
    <Grid gridTemplateColumns={['1fr', '1fr 1fr 1fr']}>
      {items.slice((page - 1) * perPage, perPage * page).map((item, ix) => {
        return (
          <Box
            key={item.hash}
            m={2}
            p={2}
            borderRadius={theme.radii.lg}
            border={theme.borders['1px']}
            borderColor="brand.50"
          >
            <Text
              noOfLines={1}
              fontWeight={theme.fontWeights.semibold}
              fontSize={theme.fontSizes.lg}
              flex="0 1 70%"
              verticalAlign="baseline"
            >
              <Text
                d="inline"
                fontSize={theme.fontSizes.md}
                color={item.rank === 1 ? 'gold' : item.rank === 2 ? 'silver' : item.rank === 3 ? 'brown' : 'black'}
              >
                #{item.rank} -{' '}
              </Text>
              {item.itemName.trim()}
            </Text>
            <StatGroup alignItems="center">
              <Stat>
                <StatLabel>Price</StatLabel>
                <StatNumber fontSize={theme.fontSizes.lg}>RM {Math.abs(item.itemPrice).toFixed(2)}</StatNumber>
              </Stat>

              <Stat>
                <StatLabel>Bought</StatLabel>
                <StatNumber fontSize={theme.fontSizes.lg}>{item.count}</StatNumber>
              </Stat>

              <Stat>
                <StatLabel>Subtotal</StatLabel>
                <StatNumber fontSize={theme.fontSizes.lg}>
                  RM {Math.abs(item.itemPrice * item.count).toFixed(2)}
                </StatNumber>
              </Stat>
            </StatGroup>
          </Box>
        );
      })}
    </Grid>
  );
};

export default ItemList;
