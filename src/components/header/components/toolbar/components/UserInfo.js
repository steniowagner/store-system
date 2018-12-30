// @flow

import React, { Component, Fragment } from 'react';

import AssignmentInd from '@material-ui/icons/AssignmentInd';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';

import styled from 'styled-components';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Creators as CashierCreators } from '../../../../../store/ducks/cashier';
import { Creators as AuthCreators } from '../../../../../store/ducks/auth';

const UsernameText = styled.p`
  color: ${({ theme }) => theme.colors.headerText};
`;

const UserIcon = styled(AssignmentInd)`
  margin-right: 8px;
  color: ${({ theme }) => theme.colors.headerText};
`;

type Props = {
  resetMessages: Function,
  logout: Function,
  auth: Object,
};

type State = {
  anchorElement: Object,
};

class UserInfo extends Component<Props, State> {
  state = {
    anchorElement: null,
  };

  onClickButton = (event) => {
    this.setState({ anchorElement: event.currentTarget });
  };

  onClickMenuItem = () => {
    const { resetMessages, logout } = this.props;

    this.setState({
      anchorElement: null,
    }, () => {
      resetMessages();
      logout();
    });
  }

  handleCloseMenu = () => {
    this.setState({ anchorElement: null });
  };

  render() {
    const { anchorElement } = this.state;
    const { auth } = this.props;
    const { user } = auth;

    return (
      <Fragment>
        <Button
          aria-owns={anchorElement ? 'user-menu' : undefined}
          onClick={this.onClickButton}
          aria-haspopup="true"
        >
          <UserIcon />
          <UsernameText>
            {user.username}
          </UsernameText>
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorElement}
          open={Boolean(anchorElement)}
          onClose={this.handleCloseMenu}
        >
          <MenuItem
            onClick={this.onClickMenuItem}
          >
            Change User
          </MenuItem>
        </Menu>
      </Fragment>
    );
  }
}

const Creators = Object.assign({}, CashierCreators, AuthCreators);

const mapDispatchToProps = dispatch => bindActionCreators(Creators, dispatch);

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps, mapDispatchToProps)(UserInfo);
