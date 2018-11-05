// @flow

import React, { Component } from 'react';

import EntityComponent from '../../components/common/entity-component';

import config from './config';
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

  onCreateProduct = (productCreated: Object): void => {
    const { products } = this.state;

    this.handleNewItemsCreated(productCreated);

    const product = this.removeCreatedFields(productCreated);

    this.setState({
      products: [{
        ...product,
        id: Math.random(),
      }, ...products],
    });
  };

  onEditProduct = (productEdited: Object): void => {
    const { products } = this.state;

    this.handleNewItemsCreated(productEdited);

    const productEditedIndex = products.findIndex(product => product.id === productEdited.id);

    const product = this.removeCreatedFields(productEdited);

    this.setState({
      products: Object.assign([], products, { [productEditedIndex]: product }),
    });
  };

  onRemoverProduct = (productId: string): void => {
    const { products } = this.state;

    this.setState({
      products: products.filter(product => product.id !== productId),
    });
  };

  removeCreatedFields = (product: Object): Object => {
    const cleanProduct = product;

    delete cleanProduct.manufacturersCreated;
    delete cleanProduct.categoriesCreated;
    delete cleanProduct.brandsCreated;

    return cleanProduct;
  };

  handleNewItemsCreated = (product: Object): void => {
    const { manufacturersCreated, categoriesCreated, brandsCreated } = product;

    this.checkHasNewManufactures(manufacturersCreated);
    this.checkHasNewCategories(categoriesCreated);
    this.checkHasNewBrands(brandsCreated);
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

  handleCreateManufacturers = (newManufacturers: Array<string>): void => {
    const { manufacturers } = this.state;

    this.setState({
      manufacturers: [...newManufacturers, ...manufacturers],
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

  checkHasNewManufactures = (manufacturersCreated: Array<any>): void => {
    const hasNewManufacturers = (manufacturersCreated.length > 0);
    if (hasNewManufacturers) {
      this.handleCreateManufacturers(manufacturersCreated);
    }
  };

  render() {
    const {
      manufacturers,
      categories,
      products,
      brands,
    } = this.state;

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
