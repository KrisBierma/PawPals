import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from '../components/AuthContext';
import { GridLayout } from "../components/Common"
import axios from 'axios';
import SearchFilter from "../components/Common/SearchFilter";
import '../styles/BrowsePage.css'

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

        getAnimals(filterOption.atype, filterOption.gender, filterOption.breed, filterOption.availability);
    }, [filterOption.atype, filterOption.gender, filterOption.breed, filterOption.availability, context.userID]);

    useEffect(() => {
        if (filterOption.atype) getBreeds(filterOption.atype);
    }, [filterOption.atype]);

    const getBreeds = async (atype) => {
        try {
            const response = await axios.get(`/api/getBreedsWithID/${atype}`);
            setBreeds(response.data);
        } catch (error) {
            console.log(error);
        }
    };


    const onChangeFilter = (e) => {
        setFilterOption({ ...filterOption, [e.target.name]: e.target.value });
    };

    return (
        <div>
            <SearchFilter onChange={onChangeFilter} breeds={breeds} page='browse' />
            { animals.length === 0 ? <p className='userMsg'>Either all our animals have homes or there aren't any of the type you searched for.</p> : <p></p>}
            <GridLayout cardData={animals} />
        </div>
    )
}
// rgb(218, 185, 76)