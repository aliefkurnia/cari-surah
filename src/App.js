import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { getSurahList } from "./api";
import SurahCard from "./components/SurahCard";
import SurahDetail from "./components/SurahDetail";
import ZakatCalculator from "./components/ZakatCalculator";
import About from "./components/About";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import { findSimilarSurahByName } from "./api";

const App = () => {
  const [surahList, setSurahList] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [foundSurah, setFoundSurah] = useState([]);
  const [surahNotFound, setSurahNotFound] = useState(false);
  const [emptyInputError, setEmptyInputError] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    getSurahList()
      .then((result) => {
        setSurahList(result);
        setFoundSurah(result);
      })
      .catch((error) => {
        console.error("Error fetching surah list:", error);
        setSurahList([]);
      });
  }, []);

  useEffect(() => {
    const handleScroll = (event) => {
      event.preventDefault();
      const targetId = event.currentTarget.getAttribute("href").slice(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    };

    const scrollLinks = document.querySelectorAll("a[href^='#']");
    scrollLinks.forEach((link) => {
      link.addEventListener("click", handleScroll);
    });

    return () => {
      scrollLinks.forEach((link) => {
        link.removeEventListener("click", handleScroll);
      });
    };
  }, []);

  const handleInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleSearch = () => {
    const trimmedInput = searchInput.trim();
    if (trimmedInput === "") {
      setSurahNotFound(false);
      setEmptyInputError(true);
      setFoundSurah(surahList);
    } else {
      const surah = findSimilarSurahByName(surahList, trimmedInput);
      if (surah.length === 0) {
        setSurahNotFound(true);
        setFoundSurah([]);
      } else {
        setSurahNotFound(false);
        setFoundSurah(surah);
      }
      setEmptyInputError(false);
      setCurrentPage(1);
    }
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentSurahs = foundSurah.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(foundSurah.length / itemsPerPage);

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
                  <header className="App-header" id="home">
                    <h1>Selamat Datang di Aplikasi Cari Surah</h1>
                    <p>
                      Temukan informasi lengkap tentang surah-surah dalam
                      Al-Qur'an, hitung zakat Anda, dan pelajari lebih lanjut
                      tentang topik-topik terkait. Gunakan kotak pencarian di
                      bawah untuk mencari surah berdasarkan nama. Aplikasi ini
                      dirancang untuk membantu Anda dalam memahami dan mengakses
                      Al-Qur'an dengan mudah.
                    </p>
                    <Stack
                      direction={{ xs: "column", sm: "row" }}
                      spacing={2}
                      alignItems="center"
                    >
                      <TextField
                        className="text-input"
                        variant="filled"
                        label="Masukkan nama surah"
                        onChange={handleInputChange}
                        InputLabelProps={{
                          style: {
                            color: "#5f7e78",
                            marginTop: "-5px",
                          },
                        }}
                        sx={{
                          "& .MuiFilledInput-root": {
                            fontSize: "3rem",
                            height: "5rem",
                          },
                          width: { xs: "100%", sm: "80%" },
                        }}
                      />

                      <Button
                        className="search-button"
                        variant="contained"
                        endIcon={<SearchIcon />}
                        onClick={handleSearch}
                        sx={{
                          width: { xs: "100%", sm: "auto" },
                          marginTop: { xs: "10px", sm: "0" },
                          backgroundColor: "#5f7e78",
                        }}
                      >
                        Cari
                      </Button>
                    </Stack>

                    {surahNotFound && <h3>Surah tidak ditemukan.</h3>}
                    {emptyInputError && (
                      <h3>Masukkan nama surah untuk mencari.</h3>
                    )}
                    <div className="surah-list">
                      {currentSurahs.map((surah) => (
                        <SurahCard key={surah.nomor} surah={surah} />
                      ))}
                    </div>
                    <Pagination
                      className="pagination"
                      count={totalPages}
                      page={currentPage}
                      onChange={handlePageChange}
                    />
                  </header>
                  <section className="calculator-section" id="zakat-calculator">
                    <ZakatCalculator />
                  </section>
                  <section className="about-section" id="about">
                    <About />
                  </section>
                </>
              }
            />
            <Route
              path="/surah/:surahId"
              element={<SurahDetail surahList={surahList} />}
            />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
