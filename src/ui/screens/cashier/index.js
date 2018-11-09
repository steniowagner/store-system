// @flow

import React, { Component } from 'react';

import SwipeableViews from 'react-swipeable-views';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import styled from 'styled-components';

import CurrentCashier from './components/current-cashier';
import PastCashiers from './components/PastCashiers';

const Container = styled.div`
  width: 100%;
  height: 100%;
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

class Cashier extends Component {
  state = {
    currentTabIndex: 0,
  };

  handleChangeTab = (_, currentTabIndex: number): void => {
    this.setState({ currentTabIndex });
  };

  handleChangeTabIndex = (currentTabIndex: number): void => {
    this.setState({ currentTabIndex });
  };

  renderTabs = (): Object => {
    const { currentTabIndex } = this.state;

    return (
      <Tabs
        onChange={this.handleChangeTab}
        value={currentTabIndex}
        indicatorColor="primary"
        textColor="primary"
      >
        <Tab label="CAIXA ATUAL" />
        <Tab label="CAIXAS ANTERIORES" />
      </Tabs>
    );
  };

  renderTabsContent = (): Object => {
    const { currentTabIndex } = this.state;

    return (
      <SwipeableViewsContainer>
        <SwipeableViews
          onChangeIndex={this.handleChangeTabIndex}
          index={currentTabIndex}
          axis="x"
        >
          {this.renderCurrentCashierTab()}
          {this.renderPastCashiersTab()}
        </SwipeableViews>
      </SwipeableViewsContainer>
    );
  };

  renderCurrentCashierTab = (): Object => {
    return (
      <TabContainer
        dir="ltr"
      >
        <CurrentCashier />
      </TabContainer>
    );
  };

  renderPastCashiersTab = (): Object => {
    return (
      <TabContainer
        dir="ltr"
      >
        <PastCashiers />
      </TabContainer>
    );
  }

  render() {
    return (
      <Container>
        {this.renderTabs()}
        {this.renderTabsContent()}
      </Container>
    );
  }
}

export default Cashier;
