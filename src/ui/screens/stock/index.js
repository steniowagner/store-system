import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Creators as StockCreators } from '../../store/ducks/stock';

import config from './config';
import Form from './form';

import EntityComponent from '../../components/common/entity-component';

type Props = {
  unsubscribeEvents: Function,
  editStock: Function,
  getStock: Function,
  stock: Array<Object>,
};

class Stock extends Component<Props, {}> {
  componentDidMount() {
    const { getStock } = this.props;

    getStock();
  }

  componentWillUnmount() {
    const { unsubscribeEvents } = this.props;

    unsubscribeEvents();
  }

  onEditStockItem = (itemToEdit: Object): void => {
    const { editStock } = this.props;

    editStock(itemToEdit);
  };

  render() {
    const { stock } = this.props;

    return (
      <EntityComponent
        onEditItem={this.onEditStockItem}
        singularEntityName="Estoque"
        pluralEntityName="Estoque"
        filterConfig={config.filterConfig}
        tabConfig={config.tabConfig}
        dataset={stock}
        canBeEdited
        Form={props => (
          <Form
            {...props}
          />
        )}
      />
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators(StockCreators, dispatch);

const mapStateToProps = state => ({
  stock: state.stock.data,
});

export default connect(mapStateToProps, mapDispatchToProps)(Stock);
