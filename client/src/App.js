import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Root from './pages/Root/Root'
import LandingPage from './pages/LandingPage/LandingPage'
import BrowsePage from './pages/BrowsePage/BrowsePage'
import FavoritesPage from './pages/FavoritesPage/FavoritesPage'
import NewsPage from './pages/NewsPage/NewsPage'
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom';

// Todo: determine if we are logged in or not, pass as props to Skeleton
// Todo: fix style so "page" does not render behind Header (for example Landing Page)

class App extends Component {
  state = {
    isLoggedIn: false
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
    const isLoggedIn = this.state.isLoggedIn;
    return (
      <div className="App">
        <Router>
          <Root />
          <Switch>
            <Route exact path="/" component={LandingPage}/>         
            <Route exact path="/browse" component={BrowsePage}/>
            <Route exact path="/favorites" component={FavoritesPage}/>
            <Route exact path="/news" component={NewsPage}/>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
