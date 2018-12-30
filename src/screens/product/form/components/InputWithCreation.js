// @flow

import React, { Component, Fragment } from 'react';

import styled from 'styled-components';

import ActionButton from '../../../../components/common/ActionButton';
import Input from '../../../../components/common/CustomInput';
import DialogChooseItem from './DialogChooseItem';

const InputWithButtonWrapper = styled.div`
  width: 48%;
  display: flex;
`;

const InputButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  margin-left: 8px;
  padding-bottom: ${({ hasError }) => (hasError ? 29 : 8)}px;
`;

const InputWrapper = styled.div`
  width: 100%;
`;

type Props = {
  setFieldValue: Function,
  onCreateItem: Function,
  dataset: Array<any>,
  fieldData: Object,
  errors: Object,
  values: Object,
  item: Object,
  mode: string,
  id: string,
};

type State = {
  isDialogChooseItemOpen: boolean,
  dialogConfig: Object,
};

class InputWithCreation extends Component<Props, State> {
  state = {
    isDialogChooseItemOpen: false,
  };

  componentDidMount() {
    const { setFieldValue, item, id } = this.props;

    setFieldValue([id], item[id]);
  }

  onToggleDialogChooseItem = (): void => {
    const { isDialogChooseItemOpen } = this.state;

    this.setState({
      isDialogChooseItemOpen: !isDialogChooseItemOpen,
    });
  };

  onSetItemIntoForm = (item: string): void => {
    const { setFieldValue, id } = this.props;

    setFieldValue([id], item);

    this.onToggleDialogChooseItem();
  };

  renderChoiceInputItem = (field: Object): Object => {
    const {
      errors,
      values,
      mode,
    } = this.props;

    const isTitleEdit = (mode === 'edit' || values[field.id].name);
    const buttonTitle = (isTitleEdit ? 'EDIT' : 'ADD');

    return (
      <InputWithButtonWrapper>
        <InputWrapper>
          <Input
            value={values[field.id].name || ''}
            placeholder={field.placeholder}
            error={errors[field.id]}
            label={field.label}
            id={field.id}
            type="text"
            disabled
          />
        </InputWrapper>
        <InputButtonWrapper
          hasError={errors[field.id]}
        >
          <ActionButton
            action={() => this.onToggleDialogChooseItem()}
            disabled={mode === 'detail'}
            title={buttonTitle}
            withIcon={false}
          />
        </InputButtonWrapper>
      </InputWithButtonWrapper>
    );
  };

  renderDialog = (): Object => {
    const { isDialogChooseItemOpen } = this.state;

    const {
      onCreateItem,
      dataset,
      values,
      mode,
      id,
    } = this.props;

    const itemSelected = values[id];

    const Dialog = (
      <DialogChooseItem
        onToggleDialog={this.onToggleDialogChooseItem}
        onSetItem={this.onSetItemIntoForm}
        isOpen={isDialogChooseItemOpen}
        onCreateItem={onCreateItem}
        itemSelected={itemSelected}
        dataset={dataset}
        entity={id}
        mode={mode}
      />
    );

    return (dataset ? Dialog : null);
  };

  render() {
    const { fieldData } = this.props;

    return (
      <Fragment>
        {this.renderChoiceInputItem(fieldData)}
        {this.renderDialog()}
      </Fragment>
    );
  }
}

export default InputWithCreation;
