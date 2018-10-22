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
  options: Array<string>,
  itemSelected: any,
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

  onClickSearchButton = (event): void => {
    this.setState({
      anchorElement: event.currentTarget,
    });
  };

  onSelectMenuItem = (index): void => {
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
      manufacturer: 'o Fabricante',
      category: 'a Categoria',
      brand: 'a Marca',
    };

    const entityTitle = entities[entity];

    const placeholder = `Selecione ${entityTitle}`;

    return (
      <Input
        placeholder={placeholder}
        value={itemSelected}
        id="newItem"
        type="text"
        disabled
        label=""
      />
    );
  };

  renderMenuList = (dataset: Array<any>, itemSelected: string): Object => {
    const { options, entity } = this.props;

    const renderDefaultOptions = options.map((option, index) => (
      <MenuItem
        onClick={() => this.onSelectMenuItem(index)}
        selected={option === itemSelected}
        key={option}
      >
        {option}
      </MenuItem>
    ));

    const entities = {
      manufacturer: 'Fabricantes',
      category: 'Categorias',
      brand: 'Marcas',
    };

    const emptyOptionEntity = entities[entity];

    const renderEmptyOption = (): Object => (
      <MenuItem
        onClick={() => this.handleCloseMenu()}
        key="empty"
        disabled
      >
        {`Não existem ${emptyOptionEntity} cadastradas`}
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
