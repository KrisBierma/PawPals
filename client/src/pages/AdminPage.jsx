import React, {useContext, useState, useEffect} from 'react';
import { AdminCard } from '../components';
import { Link } from "react-router-dom";
import { AuthContext } from '../components/AuthContext';
import SearchFilter from "../components/Common/SearchFilter";
import axios from 'axios';

export default function AdminPage() {
    const [status, setStatus] = useState({});
    const [breeds, setBreeds] = useState([]);
    const [filter, setFilter] = useState({});
    const context = useContext(AuthContext);

    const [availabilities, setAvailabilities] = useState([]);

    const onChangeFilter = e => {
        const { name, value } = e.target;
        const newFilters = { ...filter };
        if (value === "") delete newFilters[name];
        else newFilters[name] = value;
        setFilter(newFilters);
    };
    
    useEffect(() => {
        axios.get('/api/getAnimalsWiAllFilter', { params: filter })
            .then(res => setStatus({ animals: res.data }))
            .catch(err => setStatus({ err }));
    }, [filter, context]);

    useEffect(() => {
        axios.get('/api/getBreedsWithID/1')
        .then(res => setBreeds(res.data))
        .catch(err => console.log(err))

        axios.get(`/api/getAvailabilities`)
        .then(res => setAvailabilities(res.data))
    }, []);

    const { animals, err } = status;
    const filteredBreeds = filter.atype ? breeds.filter(breed => breed.atypeid === +filter.atype) : [];
    const filteredAnimals = animals && animals.length > 0 && context.userRole !== 2 ? animals.filter(animal => animal.availability === "Available" || animal.availability === 'Pending') : animals;

    return (
        <div className='container'>
        <div className='d-flex flex-1 align-items-center'>
            <SearchFilter onChange={onChangeFilter} breeds={filteredBreeds} page='admin' />
            <Link to="/admin/add-edit-pet" className="btn text-nowrap btn-primary">Add New Pet</Link>
            </div>
            {/* pet cards */}
            <div>            
                {filteredAnimals?.map((animal) => {
                    return (
                        <AdminCard animal={animal} availabilities={availabilities} key={animal?.animalid}/>
                    );
                })}
            </div>
        </div>
    );
}
