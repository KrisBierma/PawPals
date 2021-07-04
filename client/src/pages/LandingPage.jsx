import React, {useState, useEffect} from 'react';

// this is for demo purposes only to show db data; feel free to catch however
export default function LandingPage() {
const [animals, setAnimals] = useState(false);
  useEffect(() => {
    getAnimals();
  }, []);
  function getAnimals() {
    fetch('http://localhost:3001/getanimals')
      .then(response => {
          console.log(response);
        return response.text();
      })
      .then(data => {
        setAnimals(data);
      });
  }    
  return (
      <div>
          {animals ? animals : 'No animals yet'}
      </div>
  )
    // return "Woohoo Landing Page";
}
