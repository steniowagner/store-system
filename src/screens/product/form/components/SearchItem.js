// @flow

import React, { Component } from 'react';

import SearchIcon from '@material-ui/icons/Search';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';

import styled from 'styled-components';

import Input from '../../../../components/common/CustomInput';

const ChooseItemWrapper = styled.div`
  width: 100%;
  display: flex;
  margin-top: 8px;
`;

const SearchbButtonWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  margin-left: 16px;
  padding-bottom: 6px;
`;

const InputWrapper = styled.div`
  width: 60%;
`;

type Props = {
  onSelectItem: Function,
  options: Array<Object>,
  itemSelected: Object,
  entity: string,
};

type State = {
  anchorElement: any,
};

const ITEM_LIST_HEIGHT = 48;

class SearchInput extends Component<Props, State> {
  state = {
    anchorElement: null,
  };

  onClickSearchButton = (event: Object): void => {
    this.setState({
      anchorElement: event.currentTarget,
    });
  };

  onSelectMenuItem = (index: number): void => {
    const { onSelectItem } = this.props;

    this.handleCloseMenu();

    onSelectItem(index);
  };

  handleCloseMenu = (): void => {
    this.setState({
      anchorElement: null,
    });
  };

  renderChooseFileInput = (): Object => {
    const { itemSelected, entity } = this.props;

    const entities = {
      brand: 'a Brand',
    };

    const entityTitle = entities[entity];

    const placeholder = `Select ${entityTitle}`;

    return (
      <Input
        placeholder={placeholder}
        value={itemSelected.name || ''}
        id="newItem"
        type="text"
        disabled
        label=""
      />
    );
  };

  renderMenuList = (dataset: Array<Object>, itemSelected: Object): Object => {
    const { options, entity } = this.props;

    const renderDefaultOptions = options.map((option, index) => (
      <MenuItem
        onClick={() => this.onSelectMenuItem(index)}
        selected={option.name === itemSelected.name}
        key={option.name}
      >
        {option.name}
      </MenuItem>
    ));

    const entities = {
      brand: 'Brands',
    };

    const emptyOptionEntity = entities[entity];

    const renderEmptyOption = (): Object => (
      <MenuItem
        onClick={() => this.handleCloseMenu()}
        key="empty"
        disabled
      >
        {`There is no ${emptyOptionEntity} registered`}
      </MenuItem>
    );

    const menuOptions = (dataset.length ? renderDefaultOptions : renderEmptyOption());

    return menuOptions;
  };

  renderMenu = (): Object => {
    const { itemSelected, options } = this.props;
    const { anchorElement } = this.state;

    const isMenuOpen = Boolean(anchorElement);

    return (
      <Menu
        PaperProps={{
          style: {
            maxHeight: ITEM_LIST_HEIGHT * 4.5,
            maxWidth: 500,
          },
        }}
        onClose={this.handleCloseMenu}
        anchorEl={anchorElement}
        open={isMenuOpen}
        id="menu"
      >
        {this.renderMenuList(options, itemSelected)}
      </Menu>
    );
  };

  render() {
    return (
      <ChooseItemWrapper>
        <InputWrapper>
          {this.renderChooseFileInput()}
        </InputWrapper>
        <SearchbButtonWrapper>
          <Button
            onClick={this.onClickSearchButton}
            aria-label="Add"
            color="primary"
            variant="fab"
          >
            <SearchIcon />
          </Button>
          {this.renderMenu()}
        </SearchbButtonWrapper>
      </ChooseItemWrapper>
    );
  }
}

export default SearchInput;
