// @flow

import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Creators as BudgetCreators } from '../../store/ducks/budget';
import { Creators as StockCreators } from '../../store/ducks/stock';

import config from './config';

import EntityComponent from '../../components/common/entity-component';
import Form from './form';

class Budget extends Component {
  state = {
    budgets: [],
  };

  componentDidMount() {
    const { readAllBudgets, getStock } = this.props;

    readAllBudgets();
    getStock();
  }

  onCreateBudget = (budget: Object) => {
    const { budgets } = this.state;

    budget.username = 'stenio'
    budget.customerName = 'swmyself'
    budget.id = Math.random();

    this.setState({
      budgets: [budget, ...budgets],
    });
  };

  onEditBudget = (budgetEdited: Object): void => {
    console.log(budgetEdited);
  };

  onRemoveBudget = (budget: Object): void => {
    console.log(budget);
  };

  render() {
    const { budgets, stock } = this.props;

    return (
      <EntityComponent
        filterConfig={config.filterConfig}
        tabConfig={config.tabConfig}
        onCreateItem={this.onCreateBudget}
        onEditItem={this.onEditBudget}
        onRemoveItem={this.onRemoveBudget}
        singularEntityName="Orçamento"
        pluralEntityName="Orçamentos"
        dataset={this.state.budgets}
        canBeCreated
        canBeRemoved
        canBeEdited
        Form={props => (
          <Form
            {...props}
            stock={stock}
          />
        )}
      />
    );
  }
}

const Creators = Object.assign({}, StockCreators, BudgetCreators);

const mapDispatchToProps = dispatch => bindActionCreators(Creators, dispatch);

const mapStateToProps = state => ({
  budgets: state.budget.data,
  stock: state.stock.data,
});

export default connect(mapStateToProps, mapDispatchToProps)(Budget);
