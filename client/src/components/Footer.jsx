import React, { useEffect } from "react";
import "../styles/Footer.css";
import { useLocation } from 'react-router-dom';


const Footer = () => {
  const pathname = useLocation().pathname;
  useEffect(() => {
    document.body.style.backgroundColor = pathname.includes('/browse') || pathname === "/" ? "#f0f1f2"
      :  pathname.includes('/admin') ? '#e9edf0' : '#fff'
  }, [pathname])
  return (
<>
  <footer className='main-footer'></footer>
  <div className="footer">
    <row className='d-flex justify-content-between'>
      <p>PawPals &#169; 2021</p>
      <p>Pawprint favicon made by Freepik from Flaticon.</p>      
    </row>
  </div>
  </>
  )
};

export default Footer;