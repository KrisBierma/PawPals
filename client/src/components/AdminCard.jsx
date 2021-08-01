import React, { useState, useEffect } from "react";
import { BasicHorizontalList } from './Common';
import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSnackbar } from 'notistack';
import * as Enum from '../components/Common/Enum';
import * as Msgs from '../components/Common/Messages';
import { findIndex } from '../js-commons/getIntegerValues';
import "../styles/AdminCard.css";
import axios from 'axios';
import * as Utils from './Utils';

const itemKeys = {
    animalid: 'ID',
    atype: 'Type',
    gender: 'Gender',
    aname: 'Name',
}

// change gender integer values to string
const cleanAnimalData = (data) => {
    if (data.gender === 1){
        data.gender = "Male";
    }else if (data.gender === 2){
        data.gender = "Female";
    }
    return data;
}

export default function AdminCard({
    animal = {}
}) {
    const [currentStatus, setCurrentStatus] = useState();
    const [availabilities, setAvailabilities] = useState();
    const { enqueueSnackbar } = useSnackbar();

    // update component when "animal" data changes from parent
    useEffect(() => {
        setCurrentStatus(animal?.availability); //sets the currently selected radio button for pet

        // get possible availabilities from database
        axios.get(`/api/getAvailabilities`)
        .then(response => {
            setAvailabilities(response.data);
        })
    }, [animal]);

    const classNames = {
        field: 'adminCardFields', 
        value: 'adminCardValue', 
        listItem: 'adminListItem', 
        listContainer: 'adminListContainer', 
        image: 'adminImage', 
        imageContainer: 'adminImageContainer', 
        listGroup: 'adminListGroup'
    }

    //edit button links to add-edit-pet page
    const adminButton = <Link to={{pathname: "/admin/add-edit-pet", animal: animal}} className="btn btn-primary mr-3">Edit Pet</Link>;

    //when database updates, update the radio button selected, otherwise error
    const updateStatus = (newStatus) => {
        axios.put(`/api/updateAvailability/${findIndex(newStatus, availabilities, "availability")}/${animal.animalid}`)
            .then(() => {
                enqueueSnackbar(Msgs.updatedAvailability, {variant: Enum.Variant.success});
                setCurrentStatus(newStatus);
            })
            .catch(() => {
                enqueueSnackbar(Msgs.errorUpdatedAvailability, {variant: Enum.Variant.error});
            });   
    };

    function getClassname(availability, currentStatus) {
        if(availability.localeCompare(currentStatus) === 0)
            return Utils.getClassName(Enum.AvailCaller.admin, availability);
        return '';
    }

    const animalStatus = () => {
        const cleanAvailabilities = availabilities?.map(({ id, availability }) => [id, availability]);
        return (
            <Form className='statusForm'>
                <div key={`inline-radio`}>
                    {cleanAvailabilities?.map((availability) => {
                        return (
                            <Form.Check
                            key={availability[1]}
                            inline
                            label={availability[1]}
                            name='radioGroup1'
                            type='radio'
                            value={availability[1]}
                            className={getClassname(availability[1], currentStatus)}
                            checked={currentStatus === availability[1]} //sets the selected radio button to whatever the current status is
                            id={`inline-radio-${availability[0]}`}
                            onChange={e => updateStatus(e.currentTarget.value)}
                            />
                        )
                    })}
                </div>      
            </Form>
        );
    }

    return (
        <div className='adminCardContainer' key={animal.animalid}>
            <BasicHorizontalList 
                keyid={animal?.animalid}
                image={animal?.imageurl}
                itemKeys={itemKeys}
                items={cleanAnimalData(animal)}
                radio={animalStatus(currentStatus, setCurrentStatus, availabilities)}
                button={adminButton}
                className={classNames}
            />
        </div>
    )
}