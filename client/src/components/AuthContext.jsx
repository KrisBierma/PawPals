import React, { useEffect, useState } from 'react';
import axios from 'axios';

// wraps the router in app.js
// finds out if logged in and keeps that value
export default function AuthProvider(props) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [dataSet, setDataSet] = useState(false);
  const [userName, setUserName] = useState(null);
  const [userID, setUserID] = useState(null);
  const [userRole, setUserRole] = useState(null);
  
  function reset() {
    if(!isLoggedIn) {
      setUserName(null);
      setUserID(null);
      setUserRole(null);
    }
  }

  useEffect(() => {
    async function isAuthenticated() {
      axios.get('/auth/isAuthenticated')
        .then(res => {
          setIsLoggedIn(res.data);
          setIsLoaded(true);
          if(!res.data) reset()
          else if(res.data && userName === null) {
            getSession()
          };
        })
        .catch(err => {
          console.log(err);
          if (typeof err === 'boolean') return err;
        });
    }

    // called in case user reloads page while logged in
    async function getSession() {
      axios.get('/auth/getSession')
        .then(res => {
          setUserName(res.data.username);
          setUserID(res.data.id);
          setUserRole(res.data.userroleid);
          setDataSet(true);
        })
        .catch(err => console.log(err));
    }
    isAuthenticated();
  });

  // check if auth is validated
  // if so, check if the user is logged in but the data isn't set (happens when page is refreshed)
  return !isLoaded 
    ? <div>Loading</div>
      : isLoggedIn && !dataSet
        ? <div>Loading</div>
          : <AuthContext.Provider
            value={{
              isLoggedIn, setIsLoggedIn,
              userName, setUserName,
              userID, setUserID,
              userRole, setUserRole,
              dataSet, setDataSet,
            }}
      >
        {props.children}
      </AuthContext.Provider>
}

// creates the context "global variables" so all components have access to isLoggedIn
export const AuthContext = React.createContext();