import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import { LandingPage, BrowsePage, FavoritesPage, NewsPage, PetDetailsPage, AdminPage } from './pages'
import { Header, AuthProvider, PrivateRoute } from './components'
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom';

// Todo: determine if we are logged in or not, pass as props to Skeleton
// Todo: fix style so "page" does not render behind Header (for example Landing Page)
// The last route is for unknown paths

class App extends Component {
  render() {
    return (
      <div className="App">
        <AuthProvider>
          <Router>
            <Header />
            <Switch>
              <Route exact path="/" component={LandingPage}/>         
              <Route exact path="/browse" component={BrowsePage}/>
              <PrivateRoute exact path="/favorites" component={FavoritesPage}/>
              <Route exact path="/news" component={NewsPage}/>
              <Route exact path="/pet-profile/:id" component={PetDetailsPage} />
              <Route exact path="/admin" component={AdminPage}/>
              <Route component={LandingPage} />
            </Switch>
          </Router>         
        </AuthProvider>
      </div>
    );
  }
}

export default App;
