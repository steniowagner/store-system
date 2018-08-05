import * as React from 'react';
import styled from 'styled-components';

const InputWrapper = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
`;

const Wrapper = styled.div`
  width: 50%;
`;

const InputLabel = styled.h6`
  position: absolute;
  color: #F00;
  padding: 16px;
  z-index: 1;
`;

const MessageLabel = styled.h6`
  font-size: 16px;
  color: #F0F;
  padding: 4px 16px;
`;

const TextInput = styled.input.attrs({
  placeholder: ({ placeholder }) => placeholder,
  disabled: ({ editable }) => !editable,
})`
  background-color: ${({ theme }) => theme.colors.lightGray};
  border: 1.5px solid ${({ theme }) => theme.colors.mediumGray};
  transition: background-color 0.25s, border-color 0.25s;
  font-weight: 500;
  color: #aaa;
  font-size: 18px;
  border-radius: 4px;
  padding: 16px;
  width: 100%;
  height: 52px;
  &:focus {
    background-color: ${({ theme }) => theme.colors.white};
    border-color: ${({ theme }) => theme.colors.affirmative};
    outline: none;
    transform: translate3d(0, 0, 0);
  }
`;

type Props = {
  placeholder: string,
  label: string,
  editable: boolean,
};

const Input = ({ placeholder, label, editable }: Props) => (
  <Wrapper>
    <MessageLabel>
UHUAHD
    </MessageLabel>
    <InputWrapper>
      <TextInput
        placeholder={placeholder}
        editable={editable}
      />
      <InputLabel>
        {label}
      </InputLabel>
    </InputWrapper>
  </Wrapper>

);

export default Input;
