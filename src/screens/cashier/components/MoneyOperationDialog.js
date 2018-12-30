// @flow

import React, { Component, Fragment } from 'react';

import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';

import styled from 'styled-components';

import { CASHIER_OPERATIONS } from './current-cashier/components/cashier-open/components/top-buttons-values/dialog-config';
import Input from '../../../components/common/CustomInput';

const ContentWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Section = styled.div`
`;

const InputWrapper = styled.div`
  width: 100%;
`;

const InputMoneyWrapper = styled.div`
  margin-bottom: 16px;
`;

const renderSlide = (props: Object): Object => (
  <Slide
    direction="up"
    {...props}
  />
);

type Props = {
  onToggleMoneyDialog: Function,
  action: Function,
  reasonTitle: Object,
  valueTitle: Object,
  title: Object,
  isDisabled: boolean,
  isOpen: boolean,
  reason: string,
  value: string,
  mode: string,
  type: ?string,
};

type State = {
  reasonInputValue: string,
  moneyInputValue: string,
};

class MoneyOperationDialog extends Component<Props, State> {
  state = {
    reasonInputValue: '',
    moneyInputValue: '',
  }

  componentDidMount() {
    const { reason, value } = this.props;

    this.handleValuesFromProps(reason, value);
  }

  componentWillReceiveProps(nextProps) {
    const { reason, value } = nextProps;

    this.handleValuesFromProps(reason, value);
  }

  onClickOkButton = (): void => {
    const { reasonInputValue, moneyInputValue } = this.state;
    const { onToggleMoneyDialog, action } = this.props;

    this.setState({
      reasonInputValue: '',
      moneyInputValue: '',
    }, () => {
      onToggleMoneyDialog();
      action(moneyInputValue, reasonInputValue);
    });
  };

  onClickCancelButton = (): void => {
    const { onToggleMoneyDialog } = this.props;

    this.setState({
      reasonInputValue: '',
      moneyInputValue: '',
    }, () => onToggleMoneyDialog());
  };

  onTypeReasonInputValue = (reasonInputValue: string): void => {
    this.setState({
      reasonInputValue,
    });
  };

  onTypeMoneyInputValue = (moneyInputValue: string): void => {
    this.setState({
      moneyInputValue,
    });
  };

  handleValuesFromProps = (reason: string, value: number): void => {
    const moneyInputValue = (value || '');
    const reasonInputValue = (reason || '');

    this.setState({
      reasonInputValue,
      moneyInputValue,
    });
  };

  renderTitle = (): Object => {
    const { title, mode } = this.props;

    return (
      <DialogTitle
        id="alert-dialog-slide-title"
      >
        {title[mode]}
      </DialogTitle>
    );
  };

  renderMoneyInput = (onTypeMoneyInputValue: Function, moneyInputValue: string, isDisabled: boolean): Object => (
    <Input
      onChange={event => this.onTypeMoneyInputValue(event.target.value)}
      value={moneyInputValue}
      disabled={isDisabled}
      onBlur={() => {}}
      placeholder=""
      type="number"
      id="money"
      autoFocus
      error=""
    />
  );

  renderReasonInput = (onTypeInitialMoney: Function, initialMoney: string, isDisabled: boolean): Object => (
    <Input
      onChange={event => onTypeInitialMoney(event.target.value)}
      disabled={isDisabled}
      value={initialMoney}
      onBlur={() => {}}
      id="reason-text"
      placeholder=""
      type="textarea"
      error=""
    />
  );

  renderSectionText = (text: string): Object => (
    <DialogContentText>
      {text}
    </DialogContentText>
  );

  renderInputMoneySection = (): Object => {
    const { valueTitle, mode, isDisabled } = this.props;
    const { moneyInputValue } = this.state;

    return (
      <Section>
        {this.renderSectionText(valueTitle[mode])}
        <ContentWrapper>
          <InputWrapper>
            <InputMoneyWrapper>
              {this.renderMoneyInput(this.onTypeMoneyInputValue, moneyInputValue, isDisabled)}
            </InputMoneyWrapper>
          </InputWrapper>
        </ContentWrapper>
      </Section>
    );
  };

  renderInputReasonSection = (): Object => {
    const { reasonTitle, mode, isDisabled } = this.props;
    const { reasonInputValue } = this.state;

    return (
      <Section>
        {this.renderSectionText(reasonTitle[mode])}
        <ContentWrapper>
          <InputWrapper>
            {this.renderReasonInput(this.onTypeReasonInputValue, reasonInputValue, isDisabled)}
          </InputWrapper>
        </ContentWrapper>
      </Section>
    );
  };

  renderButtonsActions = (): Object => {
    const { moneyInputValue, reasonInputValue } = this.state;
    const { mode } = this.props;

    const isOkButtonDisabled = !(moneyInputValue && reasonInputValue);

    return (
      <DialogActions>
        {(mode !== 'detail') && (
          <Button
            onClick={this.onClickCancelButton}
            color="primary"
          >
            Cancel
          </Button>
        )}
        <Button
          onClick={this.onClickOkButton}
          disabled={isOkButtonDisabled}
          color="primary"
        >
          Ok
        </Button>
      </DialogActions>
    );
  };

  renderContent = (): Object => (
    <Fragment>
      {this.renderTitle()}
      <DialogContent>
        {this.renderInputMoneySection()}
        {this.renderInputReasonSection()}
      </DialogContent>
      {this.renderButtonsActions()}
    </Fragment>
  );

  render() {
    const { onToggleMoneyDialog, isOpen, type } = this.props;

    const shouldShowContent = (type === CASHIER_OPERATIONS.ADD_MONEY || type === CASHIER_OPERATIONS.TAKE_AWAY_MONEY);

    return (
      <Dialog
        aria-describedby="alert-dialog-slide-description"
        aria-labelledby="alert-dialog-slide-title"
        TransitionComponent={renderSlide}
        onClose={onToggleMoneyDialog}
        disableBackdropClick
        keepMounted={false}
        open={isOpen}
        maxWidth="xs"
        fullWidth
      >
        {shouldShowContent && this.renderContent()}
      </Dialog>
    );
  }
}

export default MoneyOperationDialog;
