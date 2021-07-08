import React, { useState, useEffect } from "react";
import { BasicModal } from "../components/Common";
import { LoginTabs } from "../components"
import { Nav, Button } from "react-bootstrap";

const loginFields = [
    {
        name: "Username",
        type: "input",
    },
    {
        name: "Password",
        type: "input",
    }
]

const signupFields = [
    {
        name: "Username",
        type: "input",
    },{
        name: "Email",
        type: "input",
    },
    {
        name: "Password",
        type: "input",
    }
]

const data = {
    login: {
        title: 'Member Login',
        saveTitle: 'Login',
        fields: loginFields
    },
    signup: {
        title: 'Member Signup',
        saveTitle: 'Sign Up',
        fields: signupFields
    }
}

// handles the login button click (opens modal)
const handleLogin = (setLoginModalOpen) => {
    setLoginModalOpen(true);
}

// handles modal close; passed to common modal component
const handleLoginClose = (setLoginModalOpen) => {
    setLoginModalOpen(false);
}

// handles when login is completed
const handleSave = (setLoginModalOpen, modalType) => {
    setLoginModalOpen(false);
    if (modalType === 'login'){
        console.log('handleLoginSave');
        // keep track of the fact that we are logged in...get userId from API
    } else if (modalType === 'signup'){
        console.log('handleSignupSave');
        // send new account creation info to API; get userID in response and keep track of the fact that we are logged in
    } else {
        console.log('something wrong happened');
    }
}

export default function LoginSignUp() {
    const [loginModalOpen, setLoginModalOpen] = useState(false);
    const [modalType, setModalType] = useState('login');
    const [title, setTitle] = useState('');
    const [saveTitle, setSaveTitle] = useState('');
    const [fields, setFieldsTitle] = useState([]);

    // will perform the following actions on render when modalType variable changes
    useEffect(() => {
        setTitle(data[modalType]?.title);
        setSaveTitle(data[modalType]?.saveTitle);
        setFieldsTitle(() => data[modalType]?.fields);
      }, [modalType]);

    return (
        <>
            <BasicModal 
                show={loginModalOpen}
                handleClose={() => handleLoginClose(setLoginModalOpen)}
                handleSave={() => handleSave(setLoginModalOpen, modalType)}
                title={title}
                saveTitle={saveTitle}
                fields={fields}
                tabs={<LoginTabs setModalType={setModalType} tabClass='signupTab'/>}
            />
            
            <Nav className="ml-auto">
                <Button variant="primary" onClick={() => handleLogin(setLoginModalOpen)}>Login</Button>
            </Nav>
        </>
    );
}