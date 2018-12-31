// @flow

import React, { Component } from 'react';

import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import Money from '@material-ui/icons/AttachMoney';

import styled from 'styled-components';

import Input from '../../../../../../../components/common/CustomInput';

const ContentWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 24px;
`;

const IconWrapper = styled.div`
  width: 48px;
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 16px;
  border-radius: 24px;
  background-color: ${({ theme }) => theme.colors.inputBorder};
`;

const InputWrapper = styled.div`
  width: 60%;
`;

const MoneyIcon = styled(({ ...props }) => (
  <Money
    {...props}
  />
))`
  color: ${({ theme }) => theme.colors.white}
`;

type Props = {
  onToggleInitialMoneyDialog: Function,
  onTypeInitialMoney: Function,
  onSetInitialMoney: Function,
  initialMoney: string,
  isOpen: boolean,
};

type State = {
  buttonClicked: string,
};

class InitialMoneyCashDialog extends Component<Props, State> {
  state = {
    buttonClicked: '',
  };

  onDialogDisappear = (): void => {
    const { onSetInitialMoney } = this.props;
    const { buttonClicked } = this.state;

    if (buttonClicked === 'ok') {
      onSetInitialMoney();
    }
  };

  onClickButton = (buttonClicked: string): void => {
    const { onToggleInitialMoneyDialog } = this.props;

    this.setState({
      buttonClicked,
    }, () => onToggleInitialMoneyDialog());
  };

  renderSlide = (props: Object): Object => (
    <Slide
      direction="up"
      {...props}
    />
  );

  renderInitialMoneyInput = (): Object => {
    const { onTypeInitialMoney, initialMoney } = this.props;

    return (
      <Input
        onChange={event => onTypeInitialMoney(event.target.value)}
        value={initialMoney}
        onBlur={() => {}}
        id="initial-money"
        placeholder=""
        type="number"
        autoFocus
        error=""
      />
    );
  };

  renderContentText = (): Object => (
    <DialogContentText>
      To start operations, report the quantity of money in the Cashier.
    </DialogContentText>
  );

  renderTitle = (): Object => (
    <DialogTitle
      id="alert-dialog-slide-title"
    >
      Money in Cashier
    </DialogTitle>
  );

  renderButtonsActions = (): Object => {
    const { initialMoney } = this.props;

    return (
      <DialogActions>
        <Button
          onClick={() => this.onClickButton('cancel')}
          color="primary"
        >
          Cancel
        </Button>
        <Button
          onClick={() => this.onClickButton('ok')}
          disabled={!initialMoney}
          color="primary"
        >
          Ok
        </Button>
      </DialogActions>
    );
  };

  renderContent = (): Object => {
    const { onTypeInitialMoney, initialMoney } = this.props;

    return (
      <DialogContent>
        {this.renderContentText()}
        <ContentWrapper>
          <IconWrapper>
            <MoneyIcon />
          </IconWrapper>
          <InputWrapper>
            {this.renderInitialMoneyInput(onTypeInitialMoney, initialMoney)}
          </InputWrapper>
        </ContentWrapper>
      </DialogContent>
    );
  };

  render() {
    const { onToggleInitialMoneyDialog, isOpen } = this.props;

    return (
      <Dialog
        aria-describedby="alert-dialog-slide-description"
        aria-labelledby="alert-dialog-slide-title"
        TransitionComponent={this.renderSlide}
        onClose={onToggleInitialMoneyDialog}
        onExited={this.onDialogDisappear}
        disableBackdropClick
        keepMounted={false}
        maxWidth="xs"
        open={isOpen}
      >
        {this.renderTitle()}
        {this.renderContent()}
        {this.renderButtonsActions()}
      </Dialog>
    );
  }
}

export default InitialMoneyCashDialog;
