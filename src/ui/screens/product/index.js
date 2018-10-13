import React, { Component } from 'react';

import AppTemplate from '../../components/common/ApplicationEntityTemplate';

class Product extends Component {
  componentDidMount() {
    console.log('Product - componentDidMount');
  }

  onCreateProduct = (product: Object): void => {
    console.log('onCreateProduct', product);
  };

  render() {
    return (
      <AppTemplate />
    );
  }
}

export default Product;
