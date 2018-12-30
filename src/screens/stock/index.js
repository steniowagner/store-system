import React, { Component, Fragment } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Creators as StockCreators } from '../../store/ducks/stock';

import config from './config';
import Form from './form';

import EntityComponent from '../../components/common/entity-component';
import Snackbar from '../../components/common/Snackbar';

type Props = {
  editStock: Function,
  getStock: Function,
  stock: Array<Object>,
};

type State = {
  isSnackbarOpen: boolean,
};

class Stock extends Component<Props, State> {
  state = {
    isSnackbarOpen: false,
  };

  componentDidMount() {
    const { getStock } = this.props;

    getStock();
  }

  componentWillReceiveProps(nextProps) {
    const { message, error } = nextProps.stock;

    if (message || error) {
      this.setState({
        isSnackbarOpen: true,
      });
    }
  }

  onEditStockItem = (itemToEdit: Object): void => {
    const { editStock } = this.props;

    editStock(itemToEdit);
  };

  renderSnackbar = (stock: Object): Object => {
    const { isSnackbarOpen } = this.state;
    const { message, error } = stock;

    return (
      <Snackbar
        onCloseSnackbar={() => this.setState({ isSnackbarOpen: false })}
        isOpen={isSnackbarOpen}
        message={message}
        error={error}
      />
    );
  };

  render() {
    const { stock } = this.props;

    return (
      <Fragment>
        <EntityComponent
          onEditItem={this.onEditStockItem}
          singularEntityName="Stock"
          pluralEntityName="Stock"
          filterConfig={config.filterConfig}
          tabConfig={config.tabConfig}
          dataset={stock.data}
          canBeEdited
          Form={props => (
            <Form
              {...props}
            />
          )}
        />
        {this.renderSnackbar(stock)}
      </Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators(StockCreators, dispatch);

const mapStateToProps = state => ({
  stock: state.stock,
});

export default connect(mapStateToProps, mapDispatchToProps)(Stock);
