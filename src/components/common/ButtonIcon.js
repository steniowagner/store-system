import * as React from 'react';
import styled from 'styled-components';
import { getButtonIcon, getButtonColor } from '../../style/utils/buttonStyles';

const ButtonWrapper = styled.button`
  background: ${({ theme, type }) => getButtonColor(theme, type)}};
  border-color: ${({ theme, type }) => getButtonColor(theme, type)}};
  border-radius: 4px;
  cursor: pointer;
  height: 36px;
  width: 36px;
  &:focus {
    outline: 0;
  }
`;

const Icon = styled.img.attrs({
  src: ({ theme, type }) => getButtonIcon(theme, type),
})`
  height: 18px;
  width: 18px;
`;

type Props = {
  type: string,
  onClick: any,
};

const ButtonIcon = ({ type, onClick }: Props) => (
  <ButtonWrapper
    onClick={() => onClick()}
    type={type}
  >
    <Icon type={type} />
  </ButtonWrapper>
);

export default ButtonIcon;
