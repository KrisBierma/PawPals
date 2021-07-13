import React, {useState, useEffect} from 'react';
import { GridLayout } from "../components/Common"
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
      {favs && <GridLayout cardData={favs} />}
    </div>
  )
  // return "Hello I am the FAVORITES Page";
}