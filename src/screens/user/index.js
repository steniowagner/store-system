import React, { Component } from 'react';
import styled from 'styled-components';

import PageTitle from '../../components/common/PageTitle';
import Container from '../../components/common/Container';

class User extends Component {
  render() {
    return (
      <Container>
        <PageTitle title="Usuários" />
      </Container>
    );
  }
}

export default User;
