// @flow

import { BUDGET_STATUS } from '../components/BudgetStatus';
import { FILTER_TYPES } from '../../../utils/filter';

const filterPending = (budgets: Array<Object>): Array<Object> => budgets.filter(budget => budget.status === BUDGET_STATUS.PENDING);

const filterApprovead = (budgets: Array<Object>): Array<Object> => budgets.filter(budget => budget.status === BUDGET_STATUS.APPROVED);

const filterDenied = (budgets: Array<Object>): Array<Object> => budgets.filter(budget => budget.status === BUDGET_STATUS.DENIED);

const filterOutOfTime = (budgets: Array<Object>): Array<Object> => budgets.filter(budget => budget.status === BUDGET_STATUS.OUT_OF_TIME);

const filterConfig = [{
  placeholder: 'Informe o Nome de Usuáro Buscado',
  type: FILTER_TYPES.TEXT,
  filterTitle: 'Usuário',
  dataField: 'username',
}, {
  placeholder: 'Estes são todos os Orçamentos Pendentes',
  type: FILTER_TYPES.FUNCTIONAL,
  filterTitle: 'Pendentes',
  dataField: 'pending',
  behavior: filterPending,
}, {
  placeholder: 'Estes são todos os Orçamentos Aprovados',
  type: FILTER_TYPES.FUNCTIONAL,
  filterTitle: 'Aprovados',
  dataField: 'approvead',
  behavior: filterApprovead,
}, {
  placeholder: 'Estes são todos os Orçamentos Negados',
  type: FILTER_TYPES.FUNCTIONAL,
  filterTitle: 'Negados',
  dataField: 'denied',
  behavior: filterDenied,
}, {
  placeholder: 'Estes são todos os Orçamentos Fora do Prazo',
  type: FILTER_TYPES.FUNCTIONAL,
  filterTitle: 'Fora do Prazo',
  dataField: 'outOfTime',
  behavior: filterOutOfTime,
}];

export default filterConfig;
