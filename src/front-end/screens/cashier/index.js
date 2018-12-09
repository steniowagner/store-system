// @flow

import React from 'react';

import SwipeableViews from 'react-swipeable-views';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import styled from 'styled-components';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Creators as CashierCreators } from '../../store/ducks/cashier';

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

const renderTabs = (lastTabIndexSelected: number, setTabIndex: Function): Object => (
  <TabWrapper>
    <Tabs
      onChange={(_, currentTabIndex: number): void => setTabIndex(currentTabIndex)}
      value={lastTabIndexSelected}
      indicatorColor="primary"
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

const renderCurrentCashierTab = (): Object => (
  <TabContainer
    dir="ltr"
  >
    <CurrentCashier />
  </TabContainer>
);

const renderPastCashiersTab = (): Object => (
  <TabContainer
    dir="ltr"
  >
    <PastCashiers />
  </TabContainer>
);

const renderTabsContent = (lastTabIndexSelected: number, setTabIndex: Function): Object => (
  <SwipeableViewsContainer>
    <SwipeableViews
      onChangeIndex={(currentTabIndex: number): void => setTabIndex(currentTabIndex)}
      index={lastTabIndexSelected}
      axis="x"
    >
      {renderCurrentCashierTab()}
      {renderPastCashiersTab()}
    </SwipeableViews>
  </SwipeableViewsContainer>
);

type Props = {
  setTabIndex: Function,
  cashier: Object,
};

const Cashier = ({ setTabIndex, cashier }: Props): Object => {
  const { lastTabIndexSelected } = cashier.tabInfo;

  return (
    <Container>
      <Wrapper>
        {renderTabs(lastTabIndexSelected, setTabIndex)}
        {renderTabsContent(lastTabIndexSelected, setTabIndex)}
      </Wrapper>
    </Container>
  );
};

const mapDispatchToProps = dispatch => bindActionCreators(CashierCreators, dispatch);

const mapStateToProps = state => ({
  cashier: state.cashier,
});

export default connect(mapStateToProps, mapDispatchToProps)(Cashier);
