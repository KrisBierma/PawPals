import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import "../styles/Header.css"

// TODO: add conditionals for if logged in, highlight selected tab, add login functionality

const headersData = [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Browse",
      href: "/browse",
    },
    {
      label: "Favorites",
      href: "/favorites",
    },
    {
      label: "News/PR",
      href: "/news",
    },
];

export default function Header(props) {
    // Currently our only display; creates full navbar
    const displayDesktop = () => {
        return (
            <Navbar bg="light" expand="lg">
                {pawPalsLogo}
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        {getMenuButtons()}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    };

    const pawPalsLogo = (
        <Navbar.Brand href="#">PawPals</Navbar.Brand>
    );

    // Create the Home, Browse, Favorite, and News/PR nav links
    const getMenuButtons = () => {
        return headersData.map(({ label, href }) => {
            // if we are not logged in do not render Favorites
            if (!props.isLoggedIn && label === 'Favorites'){ return <></>; }
            else {
                return (
                    <Nav.Link href={href}>{label}</Nav.Link>
                );
            }
        });
    };
    
    return (
        <header>
                {displayDesktop()}
        </header>
    );
}