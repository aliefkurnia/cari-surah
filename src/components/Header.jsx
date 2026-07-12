import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Header.css";

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="header-brand" onClick={() => setShowMenu(false)}>
          <div className="brand-icon">&#1602;</div>
          <div className="brand-text">
            Cari<span>Surah</span>
          </div>
        </Link>
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
              <a href="/#home" onClick={() => setShowMenu(false)}>
                Beranda
              </a>
            </li>
            <li>
              <Link to="/doa" onClick={() => setShowMenu(false)}>
                Doa
              </Link>
            </li>
            <li>
              <a href="/#zakat-calculator" onClick={() => setShowMenu(false)}>
                Kalkulator Zakat
              </a>
            </li>
            <li>
              <a href="/#about" onClick={() => setShowMenu(false)}>
                Tentang
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
