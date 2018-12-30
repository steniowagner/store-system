// @flow

import React, { Fragment } from 'react';

import Print from '@material-ui/icons/Print';
import styled from 'styled-components';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Creators as PrintCreators } from '../../../../../store/ducks/print';

import SelectCustomer from './components/select-customer';
import CustomerDebits from './components/CustomerDebits';
import ActionButton from '../../../ActionButton';

const TopRowWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const ButtonWrapper = styled.div`
  margin-bottom: ${({ hasError }) => (hasError ? 20 : 0)}px;
`;

type Props = {
  shouldRenderPrintReceiptButton: boolean,
  customerSelected: Object,
  setFieldValue: Function,
  debits: Array<Object>,
  startPrint: Function,
  values: Object,
  error: string,
  mode: string,
};

const renderPrintReceptButton = (startPrint: Function, values: Object, error: Object, mode: string): Object => (
  (mode === 'detail') && (
    <ButtonWrapper
      hasError={!!error}
    >
      <ActionButton
        action={() => startPrint(values)}
        title="Print Voucher"
        CustomIcon={Print}
        withIcon={false}
        withCustomIcon
      />
    </ButtonWrapper>
  )
);

const renderSelectCustomerContent = (customerSelected: Object, setFieldValue: Function, error: Object, mode: string): Object => (
  <SelectCustomer
    customerSelected={customerSelected}
    setFieldValue={setFieldValue}
    error={error}
    mode={mode}
  />
);

const TopRow = ({
  shouldRenderPrintReceiptButton,
  customerSelected,
  setFieldValue,
  startPrint,
  debits,
  values,
  error,
  mode,
}: Props): Object => {
  const isUserWithDebits = (!!customerSelected && debits.length > 0);

  return (
    <Fragment>
      <span>
        Customer
      </span>
      <TopRowWrapper>
        {renderSelectCustomerContent(customerSelected, setFieldValue, error, mode)}
        {shouldRenderPrintReceiptButton && renderPrintReceptButton(startPrint, values, error, mode)}
      </TopRowWrapper>
      {isUserWithDebits && (
        <CustomerDebits
          customerId={customerSelected.id}
        />
      )}
    </Fragment>
  );
};

const mapDispatchToProps = dispatch => bindActionCreators(PrintCreators, dispatch);

const mapStateToProps = state => ({
  debits: state.debits.data,
});

export default connect(mapStateToProps, mapDispatchToProps)(TopRow);
