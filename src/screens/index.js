import React, { Component } from 'react';
import { injectGlobal } from 'styled-components';

import Sidebar from '../components/Sidebar';
import User from './user';

injectGlobal`
  * { margin:0; padding:0; box-sizing:border-box; }

  body > #root > div {
    background-color: #FAFBFF;
    display: block;
    height: 100vh;    
  },
`;

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
