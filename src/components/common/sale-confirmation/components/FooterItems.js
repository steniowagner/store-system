// @flow

import React, { Fragment } from 'react';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Divider from '@material-ui/core/Divider';

import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.lightGray};
  margin-top: 16px;
  border-radius: 4px;
`;

const Wrapper = styled.div`
  width: 100%;
  height: 48px;
  display: flex;
  padding: 0 8px;
  justify-content: space-between;
  align-items: center;
`;

const ErrorText = styled.span`
  font-size: 18px;
  color: ${({ theme }) => theme.colors.danger};
`;

type Props = {
  onToggleShouldPrintReceiptCheckbox: Function,
  shouldRenderDebitCheckbox: boolean,
  onToggleInDebitCheckbox: Function,
  shouldPrintReceipt: boolean,
  isInDebit: boolean,
  error: string,
  mode: string,
};

const renderDebitAndErrorRow = (onToggleInDebitCheckbox: Function, isInDebit: boolean, error: string): Object => (
  <Wrapper>
    <FormControlLabel
      control={(
        <Checkbox
          onChange={onToggleInDebitCheckbox}
          checked={!!isInDebit}
          color="primary"
          value="debit"
        />
        )}
      label="Leave in Debit"
      disabled={!error}
    />
    <ErrorText>
      {error}
    </ErrorText>
  </Wrapper>
);

const renderShouldPrintReceipt = (onToggleShouldPrintReceiptCheckbox: Function, shouldPrintReceipt: number): Object => (
  <Wrapper>
    <FormControlLabel
      control={(
        <Checkbox
          onChange={onToggleShouldPrintReceiptCheckbox}
          checked={!!shouldPrintReceipt}
          color="primary"
          value="shouldPrintReceipt"
        />
        )}
      label="Print Voucher"
    />
  </Wrapper>
);

const FooterItems = ({
  onToggleShouldPrintReceiptCheckbox,
  shouldRenderDebitCheckbox,
  onToggleInDebitCheckbox,
  shouldPrintReceipt,
  isInDebit,
  error,
  mode,
}: Props): Object => {
  const isFormOnCreateMode = (mode === 'create');

  return (
    <Container>
      {shouldRenderDebitCheckbox && (
        <Fragment>
          {renderDebitAndErrorRow(onToggleInDebitCheckbox, isInDebit, error)}
        </Fragment>
      )}
      {isFormOnCreateMode && (
        <Fragment>
          <Divider light />
          {renderShouldPrintReceipt(onToggleShouldPrintReceiptCheckbox, shouldPrintReceipt)}
        </Fragment>
      )}
    </Container>
  );
};

export default FooterItems;
