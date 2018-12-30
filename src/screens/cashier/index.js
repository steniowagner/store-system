// @flow

import React, { Component } from 'react';

import SwipeableViews from 'react-swipeable-views';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import styled from 'styled-components';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Creators as CashierCreators } from '../../store/ducks/cashier';

import CurrentCashier from './components/current-cashier';
import Snackbar from '../../components/common/Snackbar';
import PastCashiers from './components/past-cashier';

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

const Wrapper = styled(Paper)`
  margin-bottom: 24px;
  padding: 16px 32px 0 32px;
`;

const SwipeableViewsContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const TabContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 32px 0;
`;

const TabWrapper = styled.div`
  margin-left: 4px;
`;

type Props = {
  getAllCashiers: Function,
  setTabIndex: Function,
  cashier: Object,
};

type State = {
  isSnackbarOpen: boolean,
};

class Cashier extends Component<Props, State> {
  state = {
    isSnackbarOpen: false,
  };

  componentWillReceiveProps(nextProps) {
    const { message, error } = nextProps.cashier;

    if (message || error) {
      this.setState({
        isSnackbarOpen: true,
      });
    }
  }

  renderTabs = (): Object => {
    const { cashier, setTabIndex, getAllCashiers } = this.props;
    const { tabInfo } = cashier;

    return (
      <TabWrapper>
        <Tabs
          onChange={(_, currentTabIndex: number): void => {
            setTabIndex(currentTabIndex);
            getAllCashiers();
          }}
          value={tabInfo.lastTabIndexSelected}
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab
            label="CURRENT CASHIER"
          />
          <Tab
            label="PAST CASHIERS"
          />
        </Tabs>
      </TabWrapper>
    );
  };

  renderCurrentCashierTab = (): Object => (
    <TabContainer
      dir="ltr"
    >
      <CurrentCashier />
    </TabContainer>
  );

  renderPastCashiersTab = (): Object => (
    <TabContainer
      dir="ltr"
    >
      <PastCashiers />
    </TabContainer>
  );

  renderTabsContent = (): Object => {
    const { cashier, setTabIndex } = this.props;
    const { lastTabIndexSelected } = cashier.tabInfo;

    return (
      <SwipeableViewsContainer>
        <SwipeableViews
          onChangeIndex={(currentTabIndex: number): void => setTabIndex(currentTabIndex)}
          index={lastTabIndexSelected}
          axis="x"
        >
          {this.renderCurrentCashierTab()}
          {this.renderPastCashiersTab()}
        </SwipeableViews>
      </SwipeableViewsContainer>
    );
  };

  renderSnackbar = (): Object => {
    const { isSnackbarOpen } = this.state;
    const { cashier } = this.props;

    const { message, error } = cashier;

    return (
      <Snackbar
        onCloseSnackbar={() => this.setState({ isSnackbarOpen: false })}
        isOpen={isSnackbarOpen}
        message={message}
        error={error}
      />
    );
  };

  render() {
    return (
      <Container>
        <Wrapper>
          {this.renderTabs()}
          {this.renderTabsContent()}
        </Wrapper>
        {this.renderSnackbar()}
      </Container>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators(CashierCreators, dispatch);

const mapStateToProps = state => ({
  cashier: state.cashier,
});

export default connect(mapStateToProps, mapDispatchToProps)(Cashier);
