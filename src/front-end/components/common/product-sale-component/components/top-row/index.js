// @flow

import React, { Component, Fragment } from 'react';

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
  prepareToPrint: Function,
  customerSelected: Object,
  setFieldValue: Function,
  debits: Array<Object>,
  values: Object,
  error: string,
  mode: string,
}

class TopRow extends Component<Props, {}> {
  state = {
    isUserWithDebits: false,
  };

  componentWillReceiveProps(nextProps) {
    this.setState({
      isUserWithDebits: (nextProps.debits.length > 0),
    });
  }

  renderPrintReceptButton = (): Object => {
    const {
      prepareToPrint,
      values,
      error,
      mode,
    } = this.props;

    return (mode === 'detail') && (
      <ButtonWrapper
        hasError={!!error}
      >
        <ActionButton
          action={() => prepareToPrint(values)}
          title="Imprimir Recibo"
          CustomIcon={Print}
          withIcon={false}
          withCustomIcon
        />
      </ButtonWrapper>
    );
  };

  renderSelectCustomerContent = (): Object => {
    const {
      customerSelected,
      setFieldValue,
      error,
      mode,
    } = this.props;

    return (
      <SelectCustomer
        customerSelected={customerSelected}
        setFieldValue={setFieldValue}
        error={error}
        mode={mode}
      />
    );
  };

  render() {
    const { shouldRenderPrintReceiptButton, customerSelected } = this.props;
    const { isUserWithDebits } = this.state;

    return (
      <Fragment>
        <span>
          Cliente
        </span>
        <TopRowWrapper>
          {this.renderSelectCustomerContent()}
          {shouldRenderPrintReceiptButton && this.renderPrintReceptButton()}
        </TopRowWrapper>
        {isUserWithDebits && (
          <CustomerDebits
            customerId={customerSelected.id}
          />
        )}
      </Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators(PrintCreators, dispatch);

const mapStateToProps = state => ({
  debits: state.debits.data,
});

export default connect(mapStateToProps, mapDispatchToProps)(TopRow);
