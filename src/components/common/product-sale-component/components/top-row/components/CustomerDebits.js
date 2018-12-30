// @flow

import React, { Component, Fragment } from 'react';

import ErrorOutline from '@material-ui/icons/ErrorOutline';
import styled from 'styled-components';

import Debits from '../../../../../../screens/customer/components/Debits';
import FullScreenDialog from '../../../../FullScreenDialog';
import ActionButton from '../../../../ActionButton';
import appStyles from '../../../../../../styles';

const ButtonWrapper = styled.div`
  width: 100%;
  margin: 24px 0 32px 0;
`;

class CustomerDebits extends Component<Props, {}> {
  state = {
    isUserDebitsDiaogOpen: false,
  };

  onToggleUserDebitsDialog = (): void => {
    const { isUserDebitsDiaogOpen } = this.state;

    this.setState({
      isUserDebitsDiaogOpen: !isUserDebitsDiaogOpen,
    });
  };

  renderCustomerDebitsTable = (): Object => {
    const { isUserDebitsDiaogOpen } = this.state;
    const { customerId } = this.props;

    return (
      <FullScreenDialog
        onClose={this.onToggleUserDebitsDialog}
        isOpen={isUserDebitsDiaogOpen}
        title="Debits"
      >
        <Debits
          id={customerId}
        />
      </FullScreenDialog>
    );
  };

  renderCustomerDebitsButton = (): Object => (
    <ButtonWrapper>
      <ActionButton
        action={this.onToggleUserDebitsDialog}
        customColor={appStyles.colors.danger}
        title="Customer in Debit"
        CustomIcon={ErrorOutline}
        withCustomColor
        withIcon={false}
        withCustomIcon
      />
    </ButtonWrapper>
  );

  render() {
    return (
      <Fragment>
        {this.renderCustomerDebitsButton()}
        {this.renderCustomerDebitsTable()}
      </Fragment>
    );
  }
}

export default CustomerDebits;
