import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Header.css";
import icon from "../images/icon.png";

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo-container">
          <Link to="/">
            <img src={icon} alt="Quran App" className="header-logo" />
          </Link>
        </div>
        <div
          className={`hamburger ${showMenu ? "active" : ""}`}
          onClick={() => setShowMenu(!showMenu)}
        >
          <div></div>
          <div></div>
          <div></div>
        </div>
        <nav className={`header-nav ${showMenu ? "show" : ""}`}>
          <ul>
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
        </nav>
      </div>
    </header>
  );
};

export default Header;
