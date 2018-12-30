// @flow

import React from 'react';

import moment from 'moment';
import 'moment/locale/pt-br';

import styled from 'styled-components';
import Input from '../../../components/common/CustomInput';

const Wrapper = styled.div`
  width: 35%;
`;

type Props = {
  setFieldValue: Function,
  errors: Object,
  values: Object,
  mode: string,
};

const onChangeDateValue = (setFieldValue: Function, validity: string): void => {
  if (validity.length === 10) {
    setFieldValue('validity', validity);
  }
};

const SelectLimitDate = ({
  setFieldValue,
  errors,
  values,
  mode,
}: Props): Object => {
  moment.locale('pt-br');

  const today = moment().format('YYYY-MM-DD');

  return (
    <Wrapper>
      <Input
        onChange={(event: Object) => onChangeDateValue(setFieldValue, event.target.value)}
        inputProps={{ min: today }}
        disabled={mode === 'detail'}
        value={values.validity}
        error={errors.validity}
        label="Validity"
        placeholder=""
        id="validity"
        type="date"
      />
    </Wrapper>
  );
};

export default SelectLimitDate;
