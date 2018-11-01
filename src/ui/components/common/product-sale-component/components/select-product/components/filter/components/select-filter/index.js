// @flow

import React, { Component } from 'react';

import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ButtonBase from '@material-ui/core/ButtonBase';
import Input from '@material-ui/core/Input';

import styled from 'styled-components';

import FilterOptionItem from './FilterOptionItem';

const Wrapper = styled.div`
  width: 100%;
  height: 48px;
  display: flex;
`;

const FilteWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const CustomInput = styled(({ ...props }) => (
  <Input
    disableUnderline
    {...props}
    autoFocus
    fullWidth
  />
))``;

const InputWrapper = styled.div`
  width: 100%;
  height: 48px;
  padding: 0 16px;
  display: flex;
  border-top: 1.5px solid ${({ theme }) => theme.colors.affirmative};
  border-right: 1.5px solid ${({ theme }) => theme.colors.affirmative};
  border-bottom: 1.5px solid ${({ theme }) => theme.colors.affirmative};
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  background-color: ${({ theme }) => theme.colors.white};
`;

const FilterSelector = styled(({ ...props }) => (
  <ButtonBase
    {...props}
  />
))`
width: 40%;`;

const FilterButtonContent = styled.div`
  width: 100%;
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.affirmative}
  border-top-left-radius: 6px;
  border-bottom-left-radius: 6px;
`;

const FilterSelectedText = styled.span`
  margin-right: 8px;
  font-size: 18px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.white};
`;

const IconWrapper = styled.div`
  display: flex;
`;

const ExapandMoreIcon = styled(ExpandMore)`
  color: ${({ theme }) => theme.colors.white};
`;

const ExapandLessIcon = styled(ExpandLess)`
  color: ${({ theme }) => theme.colors.white};
`;

const FILTER_OPTIONS = [{
  field: 'barCode',
  title: 'Código de Barras',
}, {
  field: 'description',
  title: 'Descrição',
}];

type Props = {
  onTypeFilterValue: Function,
  onSelectOption: Function,
  optionSelected: Object,
  filterValue: string,
};

type State = {
  isFilterOptionsMenuOpen: boolean,
};

class CustomFilter extends Component<Props, State> {
  state = {
    isFilterOptionsMenuOpen: false,
  };

  componentWillReceiveProps(nextProps) {
    const { filterValue } = nextProps;

    if (!filterValue) {
      this._inputRef.focus();
    }
  }

  onToggleFilterMenu = (): void => {
    const { isFilterOptionsMenuOpen } = this.state;

    this.setState({
      isFilterOptionsMenuOpen: !isFilterOptionsMenuOpen,
    });
  };

  renderMenuOptionsButton = (): Object => {
    const { isFilterOptionsMenuOpen } = this.state;
    const { onSelectOption, optionSelected } = this.props;

    const { title, field } = optionSelected;

    const ProperIcon = (isFilterOptionsMenuOpen ? ExapandLessIcon : ExapandMoreIcon);

    return (
      <FilterSelector
        onClick={this.onToggleFilterMenu}
        aria-haspopup="true"
        variant="contained"
      >
        <FilteWrapper>
          <FilterButtonContent>
            <FilterSelectedText>
              {title.toUpperCase()}
            </FilterSelectedText>
            <IconWrapper>
              <ProperIcon />
            </IconWrapper>
          </FilterButtonContent>
          {isFilterOptionsMenuOpen && (
            <FilterOptionItem
              onSelectOption={onSelectOption}
              options={FILTER_OPTIONS}
              optionSelected={field}
            />
          )}
        </FilteWrapper>
      </FilterSelector>
    );
  }

  render() {
    const { onTypeFilterValue, filterValue } = this.props;

    return (
      <Wrapper>
        {this.renderMenuOptionsButton()}
        <InputWrapper>
          <CustomInput
            inputRef={(input) => { this._inputRef = input; }}
            onChange={onTypeFilterValue}
            value={filterValue}
          />
        </InputWrapper>
      </Wrapper>
    );
  }
}

export default CustomFilter;
