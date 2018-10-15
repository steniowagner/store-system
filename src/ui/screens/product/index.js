import React, { Component, Fragment } from 'react';

import EntityTemplate from '../../components/common/entity-template';

import Form from './form';
import { filterConfig, tabConfig } from './config';

const getData = (): Array<Object> => {
  const items = [];

  for (let i = 0; i < 16; i += 1) {
    items.push({
      id: Math.random(),
      barCode: i.toString(),
      name: `Produto ${i}`,
      brand: `Marca ${i}`,
    });
  }

  return items;
};

class Product extends Component {
  state = {
    products: getData(),
  };

  onCreateProduct = (product: Object): void => {
    const { products } = this.state;

    this.setState({
      products: [{
        ...product,
        brand: 'maRCA01',
        id: Math.random(),
      }, ...products],
    });
  };

  onEditProduct = (productEdited: Object): void => {
    const { products } = this.state;

    const productIndex = products.findIndex(product => product.id === productEdited.id);

    this.setState({
      products: Object.assign([], products, { [productIndex]: productEdited }),
    });
  };

  onRemoverProduct = (productToRemove: string): void => {
    const { products } = this.state;

    this.setState({
      products: products.filter(product => product.id !== productToRemove),
    });
  };

  render() {
    const { products } = this.state;

    return (
      <Fragment>
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
              {...props}
            />
          )}
        />
      </Fragment>
    );
  }
}

export default Product;
