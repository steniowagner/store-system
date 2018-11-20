// @flow

import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Creators as ProductCreators } from '../../store/ducks/product';
import { Creators as BrandCreators } from '../../store/ducks/brand';

import EntityComponent from '../../components/common/entity-component';

import config from './config';
import Form from './form';

type Props = {
  getAllProducts: Function,
  createProduct: Function,
  removeProduct: Function,
  getAllBrands: Function,
  editProduct: Function,
  products: Array<Object>,
  brands: Array<Object>,
};

class Product extends Component<Props, {}> {
  componentDidMount() {
    const { getAllProducts, getAllBrands } = this.props;

    getAllProducts();

    getAllBrands();
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

    const productsToShow = products.map(product => ({
      ...product,
      brandName: product.brand.name,
      salePriceText: `R$ ${product.salePrice.toFixed(2)}`,
    }));

    return productsToShow;
  };

  render() {
    const products = this.getProductsToShow();

    const descriptionsRegistered = products.map(product => product.description);
    const barcodesRegistered = products.map(product => product.barcode);

    const { brands } = this.props;

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
            descriptionsRegistered={descriptionsRegistered}
            barcodesRegistered={barcodesRegistered}
            brands={brands}
            {...props}
          />
        )}
      />
    );
  }
}

const Creators = Object.assign({}, BrandCreators, ProductCreators);

const mapDispatchToProps = dispatch => bindActionCreators(Creators, dispatch);

const mapStateToProps = state => ({
  products: state.product.data,
  brands: state.brand.data,
});

export default connect(mapStateToProps, mapDispatchToProps)(Product);
