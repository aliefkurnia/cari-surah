import React from "react";
import "../styles/Footer.css"; // Sesuaikan path dengan lokasi file CSS Anda
import icon from "../images/getinon.png";
import iconfb from "../images/facebook.png";
import iconx from "../images/twitter.png";
import iconig from "../images/instagram.png";

const Footer = () => {
  return (
    <footer className="Footer">
      <div className="footer-content">
        <div className="store-links">
          <a href="/" target="_blank" rel="noopener noreferrer">
            <img src={icon} className="store-icon" alt="" />
          </a>
        </div>
        <div className="contact-info">
          <p>
            Contact us:{" "}
            <a href="mailto:support@example.com">support@example.com</a>
          </p>
        </div>
        <div className="social-media">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={iconfb} alt="Facebook" className="social-icon" />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={iconx} alt="Twitter" className="social-icon" />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={iconig} alt="Instagram" className="social-icon" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
