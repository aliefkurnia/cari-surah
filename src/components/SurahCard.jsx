import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/SurahCard.css";

const SurahCard = ({ surah }) => {
  const navigate = useNavigate();

  return (
    <div className="surah-card" onClick={() => navigate(`/surah/${surah.nomor}`)}>
      <div className="surah-number">
        <span>{surah.nomor}</span>
      </div>
      <div className="surah-info">
        <div className="surah-latin">{surah.namaLatin}</div>
        <div className="surah-meta">
          <span>{surah.arti}</span>
          <span className="dot"></span>
          <span>{surah.jumlahAyat} Ayat</span>
          <span className="dot"></span>
          <span>{surah.tempatTurun}</span>
        </div>
      </div>
      <div className="surah-arabic">{surah.nama}</div>
    </div>
  );
};

export default SurahCard;
