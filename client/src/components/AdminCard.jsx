import React, { useState, useEffect } from "react";
import { BasicHorizontalList } from './Common';
import { Form, Button } from "react-bootstrap";
import "../styles/AdminCard.css"
import axios from 'axios';

const itemKeys = {
    animalid: 'ID',
    type: 'Type',
    gender: 'Gender',
    availability: 'Availability',
    aname: 'Name',
}

//need to add in edit functionality
const adminButton = <Button variant="primary" className='editButton'>Edit</Button>;

//when database updates, need radio AND displayed availability status to update
const updateStatus = (newStatus, setCurrentStatus) => {
    //add database update here
    //if successful, then...
    setCurrentStatus(newStatus);
};

const animalStatus = (currentStatus, setCurrentStatus, availabilities) => {
    const cleanAvailabilities = availabilities?.map(({ id, availability }) => [id, availability]);
    return (
        <Form className='statusForm'>
            <div key={`inline-radio`} className="mb-3">
                {cleanAvailabilities?.map((availability) => {
                    return (
                        <Form.Check
                        key={availability[1]}
                        inline
                        label={availability[1]}
                        name='radioGroup1'
                        type='radio'
                        value={availability[1]}
                        checked={currentStatus === availability[1]} //sets the selected radio button to whatever the current status is
                        id={`inline-radio-${availability[0]}`}
                        onChange={e => updateStatus(e.currentTarget.value, setCurrentStatus)}
                        />
                    )
                })}
            </div>      
        </Form>
    );
}

export default function AdminCard({
    animal = {}
}) {
    const [userID, setUserID] = useState(1);
    const [currentStatus, setCurrentStatus] = useState();
    const [availabilities, setAvailabilities] = useState();

    // update component when "animal" data changes from parent
    useEffect(() => {
        setCurrentStatus(animal?.availability); //sets the currently selected radio button for pet

        // get possible availabilities from database
        axios.get(`/api/getAvailabilities`)
        .then(response => {
            console.log(response.data);
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

    return (
        <div className='adminCardContainer' key={animal.animalid}>
            <BasicHorizontalList 
                keyid={animal?.animalid}
                image={animal?.image}
                itemKeys={itemKeys}
                items={animal}
                radio={animalStatus(currentStatus, setCurrentStatus, availabilities)}
                button={adminButton}
                className={classNames}
            />
        </div>
    )
}