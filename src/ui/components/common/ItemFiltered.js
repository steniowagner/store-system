// @flow

import React, { Fragment } from 'react';

import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';

import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const PrimaryItemText = styled.p`
  font-size: 20px;
  font-weight: 700;
  color: rgba(0, 0, 0, 0.8);
  align-text: center;
`;

const SecondaryWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 8px;
`;

const SecondaryItemWrapper = styled.div`
  margin-right: 16px;
  display: flex;
  justify-content: center;
`;

const SecondaryItemTitle = styled.p`
  font-size: 18px;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.8);
`;

const SecondaryItemValue = styled.span`
  margin-left: 4px;
  font-size: 18px;
  color: rgba(0, 0, 0, 0.5);
`;

const ItemListWrapper = styled(({ ...props }) => (
  <ListItem
    {...props}
    button
  />
))`
  width: 100%;
  display: flex;
  align-items: center;
`;

type Props = {
  secondariesItems: ?Array<Object>,
  onSelectItem: Function,
  primaryItem: Object,
  isLast: boolean
};

const renderPrimaryItem = (primaryItem: string): Object => (
  <PrimaryItemText>
    {primaryItem}
  </PrimaryItemText>
);

const renderSecondariesItems = (secondariesItems: Array<Object>): Object => (
  <SecondaryWrapper>
    {secondariesItems.map(secondaryItem => (
      <SecondaryItemWrapper>
        <SecondaryItemTitle>
          {`${secondaryItem.title}: `}
        </SecondaryItemTitle>
        <SecondaryItemValue>
          {secondaryItem.value}
        </SecondaryItemValue>
      </SecondaryItemWrapper>
    ))}
  </SecondaryWrapper>
);

const ItemFiltered = ({
  secondariesItems,
  onSelectItem,
  primaryItem,
  isLast,
}: Props): Object => (
  <Fragment>
    <ItemListWrapper
      onClick={() => onSelectItem()}
    >
      <Wrapper>
        {renderPrimaryItem(primaryItem)}
        {!!secondariesItems && renderSecondariesItems(secondariesItems)}
      </Wrapper>
    </ItemListWrapper>
    {!isLast && (
      <Divider
        light
      />
    )}
  </Fragment>
);

export default ItemFiltered;
