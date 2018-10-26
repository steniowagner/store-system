// @flow

import React from 'react';

import Button from '@material-ui/core/Button';
import styled from 'styled-components';

const RemoveButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  padding-top: 24px;
`;

type Props = {
  onRemove: Function,
  entity: Object,
  item: any,
  mode: string,
};

const RemoveButton = ({
  onRemove,
  entity,
  item,
  mode,
}: Props): Object => {
  const hasItemSelected = (typeof item === 'object' ? !!item.type : !!item);
  const isOnEditionMode = (mode === 'edit');

  const shouldShowRemoveButton = (isOnEditionMode || hasItemSelected);

  return shouldShowRemoveButton && (
    <RemoveButtonWrapper>
      <Button
        onClick={() => onRemove()}
        variant="outlined"
        color="primary"
        size="large"
      >
        {`REMOVER ${entity}`}
      </Button>
    </RemoveButtonWrapper>
  );
};

export default RemoveButton;
