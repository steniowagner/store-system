// @flow

import React, { Component, Fragment } from 'react';

import DialogContentText from '@material-ui/core/DialogContentText';
import Notifications from '@material-ui/icons/Notifications';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import Badge from '@material-ui/core/Badge';

import styled from 'styled-components';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Creators as BellAlertsCreators } from '../../../../../store/ducks/alerts';

const ContentContainer = styled.div`
  margin-top: 14px;
  border-radius: 6px;
`;

const ItemContainer = styled.div`
  width: 100%;
  height: 48px;
  margin-bottom: 18px;
  display: flex;
  align-items: center;
`;

const TextWrapper = styled.div`
  width: 100%:
  height: 100%;
  display: flex;
  align-items: center;
  padding: 8px 8px 8px 0;
`;

const ValueText = styled.p`
  font-size: 18px;
  color: ${({ theme }) => theme.colors.white};
`;

const ValueWrapper = styled.div`
  width: 42px;
  height: 42px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 16px;
  border-radius: 21px;
  background-color: ${({ theme }) => theme.colors.affirmative};
`;

const Text = styled.p`
  font-size: 18px;
`;

const NotificationsIcon = styled(Notifications)`
  color: ${({ theme }) => theme.colors.headerText};
`;

type Props = {
  getNumberBudgetsOutOfDate: Function,
  getNumberCustomersInDebit: Function,
  getNumberStockUnderMin: Function,
  numberBudgetsOutOfDate: number,
  numberCustomersInDebit: number,
  numberStockUnderMin: number,
  alerts: Object,
};

type State = {
  isAlertDialogOpen: boolean,
};

class BellAlert extends Component<Props, State> {
  state = {
    isAlertDialogOpen: false,
    totalAlerts: 0,
  };

  componentDidMount() {
    const { getNumberBudgetsOutOfDate, getNumberCustomersInDebit, getNumberStockUnderMin } = this.props;

    getNumberBudgetsOutOfDate();
    getNumberCustomersInDebit();
    getNumberStockUnderMin();
  }

  componentWillReceiveProps(nextProps) {
    const { numberBudgetsOutOfDate, numberCustomersInDebit, numberStockUnderMin } = nextProps.alerts;

    const totalAlerts = numberBudgetsOutOfDate + numberCustomersInDebit + numberStockUnderMin;

    this.setState({
      totalAlerts,
    });
  }

  onToggleAlertDialog = (): void => {
    const { isAlertDialogOpen } = this.state;

    this.setState({
      isAlertDialogOpen: !isAlertDialogOpen,
    });
  };

  renderSlide = (props: Object): Object => (
    <Slide
      direction="up"
      {...props}
    />
  );

  renderTitlte = (): Object => (
    <DialogTitle
      id="alert-dialog-slide-title"
    >
      Alerts
    </DialogTitle>
  );

  renderItem = (value: number, text: string): Object => {
    if (value === 0) {
      return null;
    }

    const valueText = (value > 99 ? '99+' : value);

    return (
      <ItemContainer>
        <TextWrapper>
          <ValueWrapper>
            <ValueText>
              {valueText}
            </ValueText>
          </ValueWrapper>
          <Text>
            {text}
          </Text>
        </TextWrapper>
      </ItemContainer>
    );
  };

  renderProductsStockUnderMin = (numberStockUnderMin: number): Object => {
    return this.renderItem(numberStockUnderMin, `${(numberStockUnderMin === 1 ? 'Product' : 'Products')} with stock below minimum`);
  };

  renderBudgetsOutOfDate = (numberBudgetsOutOfDate: number): Object => {
    return this.renderItem(numberBudgetsOutOfDate, `${(numberBudgetsOutOfDate === 1 ? 'Budget' : 'Budgets')} out of Time`);
  };

  renderCustomersWithDebits = (numberCustomersInDebit: number): Object => {
    return this.renderItem(numberCustomersInDebit, `${(numberCustomersInDebit === 1 ? 'Customer' : 'Customers')} in Debit`);
  };

  renderContent = (): Object => {
    const { alerts } = this.props;
    const { numberBudgetsOutOfDate, numberCustomersInDebit, numberStockUnderMin } = alerts;

    return (
      <ContentContainer>
        {!!numberStockUnderMin && this.renderProductsStockUnderMin(numberStockUnderMin)}
        {!!numberBudgetsOutOfDate && this.renderBudgetsOutOfDate(numberBudgetsOutOfDate)}
        {!!numberCustomersInDebit && this.renderCustomersWithDebits(numberCustomersInDebit)}
      </ContentContainer>
    );
  };

  renderActionButtons = (): Object => (
    <DialogActions>
      <Button
        onClick={this.onToggleAlertDialog}
        color="primary"
      >
        OK
      </Button>
    </DialogActions>
  );

  renderDialog = (): Object => {
    const { isAlertDialogOpen, totalAlerts } = this.state;

    const shouldShowEmptyContentMessage = (totalAlerts === 0);

    return (
      <Dialog
        aria-describedby="alert-dialog-slide-description"
        aria-labelledby="alert-dialog-slide-title"
        TransitionComponent={this.renderSlide}
        onClose={this.onToggleAlertDialog}
        open={isAlertDialogOpen}
        disableBackdropClick
        maxWidth="sm"
      >
        {this.renderTitlte()}
        <DialogContent>
          {this.renderContent()}
          {shouldShowEmptyContentMessage && (
            <DialogContentText
              id="alert-dialog-slide-description"
            >
              No Messages to Show
            </DialogContentText>
          )}
        </DialogContent>
        {this.renderActionButtons()}
      </Dialog>
    );
  };

  renderBellAlert = (): Object => {
    const { totalAlerts } = this.state;

    const badgeText = (totalAlerts > 9 ? '9+' : totalAlerts);

    const IconWithBadge = (
      <Badge
        color="primary"
        badgeContent={(
          <span>
            {badgeText}
          </span>)
        }
      >
        <NotificationsIcon />
      </Badge>
    );

    return ((totalAlerts > 0) ? IconWithBadge : <NotificationsIcon />);
  };

  render() {
    return (
      <Fragment>
        <IconButton
          onClick={this.onToggleAlertDialog}
          aria-label="Icon"
          style={{
            marginRight: 8,
          }}
          color="inherit"
        >
          {this.renderBellAlert()}
        </IconButton>
        {this.renderDialog()}
      </Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators(BellAlertsCreators, dispatch);

const mapStateToProps = state => ({
  alerts: state.alerts,
});

export default connect(mapStateToProps, mapDispatchToProps)(BellAlert);
