// @flow

import React from 'react';

import styled from 'styled-components';

const ItemWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  margin: 16px 0;
`;

const IconWrapper = styled.div`
  width: 44px;
  height: 44px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 16px;
  border-radius: 22px;
  background-color: ${({ theme, color }) => theme.colors[color]};
`;

const Title = styled.span`
  font-size: 24px;
`;

type ItemConfig = {
  Icon: Function,
  message: string,
  value: string,
  color: string,
};

const BottomItem = ({
  message,
  value,
  Icon,
  color,
}: ItemConfig): Object => (
  <ItemWrapper>
    <IconWrapper
      color={color}
    >
      <Icon />
    </IconWrapper>
    <Title>
      {`${message} ${value}`}
    </Title>
  </ItemWrapper>
);

export default BottomItem;
