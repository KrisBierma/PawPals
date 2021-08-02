import React, {useContext, useState, useEffect} from 'react';
import { AdminCard } from '../components';
import { Link } from "react-router-dom";
import { AuthContext } from '../components/AuthContext';
import SearchFilter from "../components/Common/SearchFilter";
import axios from 'axios';

export default function AdminPage() {
    const [animals, setAnimals] = useState([]);
    const [breeds, setBreeds] = useState([]);
    const [availabilities, setAvailabilities] = useState([]);
    const [filterOption, setFilterOption] = useState({
        atype: "",
        breed: "",
        gender: "",
        availability: "",
    });
    const context = useContext(AuthContext);
    
    useEffect(() => {
        const getAnimals = async (atype, gender, breed, availability) => {
            axios.get(`/api/getAnimalsWiAllFilter/`, {
                    params: {
                        userID: context.userID === null ? -1 : context.userID,
                        atype,
                        gender,
                        breed,
                        availability,
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

    useEffect(() => {
        // get possible availabilities from database
        axios.get(`/api/getAvailabilities`)
        .then(response => {
            setAvailabilities(response.data);
        })
    }, []);

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
        <div className='container'>
        <div className='d-flex flex-1 align-items-center'>
            <SearchFilter onChange={onChangeFilter} breeds={breeds} page='admin' />
            <Link to="/admin/add-edit-pet" className="btn text-nowrap btn-primary">Add New Pet</Link>
            </div>
            {/* pet cards */}
            <div>            
                {animals.map((animal) => {
                    return (
                        <AdminCard animal={animal} availabilities={availabilities} key={animal?.animalid}/>
                    );
                })}
            </div>
        </div>
    );
}
