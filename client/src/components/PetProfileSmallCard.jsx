import React, { useState, useEffect } from "react";
import { BasicCard } from './Common';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

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
        axios.post(`/api/addFav/${animal.animalid}/${userID}`)
        .then()
        .catch(err => console.log(err));
    }

    function unfavorite() {
        axios.delete(`/api/deleteFav/${animal.animalid}/${userID}`)
        .then()
        .catch(err => console.log(err));
    }

    const onPetProfileClick = (animal) => {
        localStorage.setItem("selectedPainting", JSON.stringify(animal)); //store complete card
        return <Redirect to={`/pet-details/${animal.id}`} />; //For this you must have Route to handle this request
    }

    const classNames = {
        card: 'petProfileCard',
        image: 'petProfileImage',
    }

    return (
        <BasicCard 
            key={animal?.animalid}
            title={animal?.aname} 
            body={animal?.availability} 
            icon={isFavorited()} 
            image={animal?.imageurl}
            className={classNames}
            onCardClick={() => onPetProfileClick(animal)}
        />
    )
}