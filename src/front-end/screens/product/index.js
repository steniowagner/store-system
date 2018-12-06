// @flow

import React, { Component, Fragment } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Creators as ProductCreators } from '../../store/ducks/product';
import { Creators as BrandCreators } from '../../store/ducks/brand';

import EntityComponent from '../../components/common/entity-component';
import Snackbar from '../../components/common/Snackbar';

import config from './config';
import Form from './form';

type Props = {
  unsubscribeProductEvents: Function,
  getAllProducts: Function,
  createProduct: Function,
  removeProduct: Function,
  getAllBrands: Function,
  editProduct: Function,
  products: Array<Object>,
  brands: Array<Object>,
};

class Product extends Component<Props, {}> {
  state = {
    isSnackbarOpen: false,
  };

  componentDidMount() {
    const { getAllProducts, getAllBrands } = this.props;

    getAllProducts();

    getAllBrands();
  }

  componentWillReceiveProps(nextProps) {
    const { message, error } = nextProps.products;

    if (message || error) {
      this.setState({
        isSnackbarOpen: true,
      });
    }
  }

  componentWillUnmount() {
    const { unsubscribeProductEvents } = this.props;

    unsubscribeProductEvents();
  }

  onCreateProduct = (productCreated: Object): void => {
    const { getAllBrands, createProduct } = this.props;

    createProduct(productCreated);

    getAllBrands();
  };

  onEditProduct = (productEdited: Object): void => {
    const { editProduct } = this.props;

    editProduct(productEdited);
  };

  onRemoverProduct = (productId: number): void => {
    const { removeProduct } = this.props;

    removeProduct(productId);
  };

  getProductsToShow = (): Array<Object> => {
    const { products } = this.props;

    const productsToShow = products.data.map(product => ({
      ...product,
      brandName: product.brand.name,
      salePriceText: `R$ ${product.salePrice.toFixed(2)}`,
    }));

    return productsToShow;
  };

  renderSnackbar = (): Object => {
    const { isSnackbarOpen } = this.state;
    const { products } = this.props;

    const { message, error } = products;

    return (
      <Snackbar
        onCloseSnackbar={() => this.setState({ isSnackbarOpen: false })}
        isOpen={isSnackbarOpen}
        message={message}
        error={error}
      />
    );
  };

  render() {
    const products = this.getProductsToShow();

    const descriptionsRegistered = products.map(product => product.description);
    const barcodesRegistered = products.map(product => product.barcode);

    const { brands } = this.props;

    return (
      <Fragment>
        <EntityComponent
          onRemoveItem={this.onRemoverProduct}
          onCreateItem={this.onCreateProduct}
          onEditItem={this.onEditProduct}
          singularEntityName="Produto"
          pluralEntityName="Produtos"
          filterConfig={config.filterConfig}
          tabConfig={config.tabConfig}
          dataset={products}
          canBeCreated
          canBeRemoved
          canBeEdited
          Form={props => (
            <Form
              descriptionsRegistered={descriptionsRegistered}
              barcodesRegistered={barcodesRegistered}
              brands={brands}
              {...props}
            />
          )}
        />
        {this.renderSnackbar()}
      </Fragment>
    );
  }
}

const Creators = Object.assign({}, BrandCreators, ProductCreators);

const mapDispatchToProps = dispatch => bindActionCreators(Creators, dispatch);

const mapStateToProps = state => ({
  products: state.product,
  brands: state.brand.data,
});

export default connect(mapStateToProps, mapDispatchToProps)(Product);
