import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import "../styles/SurahCard.css";

const SurahCard = ({ surah }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/surah/${surah.nomor}`);
  };

  return (
    <div className="surah-card" onClick={handleClick}>
      <h2 className="surah-name">{surah.nama}</h2>
      <p className="surah-latin">{surah.namaLatin}</p>
    </div>
  );
};

SurahCard.propTypes = {
  surah: PropTypes.shape({
    nomor: PropTypes.number.isRequired,
    nama: PropTypes.string.isRequired,
    namaLatin: PropTypes.string.isRequired,
  }).isRequired,
};

export default SurahCard;
