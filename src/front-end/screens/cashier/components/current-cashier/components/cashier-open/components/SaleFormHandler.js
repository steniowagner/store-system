// @flow

import React, { Component } from 'react';

import FullScreenDialog from '../../../../../../../components/common/FullScreenDialog';
import SaleForm from '../../../../../../sales/form';

type Props = {
  onEditSaleOperation: Function,
  resetItemSelected: Function,
  stock: Array<Object>,
  isOpen: boolean,
  item: Object,
};

type State = {
  isDialogOpen: boolean,
  mode: string,
};

class SaleFormHandler extends Component<Props, State> {
  state = {
    isDialogOpen: false,
    mode: '',
  };

  componentWillReceiveProps(nextProps) {
    const { isOpen, item } = nextProps;

    const mode = (item && item.mode);

    this.setState({
      isDialogOpen: isOpen,
      mode,
    });
  }

  onEditSale = (saleEdited: Object): void => {
    const { onEditSaleOperation, item } = this.props;

    this.setState({
      isDialogOpen: false,
    }, () => onEditSaleOperation({ ...item, ...saleEdited }));
  };

  onToggleDialog = (): void => {
    const { resetItemSelected } = this.props;
    const { isDialogOpen } = this.state;

    this.setState({
      isDialogOpen: !isDialogOpen,
    }, () => resetItemSelected());
  };

  onChageFormToEditMode = (): void => {
    this.setState({
      mode: 'edit',
    });
  };

  render() {
    const { isDialogOpen, mode } = this.state;
    const { stock, item } = this.props;

    const title = (item.mode === 'edit' ? 'EDITAR VENDA' : 'VISUALIZAR VENDA');

    return (
      <FullScreenDialog
        onClose={this.onToggleDialog}
        isOpen={isDialogOpen}
        title={title}
      >
        <SaleForm
          onChageFormToEditMode={this.onChageFormToEditMode}
          onEditItem={this.onEditSale}
          onRemoveItem={() => {}}
          stock={stock}
          mode={mode}
          item={item}
        />
      </FullScreenDialog>
    );
  }
}

export default SaleFormHandler;
