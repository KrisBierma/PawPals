import React, { useState, useEffect } from "react";
import { GridLayout } from "../components/Common"
import axios from 'axios';

export default function BrowsePage() {
    const [animals, setAnimals] = useState([]);
    // to-do: set userID to null, get new id when user is logged in; for now it's set to 1
    const [userID, setUserID] = useState(1);

    useEffect(() => {
        getAnimals();
    }, []);

    function getAnimals() {
        axios.get(`/api/getAnimalsWiFavs/${userID}`)
        .then(response => {
            console.log(response.data);
            setAnimals(response.data);
        })
    }

    return (
        <div>
            <p>All animals are shown regarless if user is logged in or not.</p>
            <p>If user is logged in, check favUserID to see if it's favorited. If favUserID == null, then it's not favorited.</p>
            <GridLayout cardData={animals} />
        </div>
    )
}