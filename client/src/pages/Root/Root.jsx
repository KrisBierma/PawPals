import React from 'react';
import Header from '../../components/Header'
import LandingPage from '../LandingPage/LandingPage'

// Todo: set this up to pass in currently selected page

export default function Root() {
    return (
        <>
            <Header isLoggedIn={false}/>
            <LandingPage/>
        </>
    );
}