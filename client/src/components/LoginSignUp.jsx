import React, { useState, useEffect } from "react";
import { BasicModal } from "../components/Common";
import LoginTabs from "./LoginTabs"
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

// handles the login button click
const handleLogin = (setLoginModalOpen) => {
    setLoginModalOpen(true);
}

// handles modal close; passed to common modal component
const handleLoginClose = (setLoginModalOpen) => {
    setLoginModalOpen(false);
}

export default function LoginSignUp() {
    const [loginModalOpen, setLoginModalOpen] = useState(false);
    const [modalType, setModalType] = useState('login');
    const [title, setTitle] = useState('Member Login');
    const [saveTitle, setSaveTitle] = useState('Login');
    const [fields, setFieldsTitle] = useState([]);

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