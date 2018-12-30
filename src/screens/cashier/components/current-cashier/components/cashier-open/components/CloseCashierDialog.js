// @flow

import React, { Component } from 'react';

import AccountCircleOutlined from '@material-ui/icons/AccountCircle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';

import styled from 'styled-components';
import moment from 'moment';

import { CONFIGS_TYPES, getBottomValueItemConfig } from '../../../../bottom-valeus/item-config';

const ValuesContainer = styled.div`
  margin-top: 24px;
  border-radius: 6px;
  border: 1.5px solid ${({ theme }) => theme.colors.inputBorder};
`;

const Divider = styled.div`
  width: 100%;
  height: 2px;
  background-color: ${({ theme }) => theme.colors.inputBorder};
`;

const DateText = styled.p`
  margin-top: 2px;
  margin-right: 8px;
  font-size: 18px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.darkText};
`;

const ItemWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ItemRowWrapper = styled.div`
  padding: 16px;
`;

const IconTextWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const IconWrapper = styled.div`
  width: 38px;
  height: 38px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 16px;
  border-radius: 19px;
  background-color: ${({ theme, color }) => theme.colors[color]}
`;

const ItemText = styled.span`
  font-size: 18px
  font-weight: 600;
  color: ${({ theme }) => theme.colors.darkText};
`;

const ValueText = styled.p`
  margin: 2px 0 2px 6px;
  font-size: 18px
  font-weight: 400;
  color: ${({ theme }) => theme.colors.darkText};
`;

const ItemTextWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const UserSectionWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const UserIcon = styled(({ ...props }) => (
  <AccountCircleOutlined
    {...props}
  />
))`
  color: ${({ theme }) => theme.colors.white}
`;

type Props = {
  onToggleCloseCashierDialog: Function,
  initialMoneyInCashier: string,
  onFinishCashier: Function,
  totalOutputCashier: number,
  totalInputCashier: number,
  totalProfit: number,
  isOpen: boolean,
};

type State = {
  buttonClicked: string,
};

class CloseCashierDialog extends Component<Props, State> {
  state = {
    buttonClicked: '',
  };

  onDialogDisappear = (): void => {
    const { onFinishCashier } = this.props;
    const { buttonClicked } = this.state;

    if (buttonClicked === 'ok') {
      onFinishCashier();
    }
  };

  onClickButton = (buttonClicked: string): void => {
    const { onToggleCloseCashierDialog } = this.props;

    this.setState({
      buttonClicked,
    }, () => onToggleCloseCashierDialog());
  };

  renderSlide = (props: Object): Object => (
    <Slide
      direction="up"
      {...props}
    />
  );

  renderTitle = (): Object => (
    <DialogTitle
      id="alert-dialog-slide-title"
    >
      Close Cashier
    </DialogTitle>
  );

  renderActionButtons = (): Object => (
    <DialogActions>
      <Button
        onClick={() => this.onClickButton('cancel')}
        color="primary"
      >
        CANCEL
      </Button>
      <Button
        onClick={() => this.onClickButton('ok')}
        color="primary"
      >
        OK
      </Button>
    </DialogActions>
  );

  renderItem = (config: Object) => {
    const {
      message,
      value,
      Icon,
      color,
    } = config;

    return (
      <ItemWrapper>
        <IconTextWrapper>
          <IconWrapper
            color={color}
          >
            <Icon />
          </IconWrapper>
          <ItemTextWrapper>
            <ItemText>
              {message}
            </ItemText>
            <ValueText>
              {value}
            </ValueText>
          </ItemTextWrapper>
        </IconTextWrapper>
      </ItemWrapper>
    );
  };

  renderTotalInputCashier = (): Object => {
    const { totalInputCashier } = this.props;
    const config = getBottomValueItemConfig(CONFIGS_TYPES.TOTAL_INPUT, totalInputCashier);

    return (
      <ItemRowWrapper>
        {this.renderItem(config)}
      </ItemRowWrapper>
    );
  };

  renderTotalOutputCashier = (): Object => {
    const { totalOutputCashier } = this.props;
    const config = getBottomValueItemConfig(CONFIGS_TYPES.TOTAL_OUTPUT, totalOutputCashier);

    return (
      <ItemRowWrapper>
        {this.renderItem(config)}
      </ItemRowWrapper>
    );
  };

  renderInitialCashier = (): Object => {
    const { initialMoneyInCashier } = this.props;
    const config = getBottomValueItemConfig(CONFIGS_TYPES.INITAL_MONEY, initialMoneyInCashier);

    return (
      <ItemRowWrapper>
        {this.renderItem(config)}
      </ItemRowWrapper>
    );
  };

  renderTotalProfit = (): Object => {
    const { totalProfit } = this.props;
    const config = getBottomValueItemConfig(CONFIGS_TYPES.TOTAL_PROFIT_FINISH_CASHIER, totalProfit);

    return (
      <ItemRowWrapper>
        {this.renderItem(config)}
      </ItemRowWrapper>
    );
  };

  renderSalesmanInfo = (salesman: string): Object => {
    const config = {
      message: salesman,
      color: 'inputBorder',
      Icon: UserIcon,
    };

    return this.renderItem(config);
  };

  renderSalesmanSection = (salesman: string): Object => (
    <UserSectionWrapper>
      {this.renderSalesmanInfo(salesman)}
      <DateText>
        {moment().format('ll')}
      </DateText>
    </UserSectionWrapper>
  );

  renderContent = (): Object => {
    const {
      initialMoneyInCashier,
      totalOutputCashier,
      totalInputCashier,
      totalProfit,
      salesman,
    } = this.props;

    return (
      <DialogContent>
        {this.renderSalesmanSection(salesman)}
        <ValuesContainer>
          {this.renderInitialCashier(initialMoneyInCashier)}
          <Divider />
          {this.renderTotalInputCashier(totalInputCashier)}
          <Divider />
          {this.renderTotalOutputCashier(totalOutputCashier)}
          <Divider />
          {this.renderTotalProfit(totalProfit)}
        </ValuesContainer>
      </DialogContent>
    );
  };

  render() {
    const { onToggleCloseCashierDialog, isOpen } = this.props;

    return (
      <Dialog
        aria-describedby="alert-dialog-slide-description"
        aria-labelledby="alert-dialog-slide-title"
        TransitionComponent={this.renderSlide}
        onClose={onToggleCloseCashierDialog}
        onExited={this.onDialogDisappear}
        disableBackdropClick
        open={isOpen}
      >
        {this.renderTitle()}
        {this.renderContent()}
        {this.renderActionButtons()}
      </Dialog>
    );
  }
}

export default CloseCashierDialog;
