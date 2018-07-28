import React, { Component } from 'react';

import Sidebar from '../components/Sidebar';
import User from './user';

import './styles/global';

class App extends Component {
  render() {
    return (
      <div>
        <Sidebar />
        <User />
      </div>
    );
  }
}

export default App;
