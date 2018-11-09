// @flow

import React, { Component } from 'react';

import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';

import styled from 'styled-components';

import Input from '../../../../../../../../components/common/CustomInput';

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
  reasonText: string,
  moneyText: string,
  title: string,
  isOpen: boolean,
};

type State = {
  reasonInputValue: string,
  moneyInputValue: string,
};

class InitialMoneyCashDialog extends Component<Props, State> {
  state = {
    reasonInputValue: '',
    moneyInputValue: '',
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

  renderTitle = (): Object => {
    const { title } = this.props;

    return (
      <DialogTitle
        id="alert-dialog-slide-title"
      >
        {title}
      </DialogTitle>
    );
  };

  renderMoneyInput = (): Object => {
    const { moneyInputValue } = this.state;

    return (
      <Input
        onChange={event => this.onTypeMoneyInputValue(event.target.value)}
        value={moneyInputValue}
        onBlur={() => {}}
        placeholder=""
        type="number"
        id="money"
        autoFocus
        error=""
      />
    );
  };

  renderReasonInput = (onTypeInitialMoney: Function, initialMoney: string): Object => (
    <Input
      onChange={event => onTypeInitialMoney(event.target.value)}
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
    const { moneyInputValue } = this.state;
    const { moneyText } = this.props;

    return (
      <Section>
        {this.renderSectionText(moneyText)}
        <ContentWrapper>
          <InputWrapper>
            <InputMoneyWrapper>
              {this.renderMoneyInput(this.onTypeMoneyInputValue, moneyInputValue)}
            </InputMoneyWrapper>
          </InputWrapper>
        </ContentWrapper>
      </Section>
    );
  };

  renderInputReasonSection = (): Object => {
    const { reasonInputValue } = this.state;
    const { reasonText } = this.props;

    return (
      <Section>
        {this.renderSectionText(reasonText)}
        <ContentWrapper>
          <InputWrapper>
            {this.renderReasonInput(this.onTypeReasonInputValue, reasonInputValue)}
          </InputWrapper>
        </ContentWrapper>
      </Section>
    );
  };

  renderButtonsActions = (): Object => {
    const { moneyInputValue, reasonInputValue } = this.state;

    const isOkButtonDisabled = !(moneyInputValue && reasonInputValue);

    return (
      <DialogActions>
        <Button
          onClick={this.onClickCancelButton}
          color="primary"
        >
          Cancelar
        </Button>
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

  render() {
    const { onToggleMoneyDialog, isOpen } = this.props;

    return (
      <Dialog
        aria-describedby="alert-dialog-slide-description"
        aria-labelledby="alert-dialog-slide-title"
        onClose={onToggleMoneyDialog}
        TransitionComponent={renderSlide}
        disableBackdropClick
        keepMounted={false}
        open={isOpen}
        maxWidth="xs"
        fullWidth
      >
        {this.renderTitle()}
        <DialogContent>
          {this.renderInputMoneySection()}
          {this.renderInputReasonSection()}
        </DialogContent>
        {this.renderButtonsActions()}
      </Dialog>
    );
  }
}

export default InitialMoneyCashDialog;
