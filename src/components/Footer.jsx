import React from "react";
import { Link } from "react-router-dom";
import "../styles/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-brand">
          Cari<span>Surah</span>
        </div>
        <ul className="footer-links">
          <li>
            <a href="/#home">Beranda</a>
          </li>
          <li>
            <Link to="/doa">Doa</Link>
          </li>
          <li>
            <a href="/#zakat-calculator">Kalkulator Zakat</a>
          </li>
          <li>
            <a href="/#about">Tentang</a>
          </li>
        </ul>
      </div>
      <div className="footer-copy">
        Data Al-Qur'an dari equran.id &middot; {new Date().getFullYear()}
      </div>
    </footer>
  );
};

export default Footer;
