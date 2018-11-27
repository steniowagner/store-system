// @flow

import React, { Component, Fragment } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Creators as BudgetCreators } from '../../store/ducks/budget';
import { Creators as StockCreators } from '../../store/ducks/stock';
import { Creators as SaleCreators } from '../../store/ducks/sale';

import Snackbar, { STYLES } from '../../components/common/snackbar';

import EntityComponent from '../../components/common/entity-component';

import config from './config';
import Form from './form';

class Budget extends Component {
  state = {
    isSnackbarOpen: false,
    snackbarConfig: {},
  };

  componentDidMount() {
    const { readAllBudgets, getStock } = this.props;

    readAllBudgets();
    getStock();
  }

  componentWillReceiveProps() {
    const { message, error } = this.props;

    if (error) {
      this.setState({
        snackbarConfig: {
          type: STYLES.ERROR,
          message: error,
        },
      });
    }

    if (message) {
      this.setState({
        snackbarConfig: {
          type: STYLES.SUCCESS,
          message,
        },
      });
    }
  }

  onConfirmBudgetPayment = (budget: Object) => {
    const { createSale } = this.props;

    createSale(budget);
  }

  onCreateBudget = (budget: Object) => {
    const { createBudget } = this.props;

    createBudget(budget);
  };

  onEditBudget = (budgetEdited: Object): void => {
    const { editBudget } = this.props;

    editBudget(budgetEdited);
  };

  onRemoveBudget = (budget: Object): void => {
    const { deleteBudget } = this.props;

    deleteBudget(budget.id);
  };

  onCloseSnackbar = (): void => {
    this.setState({
      isSnackbarOpen: false,
    });
  };

  renderSnackbar = (): Object => {
    const { snackbarConfig, isSnackbarOpen } = this.state;
    const { type, message } = snackbarConfig;

    return (
      <Snackbar
        onCloseSnackbar={this.onCloseSnackbar}
        isOpen={!!type && isSnackbarOpen}
        message={message}
        type={type}
      />
    );
  };

  render() {
    const { budget, stock } = this.props;

    console.log(this.props)

    return (
      <Fragment>
        <EntityComponent
          filterConfig={config.filterConfig}
          tabConfig={config.tabConfig}
          onCreateItem={this.onCreateBudget}
          onEditItem={this.onEditBudget}
          onRemoveItem={this.onRemoveBudget}
          singularEntityName="Orçamento"
          pluralEntityName="Orçamentos"
          dataset={budget.data}
          canBeCreated
          canBeRemoved
          canBeEdited
          Form={props => (
            <Form
              {...props}
              onConfirmBudgetPayment={this.onConfirmBudgetPayment}
              stock={stock}
            />
          )}
        />
        {this.renderSnackbar()}
      </Fragment>
    );
  }
}

const Creators = Object.assign({}, StockCreators, BudgetCreators, SaleCreators);

const mapDispatchToProps = dispatch => bindActionCreators(Creators, dispatch);

const mapStateToProps = state => ({
  stock: state.stock.data,
  budget: state.budget,
});

export default connect(mapStateToProps, mapDispatchToProps)(Budget);
