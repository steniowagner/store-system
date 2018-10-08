// @flow

import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';

import { Link } from 'react-router-dom';
import styled from 'styled-components';

import ItemList from './components/ItemList';
import config from './config';

const DRAWER_WIDTH = 300;

const styles = theme => ({
  toolbar: theme.mixins.toolbar,
});

const CustomSidebar = styled(Drawer).attrs({
  variant: 'permanent',
  anchor: 'left',
})`
  width: ${DRAWER_WIDTH};
  position: relative;
  z-index: 2;
`;

const CustomLink = styled(Link)`
  color: inherit;
  text-decoration: none;
  &:focus, &:hover, &:visited, &:link, &:active {
      text-decoration: none;
  };
`;

type Props = {
  classes: Object,
};

type State = {
  indexSelected: number,
};

class Sidebar extends Component<Props, State> {
  state = {
    indexSelected: 0,
  };

  onSelectIndex = (indexSelected: number): void => {
    this.setState({
      indexSelected,
    });
  }

  render() {
    const { indexSelected } = this.state;
    const { classes } = this.props;

    return (
      <CustomSidebar>
        <div
          className={classes.toolbar}
        />
        <List>
          {config.map((item, index) => (
            <CustomLink
              to={item.route}
            >
              <ItemList
                key={item.route}
                onClickItem={this.onSelectIndex}
                active={indexSelected === index}
                title={item.title}
                icon={item.icon}
                index={index}
              />
            </CustomLink>
          ))}
        </List>
      </CustomSidebar>
    );
  }
}

export default withStyles(styles)(Sidebar);
