import React, {useState, useEffect, useContext} from 'react';
import ReactDOM from 'react-dom';
import { Button, Form, Row, Col } from "react-bootstrap";
// import { Text } from "react-native";
import { useSnackbar } from 'notistack';
import * as Enum from '../components/Common/Enum';
import * as Msgs from '../components/Common/Messages';
import { AuthContext } from '../components/AuthContext';
import axios from 'axios';
import '../styles/AddPetPage.css'

// return the type integer value based on string
const findType = (type, typeOptions) => {
    let index = typeOptions.findIndex(x => x.atype === type);
    return typeOptions[index]?.id;
};

// return the availability integer value based on string
const findAvailability = (availability, availabilityOptions) => {
    let index = availabilityOptions.findIndex(x => x.availability === availability);
    return availabilityOptions[index]?.id;
}

// return the breed integer value based on string
const findBreed = (breed, breedOptions) => {
    let index = breedOptions.findIndex(x => x.breed === breed);
    return breedOptions[index]?.id;
}

// return the disposition integer value based on string
const findDisposition = (disposition, dispositionOptions) => {
    let index = dispositionOptions.findIndex(x => x.disposition === disposition);
    return dispositionOptions[index]?.id;
}

// keep track of the currently checked dispositions
const updateDispositions = (event, dispositionSelections, setDispositionSelections) => {
    console.log(event.target);
    let newArray = [...dispositionSelections, event.target.id];
    if (dispositionSelections.includes(event.target.id)) {
      newArray = newArray.filter(disposition => disposition !== event.target.id);
    } 
    setDispositionSelections(newArray);
}

export default function AddPetPage() {
    const [availabilities, setAvailabilities] = useState([]);
    const [breeds, setBreeds] = useState([]);
    const [dispositions, setDispositions] = useState([]);
    const [types, setTypes] = useState([]);
    const [selectedType, setSelectedType] = useState(null);
    const [dispositionSelections, setDispositionSelections] = useState([]);
    const { enqueueSnackbar } = useSnackbar();

    const context = useContext(AuthContext);

    useEffect(() => {
        getDropdownInfo();
    }, []);

    // for populating the dropdown menu; use id as key 
    function getDropdownInfo() {
        axios.get(`/api/getAvailabilities`)
        .then(response => {
            setAvailabilities(response.data);
        });

        axios.get(`/api/getBreeds`)
        .then(response => {
            setBreeds(response.data);
        });

        axios.get(`/api/getDispositions`)
        .then(response => {
            setDispositions(response.data);
        });

        axios.get(`/api/getTypes`)
        .then(response => {
            setTypes(response.data);
        });
    }

    const onTypeChange = (event) => {
        setSelectedType(parseInt(event.target.options[event.target.selectedIndex].id));
    };

    // set breed dropdown based on the type selected
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

    const addNewPet = (e) => {
        e.preventDefault();
        // if they did not submit all required rows, do not send to database
        if (!(e.target.petName.value && e.target.gender.value && e.target.type.value && e.target.breed.value && e.target.availability.value 
            && e.target.description.value && e.target.imageUrl.value)){
            enqueueSnackbar(Msgs.invalidForm, {variant: Enum.Variant.error});
        }else{
            axios.post(`/api/addAnimal/${e.target.petName.value}/${e.target.gender.value === 'Male' ? 1 : 2}/${e.target.description.value}/${findBreed(e.target.breed.value, breeds)}/${findType(e.target.type.value, types)}/${findAvailability(e.target.availability.value, availabilities)}/${context.userID}/${e.target.imageUrl.value}`)
            .then(res => {
                if(res?.data.statuscode === 401) {
                    enqueueSnackbar(res.data.message, {variant: Enum.Variant.error});
                }
                else if(res?.data.statuscode === 200) {
                    enqueueSnackbar(Msgs.successPetAdd, {variant: Enum.Variant.success});
                    // if we have dispositions we need to submit, submit with newly created animalID
                    if (dispositionSelections){
                        // get animal id from response
                        // const animalID = ??
                        // enter in dispositions for that animal here
                        // dispositionSelections.map(disposition => {
                        //     axios.post(`/api/addDisposition/${animalID}/${findDisposition(disposition, dispositions)}`) 
                        // })
                    }
                }
            })
            .catch(err => {
                console.log(err);
                enqueueSnackbar(Msgs.unsuccessfulNewPetAdd, {variant: Enum.Variant.error});
            })
        }
    }

    return (
        <div className='formContainer'>
            <Form id='addNewPetForm' onSubmit={(e) => addNewPet(e)}>
                <Row className="mb-1">
                    <Col>
                        <Form.Group controlId="formGridName" required>
                            <Form.Label className='required'>Pet Name</Form.Label>
                            <Form.Control required type="name" name="petName" placeholder="Enter pet name" />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="formGridType">
                            <Form.Label className='required'>Gender</Form.Label>
                            <Form.Control as="select" name="gender" htmlSize={2} custom>
                                <option>Male</option>
                                <option>Female</option>
                            </Form.Control>
                        </Form.Group>
                    </Col>
                </Row>

                <Row className="mb-1">
                    <Form.Group as={Col} controlId="formGridType">
                        <Form.Label className='required'>Type</Form.Label>
                        <Form.Control required as="select" name="type" htmlSize={3} custom onChange={(e) => onTypeChange(e)}>
                            {types?.map(type => {
                                return <option key={type?.id} id={type?.id}>{type?.atype}</option>
                            })}
                        </Form.Control>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridBreed">
                        <Form.Label className='required'>Breed</Form.Label>
                        <Form.Control required as="select" name="breed" custom>
                            {setBreedDropdown()}
                        </Form.Control>
                    </Form.Group>
                </Row>

                <Row className="mb-1">
                    <Form.Group as={Col} controlId="formGridStatus">
                        <Form.Label className='required'>Status</Form.Label>
                        <Form.Control required as="select" name="availability" htmlSize={3} custom>
                            {availabilities?.map(availability => {
                                    return <option key={availability?.id}>{availability?.availability}</option>
                                })}
                        </Form.Control>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridDisposition">
                        <Form.Label>Disposition</Form.Label>
                            <div style={{textAlign:'left'}}>
                                {dispositions?.map(disposition => {
                                    return (<Form.Check
                                    custom
                                    name="disposition"
                                    key={disposition?.id}
                                    label={disposition?.disposition}
                                    onChange={e => updateDispositions(e, dispositionSelections, setDispositionSelections)}
                                    type='checkbox'
                                    id={disposition?.disposition}
                                />)
                                })}
                            </div>
                    </Form.Group>
                </Row>

                <Row className="mb-1">
                    <Col>
                        <Form.Group controlId="exampleForm.ControlTextarea1">
                            <Form.Label className='required'>Description</Form.Label>
                            <Form.Control required as="textarea" name="description" rows={3} placeholder="I am a fun loving pet..." />
                        </Form.Group>
                    </Col>
                </Row>

                <Row className="mb-1">
                    <Col>
                        <Form.Group controlId="formGridImage">
                            <Form.Label className='required'>Image URL</Form.Label>
                            <Form.Control required type="imageURL" name="imageUrl" placeholder="Enter url for image" />
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
