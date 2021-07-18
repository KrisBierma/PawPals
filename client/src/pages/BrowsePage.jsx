import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from '../components/AuthContext';
import { GridLayout } from "../components/Common"
import axios from 'axios';

export default function BrowsePage() {
    const [animals, setAnimals] = useState([]);
    const [availabilities, setAvailabilities] = useState(1);
    const [breeds, setBreeds] = useState(1);
    const context = useContext(AuthContext);

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
        axios.get(`/api/getAnimalsWiFavs/${context.userID}`)
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