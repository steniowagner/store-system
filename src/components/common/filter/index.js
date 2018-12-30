// @flow

import React, { Component } from 'react';

import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ButtonBase from '@material-ui/core/ButtonBase';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Popper from '@material-ui/core/Popper';
import Input from '@material-ui/core/Input';
import Paper from '@material-ui/core/Paper';
import Grow from '@material-ui/core/Grow';

import FilterIcon from '@material-ui/icons/FilterList';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ExpandLess from '@material-ui/icons/ExpandLess';

import styled from 'styled-components';

import { filterList, FILTER_TYPES } from '../../../utils/filter';
import DateFilterDialog from './components/DateFilterDialog';

const Container = styled.div`
  display: flex;
`;

const Title = styled.span`
  font-size: 18px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.white};
`;

const FilterSelector = styled(ButtonBase)`
  height: 100%;
  width: 100%;
`;

const FilterSelectorWrapper = styled.div`
  height: 50px;
  border-top-left-radius: 6px;
  border-bottom-left-radius: 6px;
  background-color: ${({ theme }) => theme.colors.affirmative};
`;

const TextInput = styled(Input).attrs({
  placeholder: ({ placeholder }) => placeholder,
  disableUnderline: true,
})`
  width: 100%;
`;

const TextBoxWrapper = styled.div`
  width: 60%;
  height: 50px;
  display: flex;
  justify-content: center;
  padding-left: 14px;
  padding-right: 14px;
  border-top-right-radius: 6px;
  border-bottom-right-radius: 6px;
  border-top: ${({ theme }) => `1.5px solid ${theme.colors.affirmative}`};
  border-right ${({ theme }) => `1.5px solid ${theme.colors.affirmative}`};
  border-bottom ${({ theme }) => `1.5px solid ${theme.colors.affirmative}`};
  background-color: ${({ theme, disabled }) => (disabled ? theme.colors.lightGray : theme.colors.white)};
`;

const ExpandLessIcon = styled(ExpandLess)`
  color: ${({ theme }) => theme.colors.white};
  margin-left: 8px;
`;

const ExpandMoreIcon = styled(ExpandMore)`
  color: ${({ theme }) => theme.colors.white};
  margin-left: 8px;
`;

const SelectorContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-right: 16px;
  margin-left: 16px;
