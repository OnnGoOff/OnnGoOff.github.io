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
    <Grid gridTemplateColumns={['1fr', '1fr 1fr']}>
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
                as="span"
                d="inline"
                textShadow={
                  item.rank === 1
                    ? '0 0 0.25rem black'
                    : item.rank === 2
                    ? '0 0 0.25rem #707070'
                    : item.rank === 3
                    ? '0 0 0.25rem #852300'
                    : 'none'
                }
                color={item.rank === 1 ? '#fedf00' : item.rank === 2 ? '#707070' : item.rank === 3 ? '#852300' : 'none'}
              >
                #{item.rank}
              </Text>{' '}
              - <Text as="span">{item.itemName.trim()}</Text>
            </Text>
            <StatGroup alignItems="center">
              {[
                { label: 'Price', body: `RM ${Math.abs(item.itemPrice).toFixed(2)}` },
                { label: 'Bought', body: item.count },
                { label: 'Subtotal', body: ` RM ${Math.abs(item.itemPrice * item.count).toFixed(2)}` },
              ].map((stat) => {
                return (
                  <Stat key={stat.label}>
                    <StatLabel fontWeight={theme.fontWeights.semibold} color={theme.colors.gray[400]}>
                      {stat.label}
                    </StatLabel>
                    <StatNumber fontWeight={theme.fontWeights.normal} fontSize={theme.fontSizes.lg}>
                      {stat.body}
                    </StatNumber>
                  </Stat>
                );
              })}
            </StatGroup>
          </Box>
        );
      })}
    </Grid>
  );
};

export default ItemList;
