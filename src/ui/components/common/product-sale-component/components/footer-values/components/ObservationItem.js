// @flow

import React, { Fragment } from 'react';

import Input from '../../../../CustomInput';
import RemoveButton from './RemoveButton';

type Props = {
  onTypeValue: Function,
  onRemove: Function,
  entity: string,
  value: string,
  mode: string,
  item: string,
};

const ObservationItem = ({
  onTypeValue,
  onRemove,
  entity,
  value,
  item,
  mode,
}: Props) => (
  <Fragment>
    <Input
      onChange={event => onTypeValue('observation', event.target.value)}
      onBlur={() => {}}
      type="textarea"
      value={value}
      autoFocus
      error=""
      label=""
    />
    <RemoveButton
      onRemove={onRemove}
      entity={entity}
      item={item}
      mode={mode}
    />
  </Fragment>
);

export default ObservationItem;
