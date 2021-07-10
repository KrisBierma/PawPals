import React, { useState, useEffect } from "react";
import { BasicModal } from "../components/Common";
import { LoginTabs } from "../components"
import { Nav, Button } from "react-bootstrap";
import axios from 'axios';

const loginFields = [
    {
        name: "Username",
        type: "input",
        value: ""
    },
    {
        name: "Password",
        type: "input",
        value: ""
    }
]

const signupFields = [
    {
        name: "Username",
        type: "input",
        value: ""
    },{
        name: "Email",
        type: "input",
        value: ""
    },
    {
        name: "Password",
        type: "input",
        value: ""
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
    console.log("handlelogin");
    setLoginModalOpen(true);
}

// handles modal close; passed to common modal component
const handleLoginClose = (setLoginModalOpen) => {
    console.log("handle login close");
    setLoginModalOpen(false);
}

export default function LoginSignUp() {
    const [loginModalOpen, setLoginModalOpen] = useState(false);
    const [modalType, setModalType] = useState('login');
    const [title, setTitle] = useState('');
    const [saveTitle, setSaveTitle] = useState('');
    const [fields, setFields] = useState([]);
    const [usernames, setUsernames] = useState([]);
    const [isValidEmail, setIsValidEmail] = useState(false);
    const [isValidUsername, setIsValidUsername] = useState(false);
    const [isValidPass, setIsValidPass] = useState(false);

    function handleChange(inputName, valueIn) {
        // set form input values
        console.log(inputName, valueIn)
        setFields(prev => prev.map(s => {
            if(s.name === inputName) {
                return {...s, value:valueIn}
            }
            else return s;
        }))

        // validate
        if(modalType === 'signup') {
            if(inputName === 'Email') {
                if(validateEmail(valueIn)) setIsValidEmail(true);
                else setIsValidEmail(false);
            }
            else if(inputName === 'Username') {
                if(valueIn !== null && valueIn !== '') setIsValidUsername(true);
                else setIsValidUsername(false);
            }
            else {
                if(valueIn !== null && valueIn !== '') setIsValidPass(true);
                else setIsValidPass(false);
            }
        }
    }

    function getAllUsernames() {
        axios.get('/api/getAllUsernames')
        .then(res => {
            var names = [];
            res.data.map(r => names.push(r.username));
            setUsernames(names);
        })
        .catch(err => console.log(err));
    }

    // handles when login is completed
    function handleSave(setLoginModalOpen, modalType, fields, usernames) {
        // console.log(fields);
        // send new account creation info to API; get userID in response and keep track of the fact that we are logged in
        setLoginModalOpen(false);
        var username = fields[0].value;
        var pass;
        if (modalType === 'login'){
            pass = fields[1].value;
            console.log('handleLoginSave', username, pass);
            // keep track of the fact that we are logged in...get userId from API
            // axios to check if username/pass are correct
        } else if (modalType === 'signup'){
            var email = fields[1].value;
            pass = fields[2].value;
            var newid;  // to-do: handle this with log in
            if(validateEmail(email) && validateUsername(username, usernames)) {
                // only regular users sign up here
                axios.post(`/api/addUser/1/${username}/${pass}/${email}`)
                .then(res => {
                    console.log("user successfully added. id: ", res.data[0].id);
                    newid = res.data[0].id;

                    // reset form and validations
                    setIsValidEmail(false);
                    setIsValidPass(false);
                    setIsValidUsername(false);
                    setFields(prev => prev.map(s => {
                        return {...s, value:''}
                    }))
                })
                .catch(err => console.log("there was a problem signing up the user",err))
            }
            else {
                console.log("something is wrong with one of the input fields. please fix")
            }
        } else {
            console.log('something wrong happened');
        }
    }

    // username must be unique
    function validateUsername(name, usernames) {
        if(usernames.some(d => d.toLowerCase() === name.toLowerCase())) {
            console.log("username taken");
            return false;
        }
        return true;
    }

    function validateEmail(email) {
        var patt = /^\S+@\S+\.\S+$/;
        if(email.match(patt)) return true;
        return false;
    }

    // will perform the following actions on render when modalType variable changes
    useEffect(() => {
        setTitle(data[modalType]?.title);
        setSaveTitle(data[modalType]?.saveTitle);
        setFields(() => data[modalType]?.fields);
        getAllUsernames();
      }, [modalType]);

    return (
        <>
            <BasicModal 
                show={loginModalOpen}
                handleClose={() => handleLoginClose(setLoginModalOpen)}
                handleSave={() => handleSave(setLoginModalOpen, modalType, fields, usernames)}
                title={title}
                handleChange={(e, v) => handleChange(e, v)}
                saveTitle={saveTitle}
                fields={fields}
                isValidEmail={isValidEmail}
                isValidUsername={isValidUsername}
                isValidPass={isValidPass}
                tabs={<LoginTabs setModalType={setModalType} tabClass='signupTab'/>}
            />
            
            <Nav className="ml-auto">
                <Button variant="primary" onClick={() => handleLogin(setLoginModalOpen)}>Login</Button>
            </Nav>
        </>
    );
}