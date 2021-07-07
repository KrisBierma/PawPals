import React, { useState, useEffect } from "react";
import { GridLayout } from "../components/Common"
import axios from 'axios';

export default function BrowsePage() {
    const [animals, setAnimals] = useState([]);

    useEffect(() => {
        getAnimals();
    }, []);

    function getAnimals() {
        axios.get('/api/getanimals')
        .then(response => {
            console.log(response.data);
            setAnimals(response.data);
        })
    }

    return (
        <GridLayout cardData={animals} />
    )
}