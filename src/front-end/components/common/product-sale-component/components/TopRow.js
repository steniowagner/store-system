// @flow

import React, { Fragment } from 'react';

import styled from 'styled-components';

import SelectCustomer from './select-customer';
import ActionButton from '../../ActionButton';

const TopRowWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const PrintReceiptWrapper = styled.div`
  margin-bottom: ${({ hasError }) => (hasError ? 20 : 0)}px;
`;

const renderPrintReceptButton = (error: string): Object => (
  <PrintReceiptWrapper
    hasError={!!error}
  >
    <ActionButton
      action={() => {}}
      title="Imprimir Recibo"
      withIcon={false}
    />
  </PrintReceiptWrapper>
);

const renderSelectCustomerContent = (customerSelected: Object, setFieldValue: Function, error: string, mode): Object => (
  <SelectCustomer
    customerSelected={customerSelected}
    setFieldValue={setFieldValue}
    error={error}
    mode={mode}
  />
);

type Props = {
  shouldRenderPrintReceiptButton: boolean,
  customerSelected: Object,
  setFieldValue: Function,
  error: string,
  mode: string,
}

const TopRow = ({
  shouldRenderPrintReceiptButton,
  customerSelected,
  setFieldValue,
  error,
  mode,
}: Props): Object => (
  <Fragment>
    <span>
      Cliente
    </span>
    <TopRowWrapper>
      {renderSelectCustomerContent(customerSelected, setFieldValue, error, mode)}
      {shouldRenderPrintReceiptButton && renderPrintReceptButton(error)}
    </TopRowWrapper>
  </Fragment>
);

export default TopRow;
