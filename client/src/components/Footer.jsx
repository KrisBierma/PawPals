import React, { useEffect } from "react";
import { useLocation } from 'react-router-dom';
import { Row } from "react-bootstrap";
import "../styles/Footer.css";


const Footer = () => {
  const pathname = useLocation().pathname;
  useEffect(() => {
    document.body.style.backgroundColor = pathname.includes('/browse') || pathname.includes('/news') || pathname.includes('/favorites') || pathname === "/" ? "#f0f1f2"
      :  pathname.includes('/admin') ? '#e9edf0' : '#fff'
  }, [pathname])
  return (
<>
  <footer className='main-footer'></footer>
  <div className="footer">
    <Row className='d-flex justify-content-between'>
      <p>PawPals &#169; 2021</p>
      <p>Pawprint favicon made by Freepik from Flaticon.</p>      
    </Row>
  </div>
  </>
  )
};

export default Footer;