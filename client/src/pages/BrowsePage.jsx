import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from '../components/AuthContext';
import { GridLayout } from "../components/Common"
import axios from 'axios';
import SearchFilter from "../components/Common/SearchFilter";


export default function BrowsePage() {
    const [animals, setAnimals] = useState([]);
    const [breeds, setBreeds] = useState([]);
    const context = useContext(AuthContext);
    const [filterOption, setFilterOption] = useState({
        atype: "",
        breed: "",
        gender: "",
        availability: "",
    });

    useEffect(() => {
        getAnimals(filterOption.atype, filterOption.gender, filterOption.breed, filterOption.availability);
    }, [filterOption.atype, filterOption.gender, filterOption.breed, filterOption.availability]);

    useEffect(() => {
        if (filterOption.atype) getBreeds(filterOption.atype);
    }, [filterOption.atype]);


    // front end
    // btn click or enter the page
    // api call to /api/getanimals


    // back end
    // routes to look for that api 
    // controller with direction for the db
    // db and get data
    const getBreeds = async (atype) => {
        try {
            const response = await axios.get(`/api/getBreedsWithID/${atype}`);
            setBreeds(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const getAnimals = async (atype, gender, breed, availability) => {
        axios.get(`/api/getAnimalsWiAllFilter/`, {
                params: {
                    userID: context.userID === null ? -1 : context.userID,
                    atype,
                    gender,
                    breed,
                    availability
                },
            })
            .then((response) => {
                setAnimals(response.data);
            })
            .catch((err) => console.log(err));
    };

    const onChangeFilter = (e) => {
        setFilterOption({ ...filterOption, [e.target.name]: e.target.value });
    };

    return (
        <div>
            <div style={{maxWidth:"1000px"}}><SearchFilter onChange={onChangeFilter} breeds={breeds} page='browse' /></div>
            { animals.length === 0 ? <p>All our animals currently have homes!</p> : <p></p>}
            <GridLayout cardData={animals} />
        </div>
    )
}