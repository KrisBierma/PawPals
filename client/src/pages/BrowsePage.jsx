import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from '../components/AuthContext';
import { GridLayout } from "../components/Common"
import axios from 'axios';
import SearchFilter from "../components/Common/SearchFilter";


export default function BrowsePage() {
    const [animals, setAnimals] = useState([]);
    const [availabilities, setAvailabilities] = useState(1);
    const [breeds, setBreeds] = useState([]);
    const context = useContext(AuthContext);
    // const { enqueueSnackbar } = useSnackbar();
    const [filterOption, setFilterOption] = useState({
        atype: "",
        breed: "",
        gender: "",
    });

    useEffect(() => {
        // getAnimals();
        // getDropdownInfo();
    }, []);

    useEffect(() => {
        // getDropdownInfo();
        // if (filterOption.atype) getBreeds(filterOption.atype);
        getAnimals(filterOption.atype, filterOption.gender, filterOption.breed);
    }, [filterOption.atype, filterOption.gender, filterOption.breed]);

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
            console.log('setBreeds', response.data);
            setBreeds(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const getAnimals = async (atype, gender, breed) => {
        axios.get(`/api/getAnimalsWiAllFilter/`, {
                params: {
                    userID: context.userID === null ? -1 : context.userID,
                    atype,
                    gender,
                    breed,
                },
            })
            .then((response) => {
                console.log(response);
                setAnimals(response.data);
            })
            .catch((err) => console.log(err));
    };

    const onChangeFilter = (e) => {
        setFilterOption({ ...filterOption, [e.target.name]: e.target.value });
    };

    return (
        <div>
            {/* breeds dropdown  */}
            { animals.length === 0 ? <p>All our animals currently have homes!</p> : <p></p>}
            <SearchFilter onChange={onChangeFilter} breeds={breeds} />
            <GridLayout cardData={animals} />
        </div>
    )
}