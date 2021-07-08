import React, { useState } from "react";
import { BasicModal } from "../components/Common";
import { NavDropdown } from "react-bootstrap";

const settingFields = [
    {
        name: "Change Username",
        type: "input",
    },
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
}

// handles deleting account
const deleteAccount = (setSettingModalOpen) => {
    console.log('delete account');
    setSettingModalOpen(false);
    // handles deleting account
}

export default function LoginSignUp() {
    const [settingModalOpen, setSettingModalOpen] = useState(false);

    return (
        <>
            <BasicModal 
                show={settingModalOpen}
                handleClose={() => handleSettingClose(setSettingModalOpen)}
                handleSave={() => handleSettingsSave(setSettingModalOpen)}
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