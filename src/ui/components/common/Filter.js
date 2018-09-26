// @flow

import React, { Component } from 'react';

import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from '@material-ui/core/Typography';
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
import filterUtils from '../../utils/filter';

const Container = styled.div`
  width: 65%;
  display: flex;
  flex-direction: row;
  margin-top: 24px;
  margin-bottom: 24px;
`;

const FilterSelector = styled(ButtonBase)`
  height: 100%;
  width: 100%;
`;

const FilterSelectorWrapper = styled.div`
  width: 25%;
  height: 50px;
  border-top-left-radius: 6px;
  border-bottom-left-radius: 6px;
  background-color: ${({ theme }) => theme.colors.affirmative};
`;

const FilterSelectTextWrapper = styled.div`
  width: 85%;
  height: 100%;
`;

const ExapandIconWrapper = styled.div`
  width: 15%;
  height: 100%;
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
`;

const ExpandMoreIcon = styled(ExpandMore)`
  color: ${({ theme }) => theme.colors.white};
`;

type Props = {
  filterConfig: Array<Object>,
  dataset: Array<any>,
  onFilterData: Function,
};

type State = {
  filterButtonLabel: string,
  filterSelected: string,
  filterValue: string,
  isFilterOpen: boolean,
};

class Filter extends Component<Props, State> {
  state = {
    filterButtonLabel: 'Adicionar Filtro',
    filterSelected: 'ADD_FILTER',
    isFilterOpen: false,
    filterValue: '',
  };

  onToggleFilter = (): void => {
    const { isFilterOpen } = this.state;

    this.setState({
      isFilterOpen: !isFilterOpen,
    });
  };

  onFilterAll = (): void => {
    const { onFilterData, dataset } = this.props;

    onFilterData(dataset);
  };

  onFilter = (filterValue: string): Array<Object> => {
    const { filterSelected } = this.state;
    const { dataset } = this.props;

    const filterParams = {
      filter: filterSelected,
      value: filterValue,
      dataset,
    };

    const dataFiltered = filterUtils(filterParams);

    return dataFiltered;
  };

  onSelectFilter = (filterItem: Object): void => {
    const { filterSelected, filterValue } = this.state;
    const { filterTitle, dataField } = filterItem;

    const filterButtonLabel = (dataField === 'all' ? 'Mostrar todos' : `${filterTitle}`);

    if (filterSelected !== dataField) {
      this.onFilterAll();
    }

    this.setState({
      filterValue: (filterSelected === dataField ? filterValue : ''),
      filterSelected: dataField,
      isFilterOpen: false,
      filterButtonLabel,
    });
  };

  onChangeFilterValue = (filterValue: string): void => {
    const { onFilterData } = this.props;

    const filterResult = this.onFilter(filterValue);

    this.setState({
      filterValue,
    }, () => onFilterData(filterResult));
  };

  getTextInputPlaceholder = (): string => {
    const { filterSelected, filterButtonLabel } = this.state;

    const isAllFilterSelected = (filterSelected === 'all');
    if (isAllFilterSelected) {
      return 'ESTES SÃO TODOS OS REGISTROS CADASTRADOS';
    }

    const isInitialPlaceholder = (filterSelected === 'ADD_FILTER');
    if (isInitialPlaceholder) {
      return 'ESCOLHA UM FILTRO PARA FILTRAR OS DADOS';
    }

    return `DIGITE O/A ${filterButtonLabel.toUpperCase()} QUE DESEJA BUSCAR`;
  };

  renderMenuItems = (): Object => {
    const { filterSelected } = this.state;
    const { filterConfig } = this.props;

    const extraFilter = [{
      filterTitle: 'Mostrar todos',
      dataField: 'all',
    }, {
      filterTitle: 'FILTRAR POR',
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
          primary="FILTRAR POR"
          inset
        />
      </MenuItem>
    );

    return (
      <MenuList>
        {
          data.map(item => (
            item.dataField === '$'
              ? FilterItem
              : (
                <MenuItem
                  onClick={() => this.onSelectFilter(item)}
                  selected={filterSelected === item.dataField}
                  key={item.dataField}
                >
                  {item.filterTitle}
                </MenuItem>
              )
          ))
        }
      </MenuList>
    );
  };

  renderSelector = (isFilterOpen: boolean): Object => {
    const { filterButtonLabel } = this.state;

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
          <FilterSelectTextWrapper>
            <Typography
              variant="subheading"
              color="secondary"
            >
              {filterButtonLabel.toUpperCase()}
            </Typography>
          </FilterSelectTextWrapper>
          <ExapandIconWrapper>
            {isFilterOpen ? <ExpandLessIcon /> : <ExpandMoreIcon /> }
          </ExapandIconWrapper>
        </FilterSelector>
      </FilterSelectorWrapper>
    );
  };

  renderFilterMenu = (isFilterOpen: boolean): Object => (
    <Popper
      anchorEl={this.anchorEl}
      open={isFilterOpen}
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

  render() {
    const { isFilterOpen, filterSelected, filterValue } = this.state;
    const isInputDisabled = (filterSelected === 'ADD_FILTER' || filterSelected === 'all');

    return (
      <Container>
        {this.renderSelector(isFilterOpen)}
        {this.renderFilterMenu(isFilterOpen)}
        <TextBoxWrapper
          disabled={isInputDisabled}
        >
          <TextInput
            onChange={event => this.onChangeFilterValue(event.target.value)}
            placeholder={this.getTextInputPlaceholder()}
            disabled={isInputDisabled}
            value={filterValue}
          />
        </TextBoxWrapper>
      </Container>
    );
  }
}

export default Filter;
