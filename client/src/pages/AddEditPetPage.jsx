import React, {useState, useEffect, useContext} from 'react';
import ReactDOM from 'react-dom';
import { Button, Form, Row, Col } from "react-bootstrap";
// import { Text } from "react-native";
import { useSnackbar } from 'notistack';
import * as Enum from '../components/Common/Enum';
import * as Msgs from '../components/Common/Messages';
import { AuthContext } from '../components/AuthContext';
import { findIndex }from '../js-commons/getIntegerValues'
import axios from 'axios';
import '../styles/AddEditPetPage.css'

// keep track of the currently checked dispositions
const updateDispositions = (event, dispositionSelections, setDispositionSelections) => {
    let newArray = [...dispositionSelections, event.target.id];
    if (dispositionSelections.includes(event.target.id)) {
      newArray = newArray.filter(disposition => disposition !== event.target.id);
    }
    setDispositionSelections(newArray);
}

export default function AddEditPetPage(props) {
    const [availabilities, setAvailabilities] = useState([]);
    const [breeds, setBreeds] = useState([]);
    const [dispositions, setDispositions] = useState([]);
    const [types, setTypes] = useState([]);
    const [selectedType, setSelectedType] = useState(null);
    const [dispositionSelections, setDispositionSelections] = useState([]);
    const [newsFeedAdd, setNewsFeedAdd] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const { enqueueSnackbar } = useSnackbar();
    const animal = props.location.animal;
    const context = useContext(AuthContext);

    useEffect(() => {
        getDropdownInfo();
        // if we have an animal prop, then we are editing, otherwise new pet
        if(animal){
            setIsEdit(true);
            setSelectedType(findIndex(animal?.atype, types, "type")); //set the type integer for breed dropdown
            // if we have dispositions, set those accordingly
            if (animal?.dispositions){
                let dispositionArray = [];
                animal?.dispositions.forEach((disposition) => {
                    dispositionArray.push(disposition);
                })
                setDispositionSelections(dispositionArray);
            }
        }
    }, []);

    // for populating the dropdown menu; use id as key 
    function getDropdownInfo() {
        axios.get(`/api/getAvailabilities`)
        .then(response => {
            setAvailabilities(response.data);
        });

        axios.get(`/api/getBreeds`)
        .then(response => {
            console.log(response);
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
    };

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
        } else if (animal?.atype){
            return (breeds?.map(breed => {
                if (findIndex(animal?.atype, types, "type") === breed.atypeid){
                    return <option key={breed?.id} selected={breed?.breed === animal?.breed}>{breed?.breed}</option>
                }
            })
            );
        } else {
            return <option key='needs selection'>Please select a type first...</option>;
        }
    };

    const submitAPIDispositions = (animalID) => {
        if (dispositionSelections){
            // enter in dispositions for that animal here
            dispositionSelections.forEach((disposition) => {
                axios.post(`/api/addDisposition/${animalID}/${findIndex(disposition, dispositions, "disposition")}`)
                .then(res => {
                    if(res?.status === 401) {
                        enqueueSnackbar(res.data.message, {variant: Enum.Variant.error});
                    }
                })
                .catch(err => {
                    console.log(err);
                    enqueueSnackbar(Msgs.errorAddingDisposition, {variant: Enum.Variant.error});
                })
            })
        }
    };

    const addOrEditPet = (e) => {
        e.preventDefault();
        // if they did not submit all required rows, do not send to database
        if (!(e.target.petName.value && e.target.gender.value && e.target.type.value && e.target.breed.value && e.target.availability.value 
            && e.target.description.value && e.target.imageUrl.value)){
            enqueueSnackbar(Msgs.invalidForm, {variant: Enum.Variant.error});
        }else{
            const params = {
                name: e.target.petName.value,
                gender: e.target.gender.value === 'Male' ? 1 : 2,
                desc: e.target.description.value,
                breedID: findIndex(e.target.breed.value, breeds, "breed"),
                typeID: findIndex(e.target.type.value, types, "type"),
                avID: findIndex(e.target.availability.value, availabilities, "availability"),
                updateByID: context.userID,
                imageURL: e.target.imageUrl.value,
                animalid: animal?.animalid
            }
            if (isEdit){
                // update main animal fields
                axios.post(`/api/updateAnimal/`, params)
                .then(res => {
                    if(res?.status === 401) {
                        enqueueSnackbar(res.data.message, {variant: Enum.Variant.error});
                    }
                    else if(res?.status === 200) {
                        enqueueSnackbar(Msgs.successPetEdit, {variant: Enum.Variant.success});
                    }
                })
                .catch(err => {
                    console.log(err);
                    enqueueSnackbar(Msgs.unsuccessfulPetEdit, {variant: Enum.Variant.error});
                })
                // update disposition fields
                axios.post(`/api/deleteDispositions/${animal?.animalid}`)
                .then(res => {
                    if(res?.status === 401) {
                        enqueueSnackbar(res.data.message, {variant: Enum.Variant.error});
                    }
                    else if(res?.status === 200) {
                        // update with new dispositions
                        submitAPIDispositions(animal?.animalid);
                    }
                })
                .catch(err => {
                    console.log(err);
                    enqueueSnackbar(Msgs.unsuccessfulNewPetAdd, {variant: Enum.Variant.error});
                })
            }
            else {
                axios.post(`/api/addAnimal/`, params)
                .then(res => {
                    if(res?.status === 401) {
                        enqueueSnackbar(res.data.message, {variant: Enum.Variant.error});
                    }
                    else if(res?.status === 200) {
                        enqueueSnackbar(Msgs.successPetAdd, {variant: Enum.Variant.success});
                        // get animal id from response
                        const animalID = res?.data[0]?.id;
                        // if we have dispositions we need to submit, submit with newly created animalID
                        submitAPIDispositions(animalID);
                        // if they checked to add news feed event, add to database
                        if (newsFeedAdd){
                            axios.post(`/api/addNewsAnimal/1/${animalID}`)
                            .then(res => {
                                if(res?.status === 401) {
                                    enqueueSnackbar(res.data.message, {variant: Enum.Variant.error});
                                }
                            })
                            .catch(err => {
                                console.log(err);
                                enqueueSnackbar(Msgs.errorAddingNewsEvent, {variant: Enum.Variant.error});
                            }) 
                        }
                    }
                })
                .catch(err => {
                    console.log(err);
                    enqueueSnackbar(Msgs.unsuccessfulNewPetAdd, {variant: Enum.Variant.error});
                })
            }
        }
    };

    return (
        <div className='formContainer'>
            <Form id='addNewPetForm' onSubmit={(e) => addOrEditPet(e)}>
                <Row className="mb-1">
                    <Col>
                        <Form.Group controlId="formGridName" required>
                            <Form.Label className='required'>Pet Name</Form.Label>
                            <Form.Control required type="name" name="petName" placeholder="Enter pet name" defaultValue={isEdit ? animal?.aname : null}/>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="formGridType">
                            <Form.Label className='required'>Gender</Form.Label>
                            <Form.Control as="select" name="gender" htmlSize={2} custom>
                                <option selected={animal?.gender === "Male"}>Male</option>
                                <option selected={animal?.gender === "Female"}>Female</option>
                            </Form.Control>
                        </Form.Group>
                    </Col>
                </Row>

                <Row className="mb-1">
                    <Form.Group as={Col} controlId="formGridType">
                        <Form.Label className='required'>Type</Form.Label>
                        <Form.Control required as="select" name="type" htmlSize={3} custom onChange={(e) => onTypeChange(e)}>
                            {types?.map(type => {
                                return <option key={type?.id} id={type?.id} selected={animal?.atype === type?.atype}>{type?.atype}</option>
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
                                    return <option key={availability?.id} selected={animal?.availability === availability?.availability}>{availability?.availability}</option>
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
                                    defaultChecked={animal?.dispositions && animal?.dispositions.includes(disposition?.disposition)} //set as checked if it is in our disposition array
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
                            <Form.Control required as="textarea" name="description" rows={3} placeholder="I am a fun loving pet..." defaultValue={isEdit ? animal?.adescription : null} />
                        </Form.Group>
                    </Col>
                </Row>

                <Row className="mb-1">
                    <Col>
                        <Form.Group controlId="formGridImage">
                            <Form.Label className='required'>Image URL</Form.Label>
                            <Form.Control required type="imageURL" name="imageUrl" placeholder="Enter url for image" defaultValue={isEdit ? animal?.imageurl : null}/>
                        </Form.Group>
                    </Col>
                </Row>

                {/* only show the newsfeed checkbox if not in edit mode */}
                {!isEdit && (<Row className="mb-1">
                    <Form.Group as={Col} controlId="formGridNews">
                            <div style={{textAlign:'left'}}>
                                <Form.Check
                                    custom
                                    name="newsitem"
                                    label="Add new pet intro to news feed"
                                    onChange={e => setNewsFeedAdd(!newsFeedAdd)}
                                    type='checkbox'
                                    id="news"
                                />
                            </div>
                    </Form.Group>
                </Row>)}

                <Button variant="primary" type="submit">
                    {isEdit ? "Save Edits" : "Submit"}
                </Button>
            </Form>
        </div>
    );
}
