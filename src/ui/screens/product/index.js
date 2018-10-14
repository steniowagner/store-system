import React, { Component, Fragment } from 'react';

import Form from './form';
import { filterConfig, tabConfig } from './config';
import AppTemplate from '../../components/common/entity-template';

const getData = (): Array<Object> => {
  const items = [];

  for (let i = 0; i < 40; i += 1) {
    items.push({
      barCode: i,
      name: `Produto ${i}`,
      brand: `Marca ${i}`,
    });
  }

  return items;
};

class Product extends Component {
  componentDidMount() {
    console.log('Product - componentDidMount');
  }

  onCreateProduct = (product: Object): void => {
    console.log('onCreateProduct', product);
  };

  onEditProduct = (productEdited: Object): void => {
    console.log('onEditProduct', productEdited);
  };

  onRemoverProduct = (productToRemove: Object): void => {
    console.log('onRemoverProduct', productToRemove);
  };

  render() {
    return (
      <Fragment>
        {/*<AppTemplate
          onRemoveItem={this.onRemoverProduct}
          onCreateItem={this.onCreateProduct}
          onEditItem={this.onEditProduct}
          singularEntityName="Produto"
          pluralEntityName="Produtos"
          filterConfig={filterConfig}
          tabConfig={tabConfig}
          dataset={getData()}
        />*/}
        <Form />
      </Fragment>
    );
  }
}

export default Product;
