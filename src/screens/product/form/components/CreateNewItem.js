import React, { Component } from 'react';

import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import styled from 'styled-components';

import ActionButton from '../../../../components/common/ActionButton';
import Input from '../../../../components/common/CustomInput';

const Wrapper = styled.div`
  margin-top: 32px;
`;

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
  onCreateItem: Function,
  dataset: Array<string>,
  placeholder: string,
  panelTitle: string,
  entity: string,
};

type State = {
  shouldExpandMenu: boolean,
  newItem: string,
  error: string
};

class CreateNewItem extends Component<Props, State> {
  state = {
    shouldExpandMenu: false,
    newItem: '',
    error: '',
  };

  onTypeInputField = (event: Object) => {
    this.setState({
      newItem: event.target.value,
      error: '',
    });
  };

  onToggleExpandedMenu = (): void => {
    const { shouldExpandMenu } = this.state;

    this.setState({
      shouldExpandMenu: !shouldExpandMenu,
    });
  };

  onClickAddButton = (): void => {
    const isItemAlreadyExists = this.checkItemAlreadyExists();
    const properCallback = (isItemAlreadyExists ? this.onCreateError : this.onAddNewItem);

    properCallback();
  };

  onAddNewItem = (): void => {
    const { onCreateItem } = this.props;
    const { newItem } = this.state;

    this.setState({
      shouldExpandMenu: false,
      newItem: '',
    }, () => onCreateItem({ name: newItem }));
  };

  onCreateError = (): void => {
    const { newItem } = this.state;
    const { entity } = this.props;

    const errors = {
      brand: `The Brand '${newItem}' has already been registered.`,
    };

    this.setState({
      error: errors[entity],
    });
  };

  checkItemAlreadyExists = (): boolean => {
    const { newItem } = this.state;
    const { dataset } = this.props;

    const itemIndex = dataset.findIndex(item => item.name.toUpperCase() === newItem.toUpperCase());

    return itemIndex >= 0;
  };

  renderNewItemInputField = (): Object => {
    const { newItem, error } = this.state;
    const { placeholder } = this.props;

    return (
      <Input
        placeholder={placeholder}
        onChange={this.onTypeInputField}
        value={newItem}
        error={error}
        label=""
        id="newItem"
        type="text"
      />
    );
  };

  renderAddButton = (): Object => {
    const { newItem, error } = this.state;

    return (
      <NewItemButtonWrapper
        error={!!error}
      >
        <ActionButton
          action={this.onClickAddButton}
          disabled={!newItem}
          title="Add"
          withIcon
        />
      </NewItemButtonWrapper>
    );
  };

  render() {
    const { shouldExpandMenu } = this.state;
    const { panelTitle } = this.props;

    return (
      <Wrapper>
        <ExpansionPanel
          onChange={this.onToggleExpandedMenu}
          expanded={shouldExpandMenu}
        >
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
          >
            {panelTitle}
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Row>
              <InputWrapper>
                {this.renderNewItemInputField()}
              </InputWrapper>
              {this.renderAddButton()}
            </Row>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </Wrapper>
    );
  }
}

export default CreateNewItem;
