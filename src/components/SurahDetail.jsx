import React, { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getSurahDetail, getTafsir, getQariList } from "../api";
import "../styles/SurahDetail.css";

const QARI = getQariList();

const SurahDetail = () => {
  const navigate = useNavigate();
  const { surahId } = useParams();
  const [surah, setSurah] = useState(null);
  const [tafsirData, setTafsirData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedQari, setSelectedQari] = useState("05");
  const [showLatin, setShowLatin] = useState(true);
  const [showTranslation, setShowTranslation] = useState(true);
  const [showDescription, setShowDescription] = useState(false);
  const [expandedTafsir, setExpandedTafsir] = useState({});
  const [playingAyat, setPlayingAyat] = useState(null);
  const audioRef = useRef(null);

  useEffect(() => {
    setLoading(true);
    setSurah(null);
    setTafsirData(null);
    setExpandedTafsir({});
    setPlayingAyat(null);

    Promise.all([getSurahDetail(surahId), getTafsir(surahId)]).then(
      ([surahData, tafsir]) => {
        setSurah(surahData);
        setTafsirData(tafsir);
        setLoading(false);
        window.scrollTo(0, 0);
      }
    );
  }, [surahId]);

  const stopAudio = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.onended = null;
      audioRef.current.onerror = null;
      audioRef.current.pause();
      audioRef.current.src = "";
      audioRef.current = null;
    }
  }, []);

  const handlePlayAyat = useCallback(
    (ayat) => {
      if (audioRef.current) {
        const wasSame = playingAyat === ayat.nomorAyat;
        stopAudio();
        setPlayingAyat(null);
        if (wasSame) return;
      }
      const src = ayat.audio?.[selectedQari];
      if (!src) return;
      const audio = new Audio(src);
      audio.onended = () => {
        if (audioRef.current === audio) {
          audioRef.current = null;
          setPlayingAyat(null);
        }
      };
      audio.onerror = () => {
        if (audioRef.current === audio) {
          audioRef.current = null;
          setPlayingAyat(null);
        }
      };
      audioRef.current = audio;
      setPlayingAyat(ayat.nomorAyat);
      audio.play().catch(() => {
        if (audioRef.current === audio) {
          audioRef.current = null;
          setPlayingAyat(null);
        }
      });
    },
    [selectedQari, playingAyat, stopAudio]
  );

  useEffect(() => {
    return () => stopAudio();
  }, [stopAudio]);

  const toggleTafsir = (ayatNum) => {
    setExpandedTafsir((prev) => ({ ...prev, [ayatNum]: !prev[ayatNum] }));
  };

  const getTafsirForAyat = (ayatNum) => {
    if (!tafsirData?.tafsir) return null;
    return tafsirData.tafsir.find((t) => t.ayat === ayatNum);
  };

  if (loading) {
    return (
      <div className="surah-detail-page">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <div className="loading-text">Memuat surah...</div>
        </div>
      </div>
    );
  }

  if (!surah) {
    return (
      <div className="surah-detail-page">
        <div className="loading-container">
          <div className="loading-text">Surah tidak ditemukan.</div>
          <button className="back-btn" onClick={() => navigate("/")}>
            Kembali
          </button>
        </div>
      </div>
    );
  }

  const prevSurah = surah.suratSebelumnya;
  const nextSurah = surah.suratSelanjutnya;

  return (
    <div className="surah-detail-page">
      <div className="detail-nav">
        <button className="back-btn" onClick={() => navigate("/")}>
          &#8592; Kembali
        </button>
        <div className="surah-nav-btns">
          <button
            className="nav-btn"
            disabled={!prevSurah}
            onClick={() => prevSurah && navigate(`/surah/${prevSurah.nomor}`)}
          >
            &#8592; {prevSurah ? prevSurah.namaLatin : ""}
          </button>
          <button
            className="nav-btn"
            disabled={!nextSurah}
            onClick={() => nextSurah && navigate(`/surah/${nextSurah.nomor}`)}
          >
            {nextSurah ? nextSurah.namaLatin : ""} &#8594;
          </button>
        </div>
      </div>

      <div className="surah-header-card">
        <div className="surah-header-arabic">{surah.nama}</div>
        <div className="surah-header-latin">{surah.namaLatin}</div>
        <div className="surah-header-meaning">{surah.arti}</div>
        <div className="surah-header-badges">
          <span className="badge">Surah ke-{surah.nomor}</span>
          <span className="badge">{surah.jumlahAyat} Ayat</span>
          <span className="badge">{surah.tempatTurun}</span>
        </div>
      </div>

      {surah.deskripsi && (
        <div className="surah-description">
          <button
            className="desc-toggle"
            onClick={() => setShowDescription(!showDescription)}
          >
            Deskripsi Surah
            <span className={`arrow ${showDescription ? "open" : ""}`}>
              &#9660;
            </span>
          </button>
          {showDescription && (
            <div
              className="desc-content"
              dangerouslySetInnerHTML={{ __html: surah.deskripsi }}
            />
          )}
        </div>
      )}

      <div className="audio-section">
        <div className="audio-section-title">Audio Full Surah</div>
        <div className="qari-selector">
          {QARI.map((q) => (
            <button
              key={q.id}
              className={`qari-btn ${selectedQari === q.id ? "active" : ""}`}
              onClick={() => setSelectedQari(q.id)}
            >
              {q.name}
            </button>
          ))}
        </div>
        <audio
          className="audio-player"
          controls
          key={`${surah.nomor}-${selectedQari}`}
          src={surah.audioFull?.[selectedQari]}
        />
      </div>

      <div className="reading-options">
        <button
          className={`reading-opt-btn ${showLatin ? "active" : ""}`}
          onClick={() => setShowLatin(!showLatin)}
        >
          Latin
        </button>
        <button
          className={`reading-opt-btn ${showTranslation ? "active" : ""}`}
          onClick={() => setShowTranslation(!showTranslation)}
        >
          Terjemahan
        </button>
      </div>

      <div className="ayat-list">
        {surah.ayat?.map((ayat) => {
          const tafsir = getTafsirForAyat(ayat.nomorAyat);
          const isPlaying = playingAyat === ayat.nomorAyat;
          const tafsirOpen = expandedTafsir[ayat.nomorAyat];

          return (
            <div className="ayat-card" key={ayat.nomorAyat}>
              <div className="ayat-header">
                <div className="ayat-num">{ayat.nomorAyat}</div>
                <div className="ayat-actions">
                  <button
                    className={`ayat-action-btn ${isPlaying ? "playing" : ""}`}
                    onClick={() => handlePlayAyat(ayat)}
                    title={isPlaying ? "Stop" : "Putar"}
                  >
                    {isPlaying ? "■" : "▶"}
                  </button>
                  {tafsir && (
                    <button
                      className="ayat-action-btn"
                      onClick={() => toggleTafsir(ayat.nomorAyat)}
                    >
                      Tafsir
                    </button>
                  )}
                </div>
              </div>
              <div className="ayat-body">
                <div className="ayat-arabic">{ayat.teksArab}</div>
                {showLatin && (
                  <div className="ayat-latin">{ayat.teksLatin}</div>
                )}
                {showTranslation && (
                  <div className="ayat-translation">{ayat.teksIndonesia}</div>
                )}
                {tafsir && tafsirOpen && (
                  <div className="tafsir-section">
                    <div className="tafsir-text">{tafsir.teks}</div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="detail-nav" style={{ marginTop: 24 }}>
        <button
          className="nav-btn"
          disabled={!prevSurah}
          onClick={() => prevSurah && navigate(`/surah/${prevSurah.nomor}`)}
        >
          &#8592; {prevSurah ? prevSurah.namaLatin : "Sebelumnya"}
        </button>
        <button
          className="nav-btn"
          disabled={!nextSurah}
          onClick={() => nextSurah && navigate(`/surah/${nextSurah.nomor}`)}
        >
          {nextSurah ? nextSurah.namaLatin : "Selanjutnya"} &#8594;
        </button>
      </div>
    </div>
  );
};

export default SurahDetail;
