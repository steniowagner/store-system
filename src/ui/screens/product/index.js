import React, { Component } from 'react';

import EntityTemplate from '../../components/common/entity-template';

import { filterConfig, tabConfig } from './config';
import Form from './form';

class Product extends Component {
  state = {
    manufacturers: ['Manufacturer 01', 'Manufacturer 02', 'Manufacturer 03', 'Manufacturer 04', 'Manufacturer 05'],
    brands: [],
    products: [{
      id: Math.random(),
      barCode: '3',
      brand: 'brand',
      costPrice: 3,
      description: 'description',
      manufacturer: 'manufacturer',
      minStockQuantity: 4,
      salePrice: 3,
      stockQuantity: 1,
    }],
  };

  onCreateProduct = (product: Object): void => {
    const { brandsCreated } = product;
    const { products } = this.state;

    const hasNewBrands = (brandsCreated.length > 0);
    if (hasNewBrands) {
      this.handleCreateBrands(brandsCreated);
    }

    const productCreated = product;
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

  handleCreateBrands = (newBrands: Array<string>): void => {
    const { brands } = this.state;

    this.setState({
      brands: [...newBrands, ...brands],
    });
  };

  render() {
    const { products, brands, manufacturers } = this.state;

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
            brands={brands}
            {...props}
          />
        )}
      />
    );
  }
}

export default Product;
