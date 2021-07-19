import React, { useState } from "react";
import { BasicHorizontalList } from './Common';
import { Form, Button } from "react-bootstrap";
import "../styles/AdminCard.css"

const itemKeys = {
    animalid: 'ID',
    type: 'Type',
    gender: 'Gender',
    availability: 'Availability',
    aname: 'Name',
}

const availabilities = ['Available', 'Pending', 'Adopted'];

const adminButton = <Button variant="primary">Edit</Button>;

const animalStatus = () => {
    return (
        <Form>
            <div key={`inline-radio`} className="mb-3">
                {availabilities.map((availability, index) => {
                    return (
                        <Form.Check
                        inline
                        label={availability}
                        name='radioGroup1'
                        type='radio'
                        id={`inline-radio-${index}`}
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

    const classNames = {
        card: 'adminCard',
        image: 'adminImage',
    }

    return (
        <div className='adminCardContainer'>
            <BasicHorizontalList 
                key={animal?.animalid}
                image={animal?.image}
                itemKeys={itemKeys}
                items={animal}
                radio={animalStatus(availabilities)}
                button={adminButton}
                className={{field: 'adminCardFields', value: 'adminCardValue', 
                    listItem: 'adminListItem', listContainer: 'adminListContainer', image: 'adminImage', imageContainer: 'adminImageContainer', listGroup: 'adminListGroup'}}
            />
        </div>
    )
}