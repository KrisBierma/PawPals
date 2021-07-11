import React, { useEffect, useState } from "react";
import { BasicModal } from "../components/Common";
import { NavDropdown } from "react-bootstrap";
import axios from 'axios';

const settingFields = [
    {
        name: "Change Password",
        type: "input",
    },
    {
        name: "Change Email",
        type: "input",
    }
]

const data = {
    title: 'Settings',
    saveTitle: 'Save',
    otherButton: 'Delete Account',
    fields: settingFields
}

// handles the settings button click
const handleSettings = (setSettingModalOpen) => {
    setSettingModalOpen(true);
}

// handles modal close; passed to common modal component
const handleSettingClose = (setSettingModalOpen) => {
    console.log('close');
    setSettingModalOpen(false);
}

// handles when new username/pw/email is saved
const handleSettingsSave = (setSettingModalOpen) => {
    setSettingModalOpen(false);
    // handle submitting new data to api
    // get user data from input
    let email = 'new email';    // get from input
    let pass = 'new pass';      // get from input
    let userID = 10;        // get from sessions?
    if(email !== null && email !== '') {
        axios.put(`/api/updateUserEmail/${email}/${userID}`)
        .then(console.log('show success msg'))
        .catch(err => console.log('show error msg'));
    }
    if(pass !== null && pass !== '') {
        axios.put(`/api/updateUserPass/${pass}/${userID}`)
        .then(console.log('show success msg'))
        .catch(err => console.log('show error msg'));
    }
}

// handles deleting account
const deleteAccount = (setSettingModalOpen) => {
    // to-do: are you sure to delete?
    var confirm = false;
    var userID = 12;

    if(confirm) {
        axios.delete(`/api/deleteUser/${userID}`)
        .then(console.log("confirmed"))
        .catch(err => console.log(err));
    }
    setSettingModalOpen(false);
}

export default function LoginSignUp() {
    const [settingModalOpen, setSettingModalOpen] = useState(false);
    // to-do: get user data (saved in sessions??) and pre-populate input
    // get new input; see LoginSignUp
    function handleChange() {

    }

    return (
        <>
            <BasicModal 
                show={settingModalOpen}
                handleClose={() => handleSettingClose(setSettingModalOpen)}
                handleSave={() => handleSettingsSave(setSettingModalOpen, data?.fields)}
                title={data?.title}
                saveTitle={data?.saveTitle}
                fields={data?.fields}
                otherButton={data?.otherButton}
                otherButtonCallback={() => deleteAccount(setSettingModalOpen)}
            />
            
            <NavDropdown.Item onClick={() => handleSettings(setSettingModalOpen)}>
                Settings
            </NavDropdown.Item>
        </>
    );
}