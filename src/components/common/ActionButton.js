// @flow

import React from 'react';

import AddCircleOutline from '@material-ui/icons/AddCircleOutline';
import ButtonBase from '@material-ui/core/ButtonBase';

import styled from 'styled-components';

const ButtonContainer = styled(ButtonBase)``;

const ButtonWrapper = styled.div`
  height: 50px;
  display: flex;
  flex: 1;
  justify-content: space-between;
  align-items: center;
  padding-left: 20px;
  padding-right: 20px;
  border-radius: 6px;
  background-color: ${({
    withCustomInactiveColor,
    withCustomColor,
    customColor,
    isDisabled,
    theme,
  }) => {
    let color = theme.colors.affirmative;

    const disabledColor = (withCustomInactiveColor ? theme.colors.customInactiveButton : theme.colors.lightGray);

    if (isDisabled) {
      color = disabledColor;
    }

    if (withCustomColor) {
      color = customColor;
    }

    return color;
  }};
`;

const Title = styled.h2`
  margin-right: 18px,
  font-size: 28px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.white};
`;

type Props = {
  withCustomInactiveColor: ?boolean,
  withCustomColor: ?boolean,
  withCustomIcon: ?boolean,
  customColor: ?string,
  CustomIcon: ?Object,
  disabled: boolean,
  withIcon: boolean,
  action: Function,
  title: string,
};

const ActionButton = ({
  withCustomInactiveColor,
  withCustomIcon,
  withCustomColor,
  customColor,
  CustomIcon,
  withIcon,
  disabled,
  action,
  title,
}: Props): Obejct => (
  <ButtonContainer
    onClick={() => action()}
    disabled={disabled}
  >
    <ButtonWrapper
      withCustomInactiveColor={withCustomInactiveColor}
      withCustomColor={withCustomColor}
      customColor={customColor}
      isDisabled={disabled}
    >
      {withIcon && (
        <AddCircleOutline
          style={{
            color: '#fff',
            marginRight: 18,
            fontSize: 28,
          }}
        />
      )}
      {withCustomIcon && (
        <CustomIcon
          style={{
            color: '#fff',
            marginRight: 18,
            fontSize: 28,
          }}
        />
      )}
      <Title>
        {title.toUpperCase()}
      </Title>
    </ButtonWrapper>
  </ButtonContainer>
);

export default ActionButton;
