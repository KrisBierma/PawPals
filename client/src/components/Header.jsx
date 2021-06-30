import React, { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Typography, Button, Toolbar, Link } from "@material-ui/core";

// TODO: add conditionals for if logged in, highlight selected tab, add login functionality

const useStyles = makeStyles(() => ({
    header: {
      backgroundColor: "#400CCC",
      paddingRight: "79px",
      paddingLeft: "118px",
      "@media (max-width: 900px)": {
        paddingLeft: 0,
      },
    },
    logo: {
      fontFamily: "Work Sans, sans-serif",
      fontWeight: 600,
      color: "#FFFEFE",
      textAlign: "left",
    },
    menuButton: {
      fontFamily: "Open Sans, sans-serif",
      fontWeight: 700,
      size: "18px",
      marginLeft: "38px",
    },
    toolbar: {
      display: "flex",
      justifyContent: "space-between",
    },
    drawerContainer: {
      padding: "20px 30px",
    },
  }));

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
    const { header, logo, menuButton, toolbar, drawerContainer } = useStyles(); 

    // Currently our only display; creates full navbar
    const displayDesktop = () => {
        return (
          <Toolbar className={toolbar}>
            {pawPalsLogo}
            <div>{getMenuButtons()}</div>
          </Toolbar>
        );
    };

    const pawPalsLogo = (
        <Typography variant="h6" component="h1" className={logo}>
          PawPals
        </Typography>
    );

    // Create the Home, Browse, Favorite, and News/PR nav links
    const getMenuButtons = () => {
        return headersData.map(({ label, href }) => {
            // if we are not logged in do not render Favorites
            if (!props.isLoggedIn && label === 'Favorites'){ return <></>; }
            else {
                return (
                    <Button
                    {...{
                        key: label,
                        color: "inherit",
                        to: href,
                        className: menuButton,
                    }}
                    >
                    {label}
                    </Button>
                );
            }
        });
    };
    
    return (
        <header>
            <AppBar className={header}>
                {displayDesktop()}
            </AppBar>
        </header>
    );
}