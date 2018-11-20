// @flow

import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Creators as ProductCreators } from '../../store/ducks/product';
import { Creators as StockCreators } from '../../store/ducks/stock';
import { Creators as BrandCreators } from '../../store/ducks/brand';

import EntityComponent from '../../components/common/entity-component';

import config from './config';
import Form from './form';

class Product extends Component {
  componentDidMount() {
    const { getAllProducts, getAllBrands } = this.props;

    getAllProducts();

    getAllBrands();
  }

  onCreateProduct = (productCreated: Object): void => {
    const { createProduct } = this.props;

    createProduct(productCreated);
  };

  onEditProduct = (productEdited: Object): void => {
    const { editProduct } = this.props;

    editProduct(productEdited);
  };

  onRemoverProduct = (productId: number): void => {
    const { removeProduct } = this.props;

    removeProduct(productId);
  };

  removeCreatedFields = (product: Object): Object => {
    const cleanProduct = product;

    delete cleanProduct.brandsCreated;

    return cleanProduct;
  };

  handleNewItemsCreated = (product: Object): void => {
    const { brandsCreated } = product;

    this.checkHasNewBrands(brandsCreated);
  };

  handleCreateBrands = (newBrands: Array<string>): void => {
    const { createBrands } = this.props;

    createBrands(newBrands);
  };

  checkHasNewBrands = (brandsCreated: Array<any>): void => {
    const hasNewBrands = (brandsCreated.length > 0);
    if (hasNewBrands) {
      this.handleCreateBrands(brandsCreated);
    }
  };

  getProductsToShow = (): Array<Object> => {
    const { products } = this.props;

    const productsToShow = products.map(product => ({ ...product, brand: product['Brand.name'] }));

    return productsToShow;
  };

  render() {
    const { brands } = this.props;

    const products = this.getProductsToShow();
    console.log(brands)
    return (
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
            brands={brands}
            {...props}
          />
        )}
      />
    );
  }
}

const Creators = Object.assign({}, BrandCreators, StockCreators, ProductCreators);

const mapDispatchToProps = dispatch => bindActionCreators(Creators, dispatch);

const mapStateToProps = state => ({
  products: state.product.data,
  stock: state.stock.data,
  brands: state.brand.data,
});

export default connect(mapStateToProps, mapDispatchToProps)(Product);
