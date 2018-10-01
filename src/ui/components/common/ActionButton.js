import React from 'react';
import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from '@material-ui/core/Typography';
import AddCircleOutline from '@material-ui/icons/AddCircleOutline';

import styled from 'styled-components';

const ButtonContainer = styled(ButtonBase)``;

const ButtonWrapper = styled.div`
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px 10px 20px;
  border-radius: 6px;
  background-color: ${({ theme }) => theme.colors.affirmative};
`;

type Props = {
  action: Function,
  title: string,
};

const ActionButton = ({ title, action }: Props): Obejct => (
  <ButtonContainer
    onClick={() => action()}
  >
    <ButtonWrapper>
      <AddCircleOutline
        style={{
          color: '#fff',
          marginRight: 12,
          fontSize: 28,
        }}
      />
      <Typography
        variant="subheading"
        color="secondary"
      >
        {title}
      </Typography>
    </ButtonWrapper>
  </ButtonContainer>
);

export default ActionButton;
