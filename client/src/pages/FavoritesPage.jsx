import React, {useState, useEffect} from 'react';
import axios from 'axios';

export default function FavoritesPage() {
const [favs, setFavs] = useState(false);
  useEffect(() => {
    getFavs();
  }, []);
const [userID, setUserID] = useState(1);

function getFavs() {
  axios.get(`/api/getFavs/${userID}`)
    .then(response => {
      console.log(response.data);
      setFavs(response.data);
    })
  }
  return (
    <div>
      { favs ? 'My favorite animals:' : 'No favorites yet' }
      {favs ? 
        <ul>
          { favs.map(animal => <li>{`${animal.aname}: ${animal.adescription}`}</li>)}
        </ul>          
      : <p />}
    </div>
  )
  // return "Hello I am the FAVORITES Page";
}