import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from '../components/AuthContext';
import { GridLayout } from "../components/Common"
import axios from 'axios';
import SearchFilter from "../components/Common/SearchFilter";


export default function BrowsePage() {
    const [animals, setAnimals] = useState([]);
    const [userID, setUserID] = useState(null);
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
const getBreeds = async (atype) => {
    try {
        const response = await axios.get(`/api/getBreeds/${atype}`);
        console.log('setBreeds', response.data);
        setBreeds(response.data);
    } catch (error) {
        console.log(error);
    }
};

const getAnimals = async (atype, gender, breed) => {
    axios
        .get(`/api/getAnimalsWiFavs`, {
            params: {
                userID: context.userID,
                atype,
                gender,
                breed,
            },
        })
        .then((response) => {
            console.log(response.data);
            setAnimals(response.data);
        })
        .catch((err) => console.log(err));
};

    useEffect(() => {
        getAnimals(filterOption.atype, filterOption.gender, filterOption.breed);
    }, [filterOption.atype, filterOption.gender, filterOption.breed]);

    useEffect(() => {
        if (filterOption.atype) getBreeds(filterOption.atype);
    }, [filterOption.atype]);

    // for populating the dropdown menu; use id as key 
    function getDropdownInfo() {
        axios.get(`/api/getAvailabilities`)
        .then(response => {
            // console.log(response.data);
            setAvailabilities(response.data);
        })
        axios.get(`/api/getBreeds`)
        .then(response => {
            // console.log(response.data);
            setBreeds(response.data);
        })
    }

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