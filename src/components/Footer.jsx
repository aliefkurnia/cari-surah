import React from "react";
import "../styles/Footer.css"; // Sesuaikan path dengan lokasi file CSS Anda
import icon from "../images/getinon.png";
import iconfb from "../images/facebook.png";
import iconx from "../images/twitter.png";
import iconig from "../images/instagram.png";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-left">
          <ul className="footer-menu">
            <li>
              <a href="#home">Home</a>
            </li>
            <li>
              <a href="#zakat-calculator">Kalkulator Zakat</a>
            </li>
            <li>
              <a href="#about">Tentang Kami</a>
            </li>
          </ul>
          <div className="contact-info">
            <p>
              Contact us:{" "}
              <a href="mailto:support@example.com">support@example.com</a>
            </p>
          </div>
        </div>
        <div className="footer-right">
          <div className="store-links">
            <a href="/" target="_blank" rel="noopener noreferrer">
              <img src={icon} className="store-icon" alt="Get In Touch" />
            </a>
          </div>
          <div className="social-media">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <img src={iconfb} alt="Facebook" className="social-icon" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
            >
              <img src={iconx} alt="Twitter" className="social-icon" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <img src={iconig} alt="Instagram" className="social-icon" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
