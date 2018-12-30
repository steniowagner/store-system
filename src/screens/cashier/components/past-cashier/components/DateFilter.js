// @flow

import React from 'react';

import Calendar from '@material-ui/icons/CalendarToday';
import styled from 'styled-components';

import Input from '../../../../../components/common/CustomInput';

const Wrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
`;

const InputWrapper = styled.div`
  width: 70%;
`;

const IconWrapper = styled.div`
  width: 44px;
  height: 44px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 16px 10px 0;
  border-radius: 22px;
  background-color: ${({ theme }) => theme.colors.affirmative};
`;

const CalendarIcon = styled(Calendar)`
  color: ${({ theme }) => theme.colors.white};
`;

type Props = {
  onChooseDateToFilter: Function,
  dateFilterValue: string,
};

const renderInput = (onChooseDateToFilter: Function, dateFilterValue: string): Object => (
  <InputWrapper>
    <Input
      placeholder="Select a Date"
      onChange={onChooseDateToFilter}
      onBlur={() => {}}
      error=""
      value={dateFilterValue}
      id="date-filter"
      type="date"
      label="Filter by a Date"
    />
  </InputWrapper>
);

const DateFilter = ({ onChooseDateToFilter, dateFilterValue }: Props): Object => (
  <Wrapper>
    <IconWrapper>
      <CalendarIcon />
    </IconWrapper>
    {renderInput(onChooseDateToFilter, dateFilterValue)}
  </Wrapper>
);

export default DateFilter;
