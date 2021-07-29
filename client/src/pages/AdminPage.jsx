import React, {useContext, useState, useEffect} from 'react';
import { AdminCard } from '../components';
import { Link } from "react-router-dom";
import { AuthContext } from '../components/AuthContext';
import SearchFilter from "../components/Common/SearchFilter";
import axios from 'axios';

export default function AdminPage() {
    const [animals, setAnimals] = useState([]);
    const [breeds, setBreeds] = useState([]);
    const [filterOption, setFilterOption] = useState({
        atype: "",
        breed: "",
        gender: "",
        availability: "",
    });
    const context = useContext(AuthContext);
    
    useEffect(() => {
        getAnimals(filterOption.atype, filterOption.gender, filterOption.breed, filterOption.availability);
    }, [filterOption.atype, filterOption.gender, filterOption.breed, filterOption.availability]);

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

    const onChangeFilter = (e) => {
        setFilterOption({ ...filterOption, [e.target.name]: e.target.value });
    };

    return (
        <div>
            <div style={{display:"flex", marginTop: "10px", alignItems: "flex-end"}}>
                {/* search functionality */}
                <div style={{flex:1}}><SearchFilter onChange={onChangeFilter} breeds={breeds} page='admin' /></div>
                {/* add new pet button */}
                <div style={{textAlign:"justify", flex:1}}><Link to="/admin/add-edit-pet" className="btn btn-primary">Add New Pet</Link></div>
            </div>
            {/* pet cards */}
            <div style={{marginTop: '30px'}}>
                {animals.map((animal) => {
                    return (
                        <AdminCard animal={animal} key={animal?.animalid}/>
                    );
                })}
            </div>
        </div>
    );
}
