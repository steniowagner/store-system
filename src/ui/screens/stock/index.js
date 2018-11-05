import React, { Component } from 'react';
import config from './config';
import Form from './form';

import EntityComponent from '../../components/common/entity-component';

class Stock extends Component {
  state = {
    stock: [{
      id: Math.random(),
      barCode: '3',
      brand: 'brand01',
      category: 'cat01',
      costPrice: 3,
      description: 'Produto 01',
      manufacturer: 'Manufacturer 02',
      minStockQuantity: 1,
      salePrice: 3,
      stockQuantity: 1,
    }, {
      id: Math.random(),
      barCode: '3',
      brand: 'brand01',
      category: 'cat01',
      costPrice: 3,
      description: 'Produto 02',
      manufacturer: 'Manufacturer 02',
      minStockQuantity: 4,
      salePrice: 3,
      stockQuantity: 1,
    }, {
      id: Math.random(),
      barCode: '3',
      brand: 'brand01',
      category: 'cat01',
      costPrice: 3,
      description: 'Produto 03',
      manufacturer: 'Manufacturer 02',
      minStockQuantity: 4,
      salePrice: 3,
      stockQuantity: 5,
    }, {
      id: Math.random(),
      barCode: '3',
      brand: 'brand01',
      category: 'cat01',
      costPrice: 3,
      description: 'Produto 04',
      manufacturer: 'Manufacturer 02',
      minStockQuantity: 4,
      salePrice: 3,
      stockQuantity: 21,
    }, {
      id: Math.random(),
      barCode: '3',
      brand: 'brand01',
      category: 'cat01',
      costPrice: 3,
      description: 'Produto 05',
      manufacturer: 'Manufacturer 02',
      minStockQuantity: 1,
      salePrice: 3,
      stockQuantity: 1,
    }, {
      id: Math.random(),
      barCode: '3',
      brand: 'brand01',
      category: 'cat01',
      costPrice: 3,
      description: 'Produto 06',
      manufacturer: 'Manufacturer 02',
      minStockQuantity: 4,
      salePrice: 3,
      stockQuantity: 5,
    }],
  };

  onEditProvider = (productInStockToEdit: Object): void => {
    const { stock } = this.state;

    const productInStockToEditIndex = stock.findIndex(product => product.id === productInStockToEdit.id);

    this.setState({
      stock: Object.assign([], stock, { [productInStockToEditIndex]: productInStockToEdit }),
    });
  };

  render() {
    const { stock } = this.state;

    return (
      <EntityComponent
        onEditItem={this.onEditProvider}
        onRemoveItem={() => {}}
        onCreateItem={() => {}}
        singularEntityName="Estoque"
        pluralEntityName="Estoque"
        filterConfig={config.filterConfig}
        tabConfig={config.tabConfig}
        dataset={stock}
        Form={props => (
          <Form
            {...props}
          />
        )}
      />
    );
  }
}

export default Stock;
