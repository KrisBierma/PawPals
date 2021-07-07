import React, { useState, useEffect } from "react";
import { BasicCard } from './Common'

// TODO: Update availablility id to availability string
// TODO: Add in callback to update database when heart is clicked

export default function PetProfileSmallCard({
    animal = {}
}) {
    const [heartFull, setHeartFull] = useState(false);

    useEffect(() => {
        // if the animal is favorited, make our heart icon a full icon
        if (animal?.favorited === true){
            setHeartFull(true);
        }
    }, [animal]);

    function heartClick() {
        // add in callback to update database here
        setHeartFull(!heartFull);
    }

    function isFavorited() {
        return (heartFull ? <i onClick={heartClick} className="bi bi-heart-fill"></i> : <i onClick={heartClick} className="bi bi-heart"></i>)
    }

    return (
        <BasicCard 
            title={animal?.aname} 
            body={animal?.availabilityid} 
            icon={isFavorited()} 
            image={'https://s3.amazonaws.com/cdn-origin-etr.akc.org/wp-content/uploads/2017/11/31120615/French-Bulldog-standing-in-profile-outdoors-in-the-fall.jpg'} 
        />
    )
}