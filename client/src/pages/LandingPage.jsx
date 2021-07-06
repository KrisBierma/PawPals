import React, {useState, useEffect} from 'react';
import axios from 'axios';

export default function LandingPage() {
const [animals, setAnimals] = useState(false);
  useEffect(() => {
    getAnimals();
  }, []);
  function getAnimals() {
    axios.get('/api/getanimals')
      .then(response => {
          console.log(response.data);
          setAnimals(response.data[0].aname);
      })
  }    
  return (
      <div>
        <p>Check out dev tools to see array of animals. Only the first animal's name will show here.</p>
          {animals ? animals : 'No animals yet'}
      </div>
  )
    // return "Woohoo Landing Page";
}
