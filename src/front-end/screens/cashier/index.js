// @flow

import React, { Component } from 'react';

import SwipeableViews from 'react-swipeable-views';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import styled from 'styled-components';

import CurrentCashier from './components/current-cashier';
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
      <TabWrapper>
        <Tabs
          onChange={this.handleChangeTab}
          indicatorColor="primary"
          value={currentTabIndex}
          textColor="primary"
        >
          <Tab
            label="CAIXA ATUAL"
          />
          <Tab
            label="CAIXAS ANTERIORES"
          />
        </Tabs>
      </TabWrapper>
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

  render() {
    return (
      <Container>
        <Wrapper>
          {this.renderTabs()}
          {this.renderTabsContent()}
        </Wrapper>
      </Container>
    );
  }
}

export default Cashier;
