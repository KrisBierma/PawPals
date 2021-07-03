import React from 'react';
import Header from '../../components/Header'
import LandingPage from '../LandingPage/LandingPage'
import BrowsePage from '../BrowsePage/BrowsePage'
import FavoritesPage from '../FavoritesPage/FavoritesPage'
import NewsPage from '../NewsPage/NewsPage'
import { BrowserRouter as Router } from 'react-router-dom';
import { Route } from "react-router";

// Todo: set this up to pass in currently selected page

export default function Root() {
    return (
        <>
        <Router>
            <Route>
            <Header isLoggedIn={false}/>         

            <Route path="/" exact strict component={LandingPage}/>
            <Route path="/browse" component={BrowsePage}/>
            <Route path="/favorites" component={FavoritesPage}/>
            <Route path="/news" component={NewsPage}/>
            </Route>
        </Router>
        </>
        
    );
}