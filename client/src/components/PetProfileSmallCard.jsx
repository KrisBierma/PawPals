import React, { useState, useEffect } from "react";
import { BasicCard } from './Common'
import axios from 'axios';

// TODO: Update availablility id to availability string

export default function PetProfileSmallCard({
    animal = {}
}) {
    const [heartFull, setHeartFull] = useState(false);
    const [userID, setUserID] = useState(1);

    useEffect(() => {
        // if the animal is favorited, make our heart icon a full icon
        if (animal?.favuserid != null){
            setHeartFull(true);
        }
    }, [animal]);

    function heartClick() {
        // call method first bc setting state takes time
        heartFull ? unfavorite() : favorite();
        setHeartFull(!heartFull);
    }

    // sets the icon based on heartFull value
    function isFavorited() {
        return (heartFull ? <i onClick={heartClick} className="bi bi-heart-fill"></i> : <i onClick={heartClick} className="bi bi-heart"></i>)
    }

    function favorite() {
        axios.post(`/api/favoriteAnimal/${animal.animalid}/${userID}`)
        .then()
        .catch(err => console.log(err));
    }

    function unfavorite() {
        axios.delete(`/api/unfavoriteAnimal/${animal.animalid}/${userID}`)
        .then()
        .catch(err => console.log(err));
    }

    return (
        <BasicCard 
            key={animal?.animalid}
            title={animal?.aname} 
            body={animal?.availability} 
            icon={isFavorited()} 
            image={animal?.imageurl}
            // image={'https://s3.amazonaws.com/cdn-origin-etr.akc.org/wp-content/uploads/2017/11/31120615/French-Bulldog-standing-in-profile-outdoors-in-the-fall.jpg'} 
        />
    )
}