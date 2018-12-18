import React, { Component } from 'react';
import './App.css';
import Main from './main.js'
import Header from './header.js'

class App extends Component {
  render() {
    return (
      <div>
        <Header >
          <Main />
        </Header>

      </div>
      );
  }
}

export default App;
