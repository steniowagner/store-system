// @flow

import React, { Component } from 'react';

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import { Link } from 'react-router-dom';

import items from './items';

class NavigationMenu extends Component {
  state = {
    currentTabIndex: 0,
  };

  handleChangeTab = (_: any, currentTabIndex: number): void => {
    this.setState({ currentTabIndex });
  };

  render() {
    const { currentTabIndex } = this.state;

    return (
      <AppBar
        style={{ position: 'fixed', marginTop: 48 }}
        position="static"
        color="secondary"
      >
        <Tabs
          onChange={this.handleChangeTab}
          indicatorColor="primary"
          value={currentTabIndex}
          textColor="primary"
          scrollable={false}
          scrollButtons="on"
          centered
        >
          {items.map((item) => {
            const { Icon, title, route } = item;

            return (
              <Tab
                component={Link}
                icon={<Icon />}
                label={title}
                key={route}
                to={route}
              />
            );
          })}
        </Tabs>
      </AppBar>
    );
  }
}

export default NavigationMenu;
