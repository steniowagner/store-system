// @flow

import React from 'react';

import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Paper from '@material-ui/core/Paper';

import styled from 'styled-components';

const Wrapper = styled(({ ...props }) => (
  <Paper
    {...props}
  />
))`
  margin-top: 4px;
`;

type Props = {
  onSelectOption: Function,
  optionSelected: Object,
  options: Array<Object>,
};

const FilterOptionItem = ({ onSelectOption, optionSelected, options }: Props): Object => (
  <Wrapper>
    <MenuList>
      {options.map(option => (
        <MenuItem
          selected={optionSelected === option.field}
          onClick={() => onSelectOption(option)}
          key={option.field}
        >
          {option.title}
        </MenuItem>
      ))}
    </MenuList>
  </Wrapper>
);

export default FilterOptionItem;
