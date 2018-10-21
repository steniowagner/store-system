import React, { Component } from 'react';

import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';

import CreateNewBrand from './CreateNewBrand';
import SearchItem from './SearchItem';

type Props = {
  onToggleDialog: Function,
  onSetItem: Function,
  itemSelected: string,
  entity: string,
  mode: string,
  dataset: Array<any>,
  isOpen: boolean,
};

type State = {
  itemSelected: number,
};

class DialogChooseItem extends Component<Props, State> {
  state = {
    itemSelected: '',
    dataset: [],
  };

  componentDidMount() {
    const { itemSelected, dataset } = this.props;

    this.setState({
      itemSelected,
      dataset,
    });
  }

  onSelectItem = (indexItemSelected: number): void => {
    const { dataset } = this.state;
    this.setState({
      itemSelected: dataset[indexItemSelected],
    });
  };

  onCreateBrand = (brand: string): void => {
    const { onCreateBrand } = this.props;
    const { dataset } = this.state;

    this.setState({
      dataset: [brand, ...dataset],
      itemSelected: brand,
    }, () => onCreateBrand(brand));
  };

  renderSlide = (props: Object): Object => (
    <Slide
      direction="up"
      {...props}
    />
  );

  renderCreateBrandContent = (): Object => {
    const { dataset } = this.state;

    return (
      <CreateNewBrand
        onCreateBrand={this.onCreateBrand}
        brands={dataset}
      />
    );
  };

  renderSearchInputItem = (): Object => {
    const { itemSelected, dataset } = this.state;
    const { entity } = this.props;

    return (
      <SearchItem
        onSelectItem={this.onSelectItem}
        itemSelected={itemSelected}
        options={dataset}
        entity={entity}
      />
    );
  };

  renderDialogActionButtons = (): Object => {
    const { onToggleDialog, onSetItem } = this.props;
    const { itemSelected } = this.state;

    return (
      <DialogActions>
        <Button
          onClick={onToggleDialog}
          color="primary"
        >
          Cancelar
        </Button>
        <Button
          onClick={() => onSetItem(itemSelected)}
          disabled={!itemSelected}
          color="primary"
        >
          Ok
        </Button>
      </DialogActions>
    );
  };

  render() {
    const {
      onToggleDialog,
      entity,
      isOpen,
      mode,
    } = this.props;

    const entityTitle = (entity === 'brand' ? 'Marca' : 'Fabricante');
    const actionTitle = (mode === 'edit' ? 'Editar' : 'Selecionar');
    const isBrandItem = (entity === 'brand');

    return (
      <Dialog
        aria-describedby="alert-dialog-slide-description"
        aria-labelledby="alert-dialog-slide-title"
        TransitionComponent={this.renderSlide}
        onClose={onToggleDialog}
        open={isOpen}
        maxWidth="sm"
        keepMounted
        fullWidth
      >
        <DialogTitle
          id="alert-dialog-slide-title"
        >
          {`${actionTitle} ${entityTitle}`}
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-slide-description"
          >
            {this.renderSearchInputItem()}
            {isBrandItem && this.renderCreateBrandContent()}
          </DialogContentText>
        </DialogContent>
        {this.renderDialogActionButtons()}
      </Dialog>
    );
  }
}

export default DialogChooseItem;
