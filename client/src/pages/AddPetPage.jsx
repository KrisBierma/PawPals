import React, {useState, useEffect} from 'react';
import { Button, Form, Row, Col } from "react-bootstrap";
import axios from 'axios';
import '../styles/AddPetPage.css'

export default function AddPetPage() {
    const [availabilities, setAvailabilities] = useState([]);
    const [breeds, setBreeds] = useState([]);
    const [dispositions, setDispositions] = useState([]);
    const [types, setTypes] = useState([]);
    const [selectedType, setSelectedType] = useState(null);

    useEffect(() => {
        getDropdownInfo();
    }, []);

    // for populating the dropdown menu; use id as key 
    function getDropdownInfo() {
        axios.get(`/api/getAvailabilities`)
        .then(response => {
            console.log(response.data);
            setAvailabilities(response.data);
        });

        axios.get(`/api/getBreeds`)
        .then(response => {
            console.log(response.data);
            setBreeds(response.data);
        });

        axios.get(`/api/getDispositions`)
        .then(response => {
            console.log(response.data);
            setDispositions(response.data);
        });

        axios.get(`/api/getTypes`)
        .then(response => {
            console.log(response.data);
            setTypes(response.data);
        });
    }

    const onTypeChange = (event) => {
        setSelectedType(parseInt(event.target.options[event.target.selectedIndex].id));
    };

    const setBreedDropdown = () => {
        if (selectedType){
            return (breeds?.map(breed => {
                if (parseInt(selectedType) === breed.atypeid){
                    return <option key={breed?.id}>{breed?.breed}</option>
                }
            })
            );
        } else {
            return <option key='needs selection'>Please select a type first...</option>;
        }
    };

    const test = (e) => {
        e.preventDefault();
        console.log('blarb', e);
    }

    return (
        <div className='formContainer'>
            <Form onSubmit={(e) => test(e)}>
                <Row className="mb-1">
                    <Col>
                        <Form.Group controlId="formGridName">
                            <Form.Label>Pet Name</Form.Label>
                            <Form.Control type="name" placeholder="Enter pet name" />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="formGridType">
                            <Form.Label>Type</Form.Label>
                            <Form.Control as="select" htmlSize={2} custom>
                                <option>Male</option>
                                <option>Female</option>
                            </Form.Control>
                        </Form.Group>
                    </Col>
                </Row>

                <Row className="mb-1">
                    <Form.Group as={Col} controlId="formGridType">
                        <Form.Label>Type</Form.Label>
                        <Form.Control as="select" htmlSize={3} custom onChange={(e) => onTypeChange(e)}>
                            {types?.map(type => {
                                return <option key={type?.id} id={type?.id}>{type?.atype}</option>
                            })}
                        </Form.Control>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridBreed">
                        <Form.Label>Breed</Form.Label>
                        <Form.Control as="select" custom>
                            {setBreedDropdown()}
                        </Form.Control>
                    </Form.Group>
                </Row>

                <Row className="mb-1">
                    <Form.Group as={Col} controlId="formGridStatus">
                        <Form.Label>Status</Form.Label>
                        <Form.Control as="select" htmlSize={3} custom>
                            {availabilities?.map(availability => {
                                    return <option key={availability?.id}>{availability?.availability}</option>
                                })}
                        </Form.Control>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridDisposition">
                        <Form.Label>Disposition</Form.Label>
                        <Form.Control as="select" htmlSize={3} multiple>
                            {dispositions?.map(disposition => {
                                return <option key={disposition?.id}>{disposition?.disposition}</option>
                            })}
                        </Form.Control>
                    </Form.Group>
                </Row>

                <Row className="mb-1">
                    <Col>
                        <Form.Group controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Description</Form.Label>
                            <Form.Control as="textarea" rows={3} placeholder="I am a fun loving pet..." />
                        </Form.Group>
                    </Col>
                </Row>

                <Row className="mb-1">
                    <Col>
                        <Form.Group controlId="formGridImage">
                            <Form.Label>Image URL</Form.Label>
                            <Form.Control type="imageURL" placeholder="Enter url for image" />
                        </Form.Group>
                    </Col>
                </Row>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    );
}
