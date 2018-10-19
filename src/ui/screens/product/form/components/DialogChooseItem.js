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

};

type State = {
  itemSelected: number,
};

class DialogChooseItem extends Component<Props, State> {
  state = {
    manufacturers: [],
    brands: [],
    itemSelected: '',
  };

  componentDidMount() {
    const { manufacturers, brands } = this.props;

    this.setState({
      manufacturers,
      brands,
    });
  }

  onSelectItem = (indexItemSelected: number): void => {
    const { brands } = this.state;
    console.log(brands)
    this.setState({
      itemSelected: brands[indexItemSelected],
    });
  };

  onCreateBrand = (brand: string): void => {
    const { brands } = this.state;

    this.setState({
      brands: [brand, ...brands],
    }, () => this.onSelectItem(0));
  };

  renderSlide = (props: Object): Object => (
    <Slide
      direction="up"
      {...props}
    />
  );

  renderCreateBrandContent = (): Object => {
    const { brands } = this.state;

    return (
      <CreateNewBrand
        onCreateBrand={this.onCreateBrand}
        brands={brands}
      />
    );
  };

  renderSearchInputItem = (): Object => {
    const { itemSelected } = this.state;
    const { brands } = this.state;

    return (
      <SearchItem
        onSelectItem={this.onSelectItem}
        itemSelected={itemSelected}
        options={brands}
      />
    );
  };

  renderDialogActionButtons = (): Object => {
    const { onToggleDialog } = this.props;

    return (
      <DialogActions>
        <Button
          onClick={onToggleDialog}
          color="primary"
        >
          Cancelar
        </Button>
        <Button
          onClick={onToggleDialog}
          color="primary"
        >
          Ok
        </Button>
      </DialogActions>
    );
  };

  render() {
    const { onToggleDialog, isOpen } = this.props;

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
          Adicionar Marca
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-slide-description"
          >
            {this.renderSearchInputItem()}
            {this.renderCreateBrandContent()}
          </DialogContentText>
        </DialogContent>
        {this.renderDialogActionButtons()}
      </Dialog>
    );
  }
}

export default DialogChooseItem;
