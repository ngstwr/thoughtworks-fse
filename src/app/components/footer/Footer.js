import React, { Component } from 'react';

import './Footer.css';

const Footer = props => {
  return (
    <footer>
      <div className="container">
        <div className="footer-wrapper">
          <p>Created by: <a href="https://www.nageshtiwari.me" target="_blank">Nagesh Tiwari</a></p>
          <p><a href="https://github.com/ngstwr/thoughtworks-fse" target="_blank">Github Repo URL</a></p>
        </div>
      </div>
    </footer>
  )
}

export default Footer;
