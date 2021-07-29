import React, { useState, useEffect } from "react";
import axios from 'axios';
import '../../styles/SearchFilter.css';


const SearchFilter = ({ onChange = () => {}, breeds = [], page = '' }) => {
    const [availabilities, setAvailabilities] = useState();

    // update component when "animal" data changes from parent
    useEffect(() => {
        // get possible availabilities from database
        axios.get(`/api/getAvailabilities`)
        .then(response => {
            setAvailabilities(response.data);
        })
    }, []);

    const cleanAvailabilities = availabilities?.map(({ id, availability }) => [id, availability]);

    return (
         <form className='pl-sm-0 mt-3 container filter-form'>
                         <select
                            className="form-control"
                            name="atype"
                            onChange={onChange}
                        >
                            <option value="">Select Animal</option>
                            <option value="1">Dog</option>
                            <option value="2">Cat</option>
                            <option value="3">Other</option>
                        </select>

                        <select
                            className="form-control"
                            name="gender"
                            onChange={onChange}
                        >
                            <option value="">Select Gender</option>
                            <option value="1">Male</option>
                            <option value="2">Female</option>
                        </select>

                        <select
                            className="form-control"
                            name="breed"
                            onChange={onChange}
                        >
                            <option value="">Select Breed</option>
                            {breeds?.map((breed) => (
                                <option key={breed.id} value={breed.id}>{breed.breed}</option>
                            ))}
                        </select>

                        <select
                            className="form-control"
                            name="availability"
                            onChange={onChange}
                        >
                            <option value="">Select Status</option>
                            {cleanAvailabilities?.filter((availability) => {
                                    if (page === 'admin'){
                                        return true;
                                    } else if (['browse', 'favorite'].includes(page) && ['Available', 'Pending'].includes(availability[1])){
                                        return true;
                                    }
                                    return false;
                                }).map((availability) => {
                                    return <option key={availability[0]} value={availability[0]}>{availability[1]}</option>;
                            })}
                        </select>
                   
                
            </form>
        
    );
};

export default SearchFilter;