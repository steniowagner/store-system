import React, { Component } from 'react';

import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';

import styled from 'styled-components';
import Input from '../../../../components/common/CustomInput';

const ChooseItemWrapper = styled.div`
  width: 100%;
  display: flex;
  margin-top: 8px;
  margin-bottom: 32px;
`;

const SearchbButtonWrapper = styled.div`
  margin-left: 16px;
  display: flex;
  padding-bottom: 6px;
  align-items: flex-end;
`;

const InputWrapper = styled.div`
  width: 60%;
`;

type Props = {
  onSelectItem: Function,
  itemSelected: any,
  options: Array<string>,
};

type State = {
  anchorElement: any,
};

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

  renderChooseFiledInput = (): Object => {
    const { itemSelected } = this.props;

    return (
      <Input
        placeholder="Informe o Título da Nova Marca"
        value={itemSelected}
        label="Título"
        type="text"
        id="newItem"
        disabled
        onChange={this.onTypeNewItemField}
      />
    );
  };

  renderMenuList = (dataset: Array<any>, itemSelected: string): Object => {
    const { options } = this.props;

    const renderDefaultOptions = options.map((option, index) => (
      <MenuItem
        onClick={() => this.onSelectMenuItem(index)}
        selected={option === itemSelected}
        key={option}
      >
        {option}
      </MenuItem>
    ));

    const renderEmptyOption = (): Object => (
      <MenuItem
        onClick={() => this.handleCloseMenu()}
        key="empty"
        disabled
      >
        Não existem Marcas cadastradas
      </MenuItem>
    );

    const menuOptions = (dataset.length ? renderDefaultOptions : renderEmptyOption());

    return menuOptions;
  };

  renderMenu = (): Object => {
    const { anchorElement } = this.state;
    const { itemSelected, options } = this.props;

    const isMenuOpen = Boolean(anchorElement);

    const ITEM_LIST_HEIGHT = 48;

    return (
      <Menu
        onClose={this.handleCloseMenu}
        anchorEl={anchorElement}
        open={isMenuOpen}
        id="menu"
        PaperProps={{
          style: {
            maxHeight: ITEM_LIST_HEIGHT * 4.5,
            maxWidth: 500,
          },
        }}
      >
        {this.renderMenuList(options, itemSelected)}
      </Menu>
    );
  };

  render() {
    return (
      <ChooseItemWrapper>
        <InputWrapper>
          {this.renderChooseFiledInput()}
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
