import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/SurahDetail.css";

const SurahDetail = ({ surahList }) => {
  const navigate = useNavigate();
  const { surahId } = useParams();
  const surah = surahList.find((s) => s.nomor === parseInt(surahId, 10));

  if (!surah) {
    return <div>Surah tidak ditemukan.</div>;
  }

  return (
    <div className="SurahDetail">
      <button className="back-button" onClick={() => navigate(-1)}>
        &larr; Back
      </button>
      <h1>
        {surah.namaLatin} - {surah.nama}
      </h1>
      <p>Jumlah Ayat: {surah.jumlahAyat}</p>
      <p>Arti: {surah.arti}</p>
      <p>Tempat Turun: {surah.tempatTurun}</p>
      <div dangerouslySetInnerHTML={{ __html: surah.deskripsi }} />
      <audio controls style={{ width: "100%", marginTop: "10px" }}>
        <source src={surah.audioFull["05"]} type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};

export default SurahDetail;
