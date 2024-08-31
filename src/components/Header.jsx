import React from "react";
import { Link } from "react-router-dom";
import "../styles/Header.css"; // Pastikan menambah file CSS untuk styling
import icon from "../images/icon.png";

const Header = () => {
  return (
    <header className="header">
      <div className="header-container">
        <div className="logo-container">
          <Link to="/">
            <img src={icon} alt="Quran App" className="header-logo" />
          </Link>
        </div>
        <nav className="header-nav">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/zakat-calculator">Kalkulator Zakat</Link>
            </li>
            <li>
              <Link to="/about">Tentang Kami</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
