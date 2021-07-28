import React, { useState, useEffect } from "react";
import axios from 'axios';

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
        <div className="container-fluid">
            <form>
                <div className="row mb-4">
                    <div className="col-sm-3">
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
                    </div>
                    <div className="col-sm-3">
                        <select
                            className="form-control"
                            name="gender"
                            onChange={onChange}
                        >
                            <option value="">Select Gender</option>
                            <option value="1">Male</option>
                            <option value="2">Female</option>
                        </select>
                    </div>
                    <div className="col-sm-3">
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
                    </div>
                    <div className="col-sm-3">
                        <select
                            className="form-control"
                            name="availability"
                            onChange={onChange}
                        >
                            <option value="">Select Status</option>
                            {cleanAvailabilities?.map((availability) => {
                                if (page === 'admin'){
                                    return <option key={availability[0]} value={availability[0]}>{availability[1]}</option>;
                                } else if (['browse', 'favorite'].includes(page) && ['Available', 'Pending'].includes(availability[1])){
                                    return <option key={availability[0]} value={availability[0]}>{availability[1]}</option>;
                                }
                            })}
                        </select>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default SearchFilter;
