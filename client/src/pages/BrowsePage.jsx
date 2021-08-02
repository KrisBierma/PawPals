import React, { useContext, useState, useEffect, useRef } from "react";
import { AuthContext } from '../components/AuthContext';
import { GridLayout } from "../components/Common"
import axios from 'axios';
import SearchFilter from "../components/Common/SearchFilter";
import '../styles/BrowsePage.css';


export default function BrowsePage() {
    const [status, setStatus] = useState({});
    const [breeds, setBreeds] = useState([]);
    const context = useContext(AuthContext);
    const [filter, setFilter] = useState({userID: context.userID,});

    const onChangeFilter = e => {
        const { name, value } = e.target;
        const newFilters = { ...filter };
        if (value === "") delete newFilters[name];
        else newFilters[name] = value;
        setFilter(newFilters);
    };

    useEffect(() => {
        setStatus({ isLoading: true });
        axios.get('/api/getAnimalsWiAllFilter', { params: filter })
            .then(res => setStatus({ animals: res.data }))
            .catch(err => setStatus({ err }));
    }, [filter, context]);

    useEffect(() => {
        axios.get('/api/getBreedsWithID/1').then(res => setBreeds(res.data)).catch(err => console.log(err))
    }, []);

    const { isLoading, animals, err } = status;
    const filteredBreeds = filter.atype ? breeds.filter(breed => breed.atypeid === +filter.atype) : [];
    const filteredAnimals = animals && animals.length > 0 && context.userRole !== 2 ? animals.filter(animal => animal.availability === "Available" || animal.availability === 'Pending') : animals;
    return (
        <div>
            <SearchFilter onChange={onChangeFilter} breeds={filteredBreeds} page='browse' />
            {isLoading && <div className='loader'></div>}
            {err && <p className='userMsg'>{err.response.message}</p>}
            {filteredAnimals && (filteredAnimals.length === 0 ? <p className='userMsg'>Either all our animals have homes or there aren't any of the type you searched for.</p> : (
                <GridLayout cardData={filteredAnimals} />
            ))}
        </div>
    )
}
// rgb(218, 185, 76)