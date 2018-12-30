// @flow

import { BUDGET_STATUS } from '../components/BudgetStatus';
import { FILTER_TYPES } from '../../../utils/filter';

const filterPending = (budgets: Array<Object>): Array<Object> => budgets.filter(budget => budget.status === BUDGET_STATUS.PENDING);

const filterApprovead = (budgets: Array<Object>): Array<Object> => budgets.filter(budget => budget.status === BUDGET_STATUS.APPROVED);

const filterOutOfTime = (budgets: Array<Object>): Array<Object> => budgets.filter(budget => budget.status === BUDGET_STATUS.OUT_OF_TIME);

const filterConfig = [{
  placeholder: 'Enter the Code of the Budget',
  type: FILTER_TYPES.TEXT,
  filterTitle: 'Code',
  dataField: 'code',
}, {
  placeholder: 'These are All Pending Budgets',
  type: FILTER_TYPES.FUNCTIONAL,
  filterTitle: 'Pending',
  dataField: 'pending',
  behavior: filterPending,
}, {
  placeholder: 'These are All Approved Budgets',
  type: FILTER_TYPES.FUNCTIONAL,
  filterTitle: 'Approved',
  dataField: 'approvead',
  behavior: filterApprovead,
}, {
  placeholder: 'These are All Out of Time Budgets',
  type: FILTER_TYPES.FUNCTIONAL,
  filterTitle: 'Out of Time',
  dataField: 'outOfTime',
  behavior: filterOutOfTime,
}];

export default filterConfig;
