// @flow

import React, { Component } from 'react';

import EntityTemplate from '../../components/common/entity-template';

import { filterConfig, tabConfig } from './config';
import Form from './form';

class Product extends Component {
  state = {
    manufacturers: ['Manufacturer 01', 'Manufacturer 02', 'Manufacturer 03', 'Manufacturer 04', 'Manufacturer 05'],
    categories: ['cat01', 'cat02', 'cat03'],
    brands: ['brand01', 'brand02', 'brand03'],
    products: [{
      id: Math.random(),
      barCode: '3',
      brand: 'brand01',
      category: 'cat01',
      costPrice: 3,
      description: 'description',
      manufacturer: 'Manufacturer 02',
      minStockQuantity: 4,
      salePrice: 3,
      stockQuantity: 1,
    }],
  };

  onCreateProduct = (product: Object): void => {
    const { categoriesCreated, brandsCreated } = product;
    const { products } = this.state;

    this.checkHasNewCategories(categoriesCreated);
    this.checkHasNewBrands(brandsCreated);

    const productCreated = product;
    delete productCreated.categoriesCreated;
    delete productCreated.brandsCreated;

    this.setState({
      products: [{
        ...productCreated,
        id: Math.random(),
      }, ...products],
    });
  };

  onEditProduct = (productEdited: Object): void => {
    const { products } = this.state;

    const productEditedIndex = products.findIndex(product => product.id === productEdited.id);

    this.setState({
      products: Object.assign([], products, { [productEditedIndex]: productEdited }),
    });
  };

  onRemoverProduct = (productId: string): void => {
    const { products } = this.state;

    this.setState({
      products: products.filter(product => product.id !== productId),
    });
  };

  checkHasNewCategories = (categoriesCreated: Array<any>): void => {
    const hasNewCategories = (categoriesCreated.length > 0);
    if (hasNewCategories) {
      this.handleCreateCategories(categoriesCreated);
    }
  };

  checkHasNewBrands = (brandsCreated: Array<any>): void => {
    const hasNewBrands = (brandsCreated.length > 0);
    if (hasNewBrands) {
      this.handleCreateBrands(brandsCreated);
    }
  };

  handleCreateBrands = (newBrands: Array<string>): void => {
    const { brands } = this.state;

    this.setState({
      brands: [...newBrands, ...brands],
    });
  };

  handleCreateCategories = (newCategories: Array<string>): void => {
    const { categories } = this.state;

    this.setState({
      categories: [...newCategories, ...categories],
    });
  };

  render() {
    const {
      manufacturers,
      categories,
      products,
      brands,
    } = this.state;

    return (
      <EntityTemplate
        onRemoveItem={this.onRemoverProduct}
        onCreateItem={this.onCreateProduct}
        onEditItem={this.onEditProduct}
        singularEntityName="Produto"
        pluralEntityName="Produtos"
        filterConfig={filterConfig}
        tabConfig={tabConfig}
        dataset={products}
        Form={props => (
          <Form
            manufacturers={manufacturers}
            categories={categories}
            brands={brands}
            {...props}
          />
        )}
      />
    );
  }
}

export default Product;
