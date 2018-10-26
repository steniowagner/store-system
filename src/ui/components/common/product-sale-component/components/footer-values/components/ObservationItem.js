import React, { Fragment } from 'react';

import Input from '../../../../CustomInput';
import RemoveButton from './RemoveButton';

type Props = {
  onTypeValue: Function,
  onRemove: Function,
  entity: string,
  value: string,
  mode: string,
};

const ObservationItem = ({
  onTypeValue,
  onRemove,
  entity,
  value,
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
      canShowButton
      item={value}
      mode={mode}
    />
  </Fragment>
);

export default ObservationItem;
