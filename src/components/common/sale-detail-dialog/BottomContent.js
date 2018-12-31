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
  font-weight: 500;
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


const getPaymentInfoText = (paymentInfo: Object): string => {
  const paidValueText = Object.entries(paymentInfo)
    .reduce((total, value) => total + Number(value[1]), 0);

  return `$ ${paidValueText.toFixed(2)}`;
};

const getDiscountText = (discount: Object): string => {
  const { value, type } = discount;

  if (!type) {
    return '-';
  }

  const discountText = (type === 'money' ? `$ ${value.toFixed(2)}` : `${value}%`);

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
      {renderItem('SUB-TOTAL', subtotalText, false)}
      {renderItem('DISCOUNT', discountText, true)}
      {renderItem('TOTAL', totalText, true)}
    </Wrapper>
  );
};

const renderRightValues = (paymentInfo: Object, inDebitText: string): Object => {
  const paidValueText = getPaymentInfoText(paymentInfo);

  return (
    <Wrapper
      direction="right"
    >
      {renderItem('VALUE PAID', paidValueText, false)}
      {renderItem('VALUE IN DEBIT', inDebitText, true)}
    </Wrapper>
  );
};

type Props = {
  paidValueText: string,
  subtotalText: string,
  inDebitText: string,
  totalText: string,
  paymentInfo: Object,
  discount: Object,
};

const BottomContent = ({
  paidValueText,
  subtotalText,
  inDebitText,
  paymentInfo,
  totalText,
  discount,
}: Props): Object => (
  <Container>
    {renderLeftValues(totalText, subtotalText, discount)}
    {renderRightValues(paymentInfo, inDebitText)}
  </Container>
);

export default BottomContent;
