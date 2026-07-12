import React, { useState, useEffect, useMemo } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import SurahCard from "./components/SurahCard";
import SurahDetail from "./components/SurahDetail";
import ZakatCalculator from "./components/ZakatCalculator";
import About from "./components/About";
import Doa from "./components/Doa";
import { getSurahList, findSimilarSurahByName } from "./api";

const ITEMS_PER_PAGE = 12;

const App = () => {
  const [surahList, setSurahList] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [filter, setFilter] = useState("semua");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    getSurahList()
      .then((result) => {
        setSurahList(result || []);
        setLoading(false);
      })
      .catch(() => {
        setSurahList([]);
        setLoading(false);
      });
  }, []);

  const filteredSurahs = useMemo(() => {
    let list = surahList;

    if (filter === "makkiyah") {
      list = list.filter((s) => s.tempatTurun === "Mekah");
    } else if (filter === "madaniyah") {
      list = list.filter((s) => s.tempatTurun === "Madinah");
    }

    if (searchInput.trim()) {
      return findSimilarSurahByName(list, searchInput.trim());
    }

    return list;
  }, [surahList, searchInput, filter]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchInput, filter]);

  const totalPages = Math.ceil(filteredSurahs.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentSurahs = filteredSurahs.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const { ref: heroRef, inView: heroInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const { ref: zakatRef, inView: zakatInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const { ref: aboutRef, inView: aboutInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const makkiyahCount = surahList.filter((s) => s.tempatTurun === "Mekah").length;
  const madaniyahCount = surahList.length - makkiyahCount;

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let end = Math.min(totalPages, start + maxVisible - 1);
    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }
    for (let i = start; i <= end; i++) pages.push(i);
    return pages;
  };

  return (
    <Router>
      <div className="App">
        <Header />
        <div className="App-content">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <section
                    className={`hero ${heroInView ? "appear" : ""}`}
                    id="home"
                    ref={heroRef}
                  >
                    <div className="hero-bismillah">&#65010;</div>
                    <h1>
                      Al-Qur'an <span>Digital</span>
                    </h1>
                    <p>
                      Baca, dengarkan, dan pahami Al-Qur'an dengan terjemahan
                      Indonesia, transliterasi Latin, tafsir, serta audio dari
                      qari ternama dunia.
                    </p>

                    <div className="search-container">
                      <span className="search-icon">&#128269;</span>
                      <input
                        className="search-input"
                        type="text"
                        placeholder="Cari surah... (contoh: Al-Fatihah, Yasin)"
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                      />
                    </div>

                    <div className="filter-tabs">
                      <button
                        className={`filter-tab ${filter === "semua" ? "active" : ""}`}
                        onClick={() => setFilter("semua")}
                      >
                        Semua ({surahList.length})
                      </button>
                      <button
                        className={`filter-tab ${filter === "makkiyah" ? "active" : ""}`}
                        onClick={() => setFilter("makkiyah")}
                      >
                        Makkiyah ({makkiyahCount})
                      </button>
                      <button
                        className={`filter-tab ${filter === "madaniyah" ? "active" : ""}`}
                        onClick={() => setFilter("madaniyah")}
                      >
                        Madaniyah ({madaniyahCount})
                      </button>
                    </div>

                    <div className="stats-bar">
                      <div className="stat-item">
                        <div className="stat-value">114</div>
                        <div className="stat-label">Surah</div>
                      </div>
                      <div className="stat-item">
                        <div className="stat-value">6.236</div>
                        <div className="stat-label">Ayat</div>
                      </div>
                      <div className="stat-item">
                        <div className="stat-value">30</div>
                        <div className="stat-label">Juz</div>
                      </div>
                    </div>
                  </section>

                  <section className="surah-section">
                    {loading ? (
                      <div className="no-results">Memuat daftar surah...</div>
                    ) : currentSurahs.length > 0 ? (
                      <>
                        <div className="surah-grid">
                          {currentSurahs.map((surah) => (
                            <SurahCard key={surah.nomor} surah={surah} />
                          ))}
                        </div>
                        {totalPages > 1 && (
                          <div className="pagination">
                            <button
                              className="page-btn"
                              disabled={currentPage === 1}
                              onClick={() => setCurrentPage((p) => p - 1)}
                            >
                              &#8249;
                            </button>
                            {getPageNumbers().map((num) => (
                              <button
                                key={num}
                                className={`page-btn ${currentPage === num ? "active" : ""}`}
                                onClick={() => setCurrentPage(num)}
                              >
                                {num}
                              </button>
                            ))}
                            <span className="page-info">
                              {startIndex + 1}-{Math.min(startIndex + ITEMS_PER_PAGE, filteredSurahs.length)} dari {filteredSurahs.length}
                            </span>
                            <button
                              className="page-btn"
                              disabled={currentPage === totalPages}
                              onClick={() => setCurrentPage((p) => p + 1)}
                            >
                              &#8250;
                            </button>
                          </div>
                        )}
                      </>
                    ) : (
                      <div className="no-results">
                        Surah tidak ditemukan untuk "{searchInput}"
                      </div>
                    )}
                  </section>

                  <div className="section-divider">
                    <hr />
                  </div>

                  <div
                    className={zakatInView ? "appear" : ""}
                    ref={zakatRef}
                    style={{ opacity: zakatInView ? 1 : 0 }}
                  >
                    <ZakatCalculator />
                  </div>

                  <div className="section-divider">
                    <hr />
                  </div>

                  <div
                    className={aboutInView ? "appear" : ""}
                    ref={aboutRef}
                    style={{ opacity: aboutInView ? 1 : 0 }}
                  >
                    <About />
                  </div>
                </>
              }
            />
            <Route path="/surah/:surahId" element={<SurahDetail />} />
            <Route path="/doa" element={<Doa />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
