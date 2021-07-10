import React, { useState, useEffect } from "react";
import { GridLayout } from "../components/Common"
import axios from 'axios';

export default function BrowsePage() {
    const [animals, setAnimals] = useState([]);
    // to-do: set userID to null, get new id when user is logged in; for now it's set to 1
    const [userID, setUserID] = useState(1);
    const [availabilities, setAvailabilities] = useState(1);
    const [breeds, setBreeds] = useState(1);

    useEffect(() => {
        getAnimals();
        getDropdownInfo();
    }, []);


// front end
// btn click or enter the page
// api call to /api/getanimals


// back end
// routes to look for that api 
// controller with direction for the db
// db and get data

    function getAnimals() {
        axios.get(`/api/getAnimalsWiFavs/${userID}`)
        .then(response => {
            console.log(response.data);
            setAnimals(response.data);
        }).catch(err =>console.log(err));
    }

    // for populating the dropdown menu; use id as key 
    function getDropdownInfo() {
        axios.get(`/api/getAvailabilities`)
        .then(response => {
            console.log(response.data);
            setAvailabilities(response.data);
        })
        axios.get(`/api/getBreeds`)
        .then(response => {
            console.log(response.data);
            setBreeds(response.data);
        })
    }

    return (
        <div>
            {/* breeds dropdown  */}
            <p>All animals are shown regarless if user is logged in or not.</p>
            <p>If user is logged in, check favUserID to see if it's favorited. If favUserID == null, then it's not favorited.</p>
            <GridLayout cardData={animals} />
        </div>
    )
}