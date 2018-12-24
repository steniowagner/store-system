// @flow

import React, { Component } from 'react';

import styled from 'styled-components';

import Input from '../../../CustomInput';

const Wrapper = styled.div`
  width: 100%;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px;
  &:hover {
    background-color: ${({ theme }) => theme.colors.lightGray};
  }
`;

const InputWrapper = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const AboutItemWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const IconWrapper = styled.div`
  width: 44px;
  height: 44px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 22px;
  background-color: ${({ theme }) => theme.colors.inputBorder};
`;

const Title = styled.span`
  margin-left: 16px;
  color: ${({ theme }) => theme.colors.darkText};
  font-size: 18px;
  font-weight: 600;
`;

type Props = {
  lastInputFocused: string,
  onType: Function,
  title: string,
  value: string,
  Icon: Object,
  id: string,
};

class FormPaymentItem extends Component<Props, {}> {
  componentWillReceiveProps() {
    const { lastInputFocused, id } = this.props;

    if (lastInputFocused === id) {
      this._inputRef.focus();
    }
  }

  renderInput = (): Object => {
    const { onType, value, id } = this.props;

    return (
      <Input
        inputRef={(input) => {
          this._inputRef = input;
        }}
        value={value}
        onBlur={() => {}}
        onChange={onType}
        placeholder=""
        type="number"
        error=""
        label=""
        id={id}
      />
    );
  };

  renderItemInfo = (): Object => {
    const { title, Icon } = this.props;

    return (
      <AboutItemWrapper>
        <IconWrapper>
          <Icon />
        </IconWrapper>
        <Title>
          {title}
        </Title>
      </AboutItemWrapper>
    );
  };

  render() {
    return (
      <Wrapper>
        {this.renderItemInfo()}
        <InputWrapper>
          {this.renderInput()}
        </InputWrapper>
      </Wrapper>
    );
  }
}

export default FormPaymentItem;
