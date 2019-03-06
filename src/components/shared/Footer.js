import React from "react";
import { Link } from "react-router-dom";
import "../../css/styles.css";

const Footer = () => (
  <div>
    <footer>
      <div className="wrapper">
        <ul>
          <li>
            <h4>About US</h4>
          </li>
          <li>SendIT is a courier service.</li>
          <li>Where users can send parcels to different destinations.</li>
        </ul>
        <ul>
          <li>
            <h4>Get in Touch</h4>
          </li>
          <li>Lagos Address</li>
          <li>445 Ikorodu Road</li>
          <li>Illupeju, Lagos</li>
          <li>0814.4523.455</li>
        </ul>
        <ul>
          <li>
            <h4>Working Hours</h4>
          </li>
          <li>Weekdays: 7am to 9pm</li>
          <li>Weekends: 9am to 7pm</li>
          <li>Public Holidays: 10am to 7pm</li>
          <li>Festive Period: 9am to 6pm</li>
        </ul>
        <ul>
          <li>
            <h4>More Info</h4>
          </li>
          <li>
            <Link to="#">Careers</Link>
          </li>
          <li>
            <Link to="#"> Help Center</Link>
          </li>
          <li>
            <Link to="#">Terms&Conditions</Link>
          </li>
          <li>
            <Link to="#">Privacy Policy</Link>
          </li>
        </ul>
        <div id="copyright">Copyright &copy; 2018 SendIT. All rights reserved.</div>
      </div>
    </footer>
  </div>
);

export default Footer;
