import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = {
    someData: null
  };

  // these two functions are just to make sure server is connected
  componentDidMount() {
    this.connectToServer()
      .then(res => this.setState({someData: res.express}))
      .catch(err => console.log(err));
  };

  connectToServer = async () => {
    const res = await fetch("/connectToServer");
    const body = await res.json();
    if(res.status !== 200) throw Error(body.message);
    return body;
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          <p>{this.state.someData}</p>
        </header>
      </div>
    );
  }
}

export default App;
