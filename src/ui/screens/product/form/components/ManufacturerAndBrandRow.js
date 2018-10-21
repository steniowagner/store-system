// @flow

import React, { Component } from 'react';

import styled from 'styled-components';

import ActionButton from '../../../../components/common/ActionButton';
import { Row } from '../../../../components/common/FormUtils';
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
  manufacturers: Array<Object>,
  brands: Array<Object>,
  getRowItemObject: Function,
  onCreateBrand: Function,
  setFieldValue: Function,
  errors: Object,
  values: Object,
  item: Object,
  mode: string,
};

type State = {
  isDialogChooseItemOpen: boolean,
  dialogConfig: Object,
};

class ManufacturerAndBrandRow extends Component<Props, State> {
  state = {
    isDialogChooseItemOpen: false,
    dialogConfig: {},
  };

  componentDidMount() {
    const { setFieldValue, item } = this.props;

    setFieldValue('manufacturer', item.manufacturer);
    setFieldValue('brand', item.brand);
  }

  onToggleDialogChooseItem = (): void => {
    const { isDialogChooseItemOpen } = this.state;

    this.setState({
      isDialogChooseItemOpen: !isDialogChooseItemOpen,
    });
  };

  onSetBrand = (brand: string): void => {
    const { setFieldValue } = this.props;

    setFieldValue('brand', brand);

    this.onToggleDialogChooseItem();
  };

  onSetManufacturer = (manufacturer: string): void => {
    const { setFieldValue } = this.props;

    setFieldValue('manufacturer', manufacturer);

    this.onToggleDialogChooseItem();
  };

  setDialogConfig = (entity: string): void => {
    const { isDialogChooseItemOpen } = this.state;
    const { brands, manufacturers } = this.props;

    const entities = {
      manufacturer: {
        onSetItem: this.onSetManufacturer,
        dataset: manufacturers,
        entity: 'manufacturer',
      },
      brand: {
        onSetItem: this.onSetBrand,
        dataset: brands,
        entity: 'brand',
      },
    };

    this.setState({
      isDialogChooseItemOpen: !isDialogChooseItemOpen,
      dialogConfig: entities[entity],
    });
  };

  renderChoiceInputItem = (field: Object): Object => {
    const {
      errors,
      values,
      mode,
    } = this.props;

    const isTitleEdit = (mode === 'edit' || values[field.id]);
    const buttonTitle = (isTitleEdit ? 'EDITAR' : 'ADICIONAR');

    return (
      <InputWithButtonWrapper>
        <InputWrapper>
          <Input
            placeholder={field.placeholder}
            error={errors[field.id]}
            value={values[field.id]}
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
            action={() => this.setDialogConfig(field.id)}
            disabled={mode === 'visualize'}
            title={buttonTitle}
            withIcon={false}
          />
        </InputButtonWrapper>
      </InputWithButtonWrapper>
    );
  };

  renderDialog = (): Object => {
    const { isDialogChooseItemOpen, dialogConfig } = this.state;
    const { onCreateBrand, values, mode } = this.props;

    const { onSetItem, dataset, entity } = dialogConfig;

    const itemSelected = (entity === 'brand' ? values.brand : values.manufacturer);
    const shouldRenderDialog = (!!dataset && isDialogChooseItemOpen);

    const Dialog = (
      <DialogChooseItem
        onToggleDialog={this.onToggleDialogChooseItem}
        isOpen={isDialogChooseItemOpen}
        onCreateBrand={onCreateBrand}
        itemSelected={itemSelected}
        onSetItem={onSetItem}
        dataset={dataset}
        entity={entity}
        mode={mode}
      />
    );

    return (shouldRenderDialog ? Dialog : null);
  };

  render() {
    const { getRowItemObject } = this.props;

    const manufacturerInputFieldData = getRowItemObject('Fabricante', 'Informe o Fabricante do Produto', 'text', 'manufacturer');
    const brandInputFieldData = getRowItemObject('Marca', 'Informe a Marca do Produto', 'text', 'brand');

    return (
      <Row>
        {this.renderChoiceInputItem(brandInputFieldData)}
        {this.renderChoiceInputItem(manufacturerInputFieldData)}
        {this.renderDialog()}
      </Row>
    );
  }
}

export default ManufacturerAndBrandRow;
