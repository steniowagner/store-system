// @flow

import React from 'react';

import Button from '@material-ui/core/Button';
import styled from 'styled-components';

const FilePathButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 24px;
  margin-right: 16px;
`;

type Props = {
  isDisabled: boolean,
  action: Function,
  message: string,
  Icon: Object,
};

const ButtonAction = ({
  isDisabled,
  message,
  action,
  Icon,
}: Props): Object => (
  <FilePathButtonWrapper>
    <Button
      disabled={isDisabled}
      variant="contained"
      onClick={action}
      color="primary"
    >
      <Icon />
      {message}
    </Button>
  </FilePathButtonWrapper>
);

export default ButtonAction;
