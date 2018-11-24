// @flow

import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Creators as BudgetCreators } from '../../store/ducks/user';

import config from './config';

import EntityComponent from '../../components/common/entity-component';
import Form from './form';

class Budget extends Component {
  state = {
    budgets: [],
  };

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
    const { budgets } = this.state;

    const budgetEditedIndex = budgets.findIndex(budget => budget.id === budgetEdited.id);

    this.setState({
      budgets: Object.assign([], budgets, { [budgetEditedIndex]: budgetEdited }),
    });
  };

  onRemoveBudget = (budgetId: string): void => {
    const { budgets } = this.state;

    this.setState({
      budgets: budgets.filter(budget => budget.id !== budgetId),
    });
  };

  render() {
    const { budgets } = this.props;

    return (
      <EntityComponent
        filterConfig={config.filterConfig}
        tabConfig={config.tabConfig}
        onCreateItem={this.onCreateBudget}
        onEditItem={this.onEditBudget}
        onRemoveItem={this.onRemoveBudget}
        singularEntityName="Orçamento"
        pluralEntityName="Orçamentos"
        dataset={budgets}
        canBeCreated
        canBeRemoved
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

const mapDispatchToProps = dispatch => bindActionCreators(BudgetCreators, dispatch);

const mapStateToProps = state => ({
  budgets: state.budget.data,
});

export default connect(mapStateToProps, mapDispatchToProps)(Budget);
