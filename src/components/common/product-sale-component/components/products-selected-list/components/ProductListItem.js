// @flow

import React from 'react';

import styled from 'styled-components';

import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

const Container = styled.div`
  width: 100%;
  display: flex;
  border-bottom: 2px solid ${({ theme }) => theme.colors.lightGray};
  &:hover {
    background-color: ${({ theme }) => theme.colors.lightGray};
  }
  &:last-child {
    border-bottom: 0px;
  }
`;

const ProductDescriptionWrapper = styled.div`
  width: 50%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 8px 8px;
`;

const ProductValuesWrapper = styled.div`
  width: 40%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 8px 8px;
`;

const ActionButtonsWrapper = styled.div`
  width: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px 8px;
`;

const ProductIndexText = styled.span`
  margin: 0 24px 0 16px;
  font-size: 18px;
  color: ${({ theme }) => theme.colors.darkText};
`;

const DefaultText = styled.span`
  font-size: 32px;
  font-weight: 500;
  margin-right: 6px;
  color: ${({ theme, primaryColor }) => (primaryColor ? theme.colors.affirmative : theme.colors.darkText)};
`;

const renderProductDescriptionWithIndex = (description: string, index: number): Object => (
  <ProductDescriptionWrapper>
    <ProductIndexText>
      {index + 1}
    </ProductIndexText>
    <DefaultText>
      {description}
    </DefaultText>
  </ProductDescriptionWrapper>
);

const renderValues = (quantity: number, salePrice: number, total: number): Object => (
  <ProductValuesWrapper>
    <DefaultText
      primaryColor
    >
      {quantity}
    </DefaultText>
    <DefaultText>
      {`x $ ${salePrice} = $ ${total}`}
    </DefaultText>
  </ProductValuesWrapper>
);

const renderActionButtons = (onRemove: Function, onEdit: Function, index: number): Object => (
  <ActionButtonsWrapper>
    <IconButton
      onClick={() => onEdit(index)}
      aria-label="Edit"
      disableRipple
    >
      <EditIcon />
    </IconButton>
    <IconButton
      onClick={() => onRemove(index)}
      aria-label="Remove"
      disableRipple
    >
      <DeleteIcon />
    </IconButton>
  </ActionButtonsWrapper>
);

type Props = {
  description: string,
  onRemove: Function,
  onEdit: Function,
  salePrice: number,
  quantity: number,
  index: number,
  total: number,
  mode: string,
};

const ProductListItem = ({
  description,
  salePrice,
  onRemove,
  quantity,
  onEdit,
  index,
  total,
  mode,
}: Props): Object => {
  const shouldShowActionButtons = (mode !== 'detail');

  return (
    <Container>
      {renderProductDescriptionWithIndex(description, index)}
      {renderValues(quantity, salePrice, total)}
      {shouldShowActionButtons && renderActionButtons(onRemove, onEdit, index)}
    </Container>
  );
};

export default ProductListItem;
