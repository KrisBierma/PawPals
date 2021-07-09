import React from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import "../styles/Header.css";
import { LoginSignUp, SettingModal } from "../components"

// TODO: add conditionals for if logged in, highlight selected tab, add login functionality
// TODO: pull user name from database

// added key to get rid of error msgs
const headersData = [
    {
      label: "Home",
      href: "/",
      key: "home"
    },
    {
      label: "Browse",
      href: "/browse",
      key: "browse"
    },
    {
      label: "Favorites",
      href: "/favorites",
      key: "favs"
    },
    {
      label: "News/PR",
      href: "/news",
      key: "news"
    },
];

export default function Header(props) {
    // Currently our only display; creates full navbar
    const displayDesktop = () => {
        return (
            <Navbar sticky="top" bg="light" expand="lg">
                {pawPalsLogo}
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        {getMenuButtons()}
                    </Nav>
                    <Nav >
                        {displayLogIn()}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    };

    const pawPalsLogo = (
        <Navbar.Brand href="#">PawPals</Navbar.Brand>
    );

    const login = (
        <LoginSignUp />
    );

    const settingDropDown = (
        <NavDropdown title="Hello Alexis" id="navbarScrollingDropdown">
            <SettingModal />
            <NavDropdown.Item>Logout</NavDropdown.Item>
        </NavDropdown>
    );

    // Create the Home, Browse, Favorite, and News/PR nav links
    const getMenuButtons = () => {
        return headersData.map(({ label, href, key }) => {
            // if we are not logged in do not render Favorites
            if (!props.isLoggedIn && label === 'Favorites'){ return <></>; }
            else {
                return (
                    <Nav.Link href={href} key={key}>{label}</Nav.Link>
                );
            }
        });
    };

    // decide whether we display sign in or the person's name (if they are signed in)
    const displayLogIn = () => {
        if (props.isLoggedIn){
            return settingDropDown;
        }
        else {
            return login;
        }
    }
    
    return (
        <header>
                {displayDesktop()}
        </header>
    );
}