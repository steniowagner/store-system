// @flow

import React from 'react';

import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 250px;
  background-color: ${({ theme }) => theme.colors.tableOddColor};
  border-bottom-right-radius: 4px;
  border-bottom-left-radius: 4px;
`;

const ValueText = styled.p`
  margin-left: 8px;
  font-size: 28px;
  color: ${({ theme }) => theme.colors.darkText};
`;

const ValueTitle = styled.span`
  margin-left: 8px;
  font-size: 28px;
  color: ${({ theme }) => theme.colors.affirmative};
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: ${({ direction }) => (direction === 'left' ? 'flex-start' : 'flex-end')};
  padding: 0 16px;
`;

const Item = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: ${({ withMargin }) => (withMargin ? 24 : 0)}px;
`;

const getDiscountText = (discount: Object): string => {
  const { value, type } = discount;

  if (!type) {
    return '-';
  }

  const discountText = (type === 'money' ? `R$ ${value.toFixed(2)}` : `${value}%`);

  return discountText;
};

const renderItem = (title: string, value: string, withMargin: boolean): Object => (
  <Item
    withMargin={withMargin}
  >
    <ValueTitle>
      {`${title}: `}
    </ValueTitle>
    <ValueText>
      {value}
    </ValueText>
  </Item>
);

const renderLeftValues = (totalText: string, subtotalText: string, discount: Object): Object => {
  const discountText = getDiscountText(discount);

  return (
    <Wrapper
      direction="left"
    >
      {renderItem('Sub-Total', totalText, false)}
      {renderItem('Desconto', discountText, true)}
      {renderItem('Total', subtotalText, true)}
    </Wrapper>
  );
};

const renderRightValues = (paidValueText: string, inDebitText: string): Object => (
  <Wrapper
    direction="right"
  >
    {renderItem('Valor Pago', paidValueText, false)}
    {renderItem('Valor em Débito', inDebitText, true)}
  </Wrapper>
);

type Props = {
  paidValueText: string,
  subtotalText: string,
  inDebitText: string,
  totalText: string,
  discount: Object,
};

const BottomContent = ({
  paidValueText,
  subtotalText,
  inDebitText,
  totalText,
  discount,
}: Props): Object => (
  <Container>
    {renderLeftValues(totalText, subtotalText, discount)}
    {renderRightValues(paidValueText, inDebitText)}
  </Container>
);

export default BottomContent;
