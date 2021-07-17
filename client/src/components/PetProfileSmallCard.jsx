import React, { useState, useEffect } from "react";
import { BasicCard } from './Common';
import { isFavorited } from '../js-commons/petFavoriting';

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

    const classNames = {
        card: 'petProfileCard',
        image: 'petProfileImage',
    }

    return (
        <BasicCard 
            key={animal?.animalid}
            title={animal?.aname} 
            body={animal?.availability} 
            icon={isFavorited(heartFull, setHeartFull, animal.animalid, userID)} 
            image={animal?.imageurl}
            className={classNames}
        />
    )
}