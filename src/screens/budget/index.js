// @flow

import React, { Component, Fragment } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Creators as BudgetCreators } from '../../store/ducks/budget';
import { Creators as StockCreators } from '../../store/ducks/stock';

import EntityComponent from '../../components/common/entity-component';
import Snackbar from '../../components/common/Snackbar';

import config from './config';
import Form from './form';

type Props = {
  confirmBudgetPayment: Function,
  readAllBudgets: Function,
  createBudget: Function,
  deleteBudget: Function,
  editBudget: Function,
  stock: Array<Object>,
  getStock: Function,
  message: string,
  budget: Object,
  error: string,
};

type State = {
  isSnackbarOpen: boolean,
  snackbarConfig: Object,
};

class Budget extends Component<Props, State> {
  state = {
    isSnackbarOpen: false,
  };

  componentDidMount() {
    const { readAllBudgets, getStock } = this.props;

    readAllBudgets();

    getStock();
  }

  componentWillReceiveProps(nextProps) {
    const { message, error } = nextProps.budget;

    if (message || error) {
      this.setState({
        isSnackbarOpen: true,
      });
    }
  }

  onConfirmBudgetPayment = (budget: Object): void => {
    const { confirmBudgetPayment } = this.props;

    confirmBudgetPayment(budget);
  };

  onCreateBudget = (budget: Object): void => {
    const { createBudget } = this.props;

    createBudget(budget);
  };

  onEditBudget = (budgetEdited: Object): void => {
    const { editBudget } = this.props;

    editBudget(budgetEdited);
  };

  onRemoveBudget = (id: number): void => {
    const { deleteBudget } = this.props;

    deleteBudget(id);
  };

  renderSnackbar = (budget: Object): Object => {
    const { isSnackbarOpen } = this.state;
    const { message, error } = budget;

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
    const { budget, stock } = this.props;

    return (
      <Fragment>
        <EntityComponent
          filterConfig={config.filterConfig}
          tabConfig={config.tabConfig}
          onCreateItem={this.onCreateBudget}
          onEditItem={this.onEditBudget}
          onRemoveItem={this.onRemoveBudget}
          singularEntityName="Budget"
          pluralEntityName="Budgets"
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
        {this.renderSnackbar(budget)}
      </Fragment>
    );
  }
}

const Creators = Object.assign({}, StockCreators, BudgetCreators);

const mapDispatchToProps = dispatch => bindActionCreators(Creators, dispatch);

const mapStateToProps = state => ({
  stock: state.stock.data,
  budget: state.budget,
});

export default connect(mapStateToProps, mapDispatchToProps)(Budget);
