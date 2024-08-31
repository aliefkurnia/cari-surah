import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css"; // Impor file CSS global
import Header from "./components/Header";
import Footer from "./components/Footer"; // Impor Footer
import { getSurahList } from "./api";
import SurahCard from "./components/SurahCard";
import SurahDetail from "./components/SurahDetail";
import ZakatCalculator from "./components/ZakatCalculator";
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
                  <header className="App-header">
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
                            backgroundColor: "#ffffff",
                            fontSize: "1.2rem",
                            height: "4rem",
                          },
                          width: { xs: "100%", sm: "50%" },
                        }}
                      />
                      <Button
                        variant="contained"
                        endIcon={<SearchIcon />}
                        onClick={handleSearch}
                        sx={{
                          height: "3.5rem",
                          backgroundColor: "#5f7e78",
                          "&:hover": { backgroundColor: "#333" },
                          fontSize: "1.2rem",
                        }}
                      >
                        Cari
                      </Button>
                    </Stack>
                  </header>
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
                    color="primary"
                    sx={{ marginTop: "20px" }}
                  />
                </>
              }
            />
            <Route
              path="/surah/:surahId"
              element={<SurahDetail surahList={surahList} />}
            />
            <Route path="/zakat-calculator" element={<ZakatCalculator />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
