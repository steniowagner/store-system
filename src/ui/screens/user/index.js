import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import Table from '../../components/common/table';

import SectionTitle from '../../components/common/SectionTitle';

class User extends Component {
  render() {
    return (
      <Fragment>
        <SectionTitle
          title="Usuários"
        />
        <Table />
      </Fragment>
    );
  }
}

export default User;
