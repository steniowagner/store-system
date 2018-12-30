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

const getProperInputColor = (theme: Object, isFormOnDetailMode: boolean): string => {
  const color = (isFormOnDetailMode ? theme.colors.customInactiveButton : theme.colors.affirmative);

  return color;
};

const InputWrapper = styled.div`
  width: 100%;
  height: 48px;
  padding: 0 16px;
  display: flex;
  border-top: 1.5px solid ${({ theme, isFormDetailMode }) => getProperInputColor(theme, isFormDetailMode)};
  border-right: 1.5px solid ${({ theme, isFormDetailMode }) => getProperInputColor(theme, isFormDetailMode)};
  border-bottom: 1.5px solid ${({ theme, isFormDetailMode }) => getProperInputColor(theme, isFormDetailMode)};
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  background-color: ${({ disabled, theme }) => (disabled ? theme.colors.lightGray : theme.colors.white)};
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
  background-color: ${({ theme, isFormDetailMode }) => getProperInputColor(theme, isFormDetailMode)};
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
  field: 'barcode',
  title: 'Barcode',
}, {
  field: 'description',
  title: 'Description',
}];

type Props = {
  onTypeFilterValue: Function,
  onSelectOption: Function,
  optionSelected: Object,
  filterValue: string,
  refFocus: string,
  mode: string,
};

type State = {
  isFilterOptionsMenuOpen: boolean,
};

class CustomFilter extends Component<Props, State> {
  state = {
    isFilterOptionsMenuOpen: false,
  };

  componentWillReceiveProps(nextProps) {
    const { refFocus } = nextProps;

    if (refFocus === 'filterInput') {
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
    const { onSelectOption, optionSelected, mode } = this.props;

    const { title, field } = optionSelected;

    const ProperIcon = (isFilterOptionsMenuOpen ? ExapandLessIcon : ExapandMoreIcon);

    return (
      <FilterSelector
        onClick={this.onToggleFilterMenu}
        disabled={(mode === 'detail')}
        aria-haspopup="true"
        variant="contained"
      >
        <FilteWrapper>
          <FilterButtonContent
            isFormDetailMode={(mode === 'detail')}
          >
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
  };

  render() {
    const {
      onTypeFilterValue,
      optionSelected,
      filterValue,
      mode,
    } = this.props;

    return (
      <Wrapper>
        {this.renderMenuOptionsButton()}
        <InputWrapper
          isFormDetailMode={(mode === 'detail')}
          disabled={!optionSelected.field}
        >
          <Input
            inputRef={(input) => { this._inputRef = input; }}
            placeholder="Select a Filter"
            disabled={!optionSelected.field}
            onChange={onTypeFilterValue}
            value={filterValue}
            disableUnderline
            fullWidth
          />
        </InputWrapper>
      </Wrapper>
    );
  }
}

export default CustomFilter;
