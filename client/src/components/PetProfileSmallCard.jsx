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
        return (heartFull ? <i onClick={heartClick} class="bi bi-heart-fill"></i> : <i onClick={heartClick} class="bi bi-heart"></i>)
    }

    return (
        <BasicCard title={animal?.aname} body={animal?.availabilityid} icon={isFavorited()} />
    )
}