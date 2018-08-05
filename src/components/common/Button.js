import * as React from 'react';
import styled from 'styled-components';
import {
  getButtonColor,
  getCancelBackgroundColor,
  getCancelTextColor,
  getCancelBorderColor,
} from '../../style/utils/buttonStyles';

const ButtonWrapper = styled.button`
  background: ${({ theme, type }) => (type === 'cancel' ? getCancelBackgroundColor(theme) : getButtonColor(theme, type))}};
  border-color: ${({ theme, type }) => (type === 'cancel' ? getCancelBorderColor(theme) : getButtonColor(theme, type))}};
  border-radius: 4px;
  cursor: pointer;
  &:focus {
    outline: 0;
  }
  &:hover {
  background: #FF0;
  }
`;

const ButtonText = styled.h6`
  color: ${({ theme, type }) => (type === 'cancel' ? getCancelTextColor(theme) : theme.colors.white)};
  padding: 12px 18px;
  font-weight: 700;
  font-size: 14px;
`;

type Props = {
  title: string,
  type: string,
  onClick: any,
};

const Button = ({ title, type, onClick }: Props) => (
  <ButtonWrapper
    type={type}
    onClick={() => onClick()}
  >
    <ButtonText type={type}>
      {title}
    </ButtonText>
  </ButtonWrapper>
);

export default Button;