`;

type Props = {
  shouldFilterAfterSelectFilter: boolean,
  filterConfig: Array<Object>,
  onFilterData: Function,
  dataset: Array<any>,
};

type State = {
  isChooseDateDialogOpen: boolean,
  filterButtonLabel: string,
  filterSelected: string,
  filterValue: string,
  isFilterOpen: boolean,
};

class Filter extends Component<Props, State> {
  state = {
    filterButtonLabel: 'Add Filter',
    isChooseDateDialogOpen: false,
    filterSelected: 'ADD_FILTER',
    isFunctionalFilter: false,
    isFilterOpen: false,
    filterValue: '',
  };

  onToggleFilter = (): void => {
    const { isFilterOpen } = this.state;

    this.setState({
      isFilterOpen: !isFilterOpen,
    });
  };

  onToggleDateDialog = (): void => {
    const { isChooseDateDialogOpen } = this.state;

    this.setState({
      isChooseDateDialogOpen: !isChooseDateDialogOpen,
    });
  };

  onFilterAll = (): void => {
    const { onFilterData, dataset } = this.props;

    onFilterData(dataset);
  };

  onResetFilter = (): void => {
    const { onFilterData } = this.props;

    onFilterData([]);
  }

  onFilter = (filterValue: string): Array<Object> => {
    const dataFiltered = this.handleFilterByType(filterValue);

    return dataFiltered;
  };

  onSelectFilter = (filterItem: Object): void => {
    const { shouldFilterAfterSelectFilter } = this.props;
    const { filterSelected, filterValue } = this.state;
    const { filterTitle, dataField } = filterItem;

    if (filterItem.type === FILTER_TYPES.FUNCTIONAL) {
      this.handleFunctionalFilter(filterItem);
      return;
    }

    if (filterItem.type === FILTER_TYPES.DATE.ID) {
      this.setState({
        isChooseDateDialogOpen: true,
        isFilterOpen: false,
      });
    }

    const isDifferentFilter = (filterSelected !== dataField);
    const shouldResetItemsFiltered = (!shouldFilterAfterSelectFilter && isDifferentFilter && (dataField !== 'all'));
    const filterButtonLabel = (dataField === 'all' ? 'Mostrar todos' : `${filterTitle}`);

    if (isDifferentFilter) {
      this.onFilterAll();
    }

    if (shouldResetItemsFiltered) {
      this.onResetFilter();
    }

    this.setState({
      filterValue: (filterSelected === dataField ? filterValue : ''),
      isFunctionalFilter: false,
      filterSelected: dataField,
      isFilterOpen: false,
      filterButtonLabel,
    });
  };

  onChangeFilterValue = (filterValue: string): void => {
    const { shouldFilterAfterSelectFilter, onFilterData } = this.props;

    const filterResult = this.onFilter(filterValue);
    const shouldResetItemsFiltered = (!shouldFilterAfterSelectFilter && !filterValue);
    const properCallback = (shouldResetItemsFiltered ? this.onResetFilter : onFilterData);

    this.setState({
      filterValue,
    }, () => properCallback(filterResult));
  };

  getTextInputPlaceholder = (): string => {
    const { filterSelected } = this.state;

    const isAllFilterSelected = (filterSelected === 'all');
    if (isAllFilterSelected) {
      return 'THIS IS ALL RECORDS';
    }

    const isInitialPlaceholder = (filterSelected === 'ADD_FILTER');
    if (isInitialPlaceholder) {
      return 'CHOOSE A FILTER TO SEARCH THE DESIRED INFORMATION';
    }

    const filterSelectedConfig = this.getFilterSelectedConfig();
    const { placeholder } = filterSelectedConfig;

    return placeholder.toUpperCase();
  };

  getFilterSelectedConfig = (): Object => {
    const { filterSelected } = this.state;
    const { filterConfig } = this.props;

    const filterSelectedIndex = filterConfig.findIndex(filter => filter.dataField === filterSelected);

    return filterConfig[filterSelectedIndex];
  }

  handleFilterByType = (filterValue: string) => {
    const { filterSelected } = this.state;

    const filterSelectedConfig = this.getFilterSelectedConfig();
    const { type } = filterSelectedConfig;

    let dataFiltered = [];

    if (type === FILTER_TYPES.NUMERIC) {
      dataFiltered = this.handleNumericFilter(filterSelected, filterSelectedConfig, filterValue);
    }

    if (type === FILTER_TYPES.TEXT) {
      dataFiltered = this.handleTextFilter(filterSelected, filterValue);
    }

    if (type === FILTER_TYPES.DATE.ID) {
      dataFiltered = this.handleDateFilter(filterSelected, filterValue);
    }

    return dataFiltered;
  };

  handleFunctionalFilter = (filterConfig: Object): void => {
    const {
      filterTitle,
      filterLabel,
      dataField,
      behavior,
    } = filterConfig;

    const { onFilterData, dataset } = this.props;

    const filterParams = {
      type: FILTER_TYPES.FUNCTIONAL,
      behavior,
      dataset,
    };

    const data = filterList(filterParams);

    this.setState({
      filterButtonLabel: filterTitle,
      filterSelected: dataField,
      filterValue: filterLabel,
      isFunctionalFilter: true,
      isFilterOpen: false,
    }, () => onFilterData(data));
  };

  handleDateFilter = (filterSelected: Object, filterValue: string): Array<Object> => {
    const { dataset } = this.props;

    const filterParams = {
      type: FILTER_TYPES.DATE.ID,
      value: filterValue,
      filterSelected,
      dataset,
    };

    return filterList(filterParams);
  };

  handleNumericFilter = (filterSelected: string, filterConfig: Object, filterValue: string): Array<Object> => {
    const { dataset } = this.props;

    const filterParams = {
      operator: filterConfig.operator,
      type: FILTER_TYPES.NUMERIC,
      filter: filterSelected,
      value: filterValue,
      dataset,
    };

    return filterList(filterParams);
  };

  handleTextFilter = (filterSelected: string, filterValue: string): Array<Object> => {
    const { dataset } = this.props;

    const filterParams = {
      type: FILTER_TYPES.TEXT,
      filter: filterSelected,
      value: filterValue,
      dataset,
    };

    return filterList(filterParams);
  };

  renderMenuItems = (): Object => {
    const { filterSelected } = this.state;
    const { filterConfig } = this.props;

    const extraFilter = [{
      filterTitle: 'Show All',
      dataField: 'all',
    }, {
      filterTitle: 'FILTER BY',
      dataField: '$',
    }];

    const data = [...extraFilter, ...filterConfig];

    const FilterItem = (
      <MenuItem
        key="$"
        disabled
      >
        <ListItemIcon>
          <FilterIcon />
        </ListItemIcon>
        <ListItemText
          primary="FILTER BY"
          inset
        />
      </MenuItem>
    );

    return (
      <MenuList>
        {data.map(item => (
          item.dataField === '$'
            ? FilterItem
            : (
              <MenuItem
                selected={filterSelected === item.dataField}
                onClick={() => this.onSelectFilter(item)}
                key={item.filterTitle}
              >
                {item.filterTitle}
              </MenuItem>
            )
        ))}
      </MenuList>
    );
  };

  renderSelector = (): Object => {
    const { filterButtonLabel, isFilterOpen } = this.state;

    return (
      <FilterSelectorWrapper>
        <FilterSelector
          aria-owns={isFilterOpen ? 'menu-list-grow' : null}
          onClick={() => this.onToggleFilter()}
          buttonRef={(node) => {
            this.anchorEl = node;
          }}
          aria-haspopup="true"
          variant="contained"
        >
          <SelectorContent>
            <Title>
              {filterButtonLabel.toUpperCase()}
            </Title>
            {isFilterOpen ? <ExpandLessIcon /> : <ExpandMoreIcon /> }
          </SelectorContent>
        </FilterSelector>
      </FilterSelectorWrapper>
    );
  };

  renderFilterMenu = (): Object => {
    const { isFilterOpen } = this.state;

    return (
      <Popper
        anchorEl={this.anchorEl}
        open={isFilterOpen}
        placement="bottom"
        disablePortal
        transition
      >
        {({ TransitionProps }) => (
          <Grow
            {...TransitionProps}
            id="menu-list-grow"
          >
            <Paper>
              <ClickAwayListener
                onClickAway={this.onToggleFilter}
              >
                {this.renderMenuItems()}
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    );
  };

  renderFilterInput = (): Object => {
    const { isFunctionalFilter, filterSelected, filterValue } = this.state;

    const isFilterSelectedDateType = (
      filterSelected === FILTER_TYPES.DATE.WHEN.BEFORE
      || filterSelected === FILTER_TYPES.DATE.WHEN.AFTER
      || filterSelected === FILTER_TYPES.DATE.WHEN.SAME
    );

    const isInputDisabled = (isFilterSelectedDateType || filterSelected === 'ADD_FILTER' || filterSelected === 'all' || isFunctionalFilter);

    return (
      <TextBoxWrapper
        disabled={isInputDisabled}
      >
        <TextInput
          onChange={event => this.onChangeFilterValue(event.target.value)}
          placeholder={this.getTextInputPlaceholder()}
          disabled={isInputDisabled}
          value={filterValue || ''}
        />
      </TextBoxWrapper>
    );
  };

  renderDateDialog = (): Object => {
    const { isChooseDateDialogOpen } = this.state;
    const { onFilterData } = this.props;

    const onChooseDate = (date: string): void => {
      this.setState({
        isChooseDateDialogOpen: false,
        filterValue: date,
      }, () => {
        const dataset = this.onFilter(date);
        onFilterData(dataset);
      });
    };

    return (
      <DateFilterDialog
        isChooseDateDialogOpen={isChooseDateDialogOpen}
        onToggleDateDialog={this.onToggleDateDialog}
        onChooseDate={date => onChooseDate(date)}
      />
    );
  };

  render() {
    return (
      <Container>
        {this.renderSelector()}
        {this.renderFilterMenu()}
        {this.renderFilterInput()}
        {this.renderDateDialog()}
      </Container>
    );
  }
}

export default Filter;
