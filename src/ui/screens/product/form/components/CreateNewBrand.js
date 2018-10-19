import React, { Component } from 'react';

import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import styled from 'styled-components';

import ActionButton from '../../../../components/common/ActionButton';
import Input from '../../../../components/common/CustomInput';

const InputWrapper = styled.div`
  width: 60%;
`;

const NewItemButtonWrapper = styled.div`
  width: 40%;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  padding-bottom: ${({ error }) => (error ? 32 : 8)}px;
`;

const Row = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
`;

type Props = {
  onCreateBrand: Function,
  brands: Array<string>,
};

type State = {
  shouldExpandMenu: boolean,
  newBrand: string,
  error: string
};

class CreateNewBrand extends Component<Props, State> {
  state = {
    shouldExpandMenu: false,
    newBrand: '',
    error: '',
  };

  onToggleExpandedMenu = (): void => {
    const { shouldExpandMenu } = this.state;

    this.setState({
      shouldExpandMenu: !shouldExpandMenu,
    });
  };

  onClickAddButton = (): void => {
    const isBrandAlreadyExists = this.checkBrandExists();
    const properCallback = (isBrandAlreadyExists ? this.onCreateError : this.onAddNewBrand);

    properCallback();
  };

  onAddNewBrand = (): void => {
    const { onCreateBrand } = this.props;
    const { newBrand } = this.state;

    this.setState({
      shouldExpandMenu: false,
      newBrand: '',
    }, () => onCreateBrand(newBrand));
  };

  onCreateError = (): void => {
    const { newBrand } = this.state;

    this.setState({
      error: `A Marca '${newBrand}' já foi Cadastrada`,
    });
  };

  onTypeNewBrand = (event: Object): void => {
    this.setState({
      newBrand: event.target.value,
      error: '',
    });
  };

  checkBrandExists = (): boolean => {
    const { newBrand } = this.state;
    const { brands } = this.props;

    const brandIndex = brands.findIndex(brand => brand.toUpperCase() === newBrand.toUpperCase());

    return brandIndex >= 0;
  };

  renderNewItemField = (): Object => {
    const { newBrand, error } = this.state;

    return (
      <Input
        placeholder="Informe o Título da Nova Marca"
        onChange={this.onTypeNewBrand}
        error={error}
        value={newBrand}
        label="Título"
        id="newBrand"
        type="text"
      />
    );
  };

  renderAddButton = (): Object => {
    const { newBrand, error } = this.state;

    return (
      <NewItemButtonWrapper
        error={!!error}
      >
        <ActionButton
          action={this.onClickAddButton}
          disabled={!newBrand}
          title="ADICIONAR"
        />
      </NewItemButtonWrapper>
    );
  };

  render() {
    const { shouldExpandMenu } = this.state;

    return (
      <ExpansionPanel
        onChange={this.onToggleExpandedMenu}
        expanded={shouldExpandMenu}
      >
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
        >
          Cadastrar uma nova Marca
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Row>
            <InputWrapper>
              {this.renderNewItemField()}
            </InputWrapper>
            {this.renderAddButton()}
          </Row>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    );
  }
}

export default CreateNewBrand;
