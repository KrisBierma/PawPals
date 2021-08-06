import React, { Component } from 'react';
import './App.css';
import { LandingPage, BrowsePage, FavoritesPage, NewsPage, PetDetailsPage, AdminPage, AddEditPetPage } from './pages'
import { Header, AuthProvider, PrivateRoute } from './components'
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom';
import Footer from "./components/Footer";

// The last route is for unknown paths
class App extends Component {
  render() {
    return (
      <div className="App d-flex flex-column min-vh-100">
        <AuthProvider>
          <Router>
            <Header />
            <div className={"paddingBottom"}></div>
            <Switch>
              <Route exact path="/" component={LandingPage}/>         
              <Route exact path="/browse" component={BrowsePage}/>
              <PrivateRoute exact path="/favorites" component={FavoritesPage}/>
              <Route exact path="/news" component={NewsPage}/>
              <PrivateRoute exact path="/admin" component={AdminPage}/>
              <PrivateRoute path="/admin/add-edit-pet" component={AddEditPetPage} />
              <Route exact path="/pet-profile/:id" component={PetDetailsPage} />
              <Route component={LandingPage} />
            </Switch>
            <Footer />
          </Router>         
        </AuthProvider>
      </div>
    );
  }
}

export default App;
