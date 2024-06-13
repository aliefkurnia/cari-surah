import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import { getSurahList, findSimilarSurahByName } from "./api";
import SurahCard from "./SurahCard";
import SurahDetail from "./SurahDetail";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import icon from "./images/icon.png";

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
        setFoundSurah(result); // Initialize foundSurah with full list
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
      setFoundSurah(surahList); // Show full surah list
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
        <Routes>
          <Route
            path="/"
            element={
              <>
                <header className="App-header">
                  <img
                    src={icon}
                    alt="Icon"
                    style={{
                      width: "300px",
                      height: "auto",
                      marginBottom: "10px",
                    }}
                  />
                  <Stack direction="row" spacing={0} alignItems="center">
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
                      }}
                    />
                    <Button
                      className="search-button"
                      variant="contained"
                      endIcon={<SearchIcon />}
                      style={{
                        backgroundColor: "#f1ead7",
                        color: "#5f7e78",
                        height: "4rem",
                        width: "10rem",
                      }}
                      onClick={handleSearch}
                    >
                      Cari
                    </Button>
                  </Stack>
                  {emptyInputError && (
                    <p className="error-message" style={{ fontSize: "1rem" }}>
                      Masukkan nama surah
                    </p>
                  )}
                  {surahNotFound && <p>Surah tidak ditemukan.</p>}
                  <div
                    className={`Surah-list ${
                      foundSurah.length > 0 ? "show" : "hide"
                    }`}
                  >
                    <div className="Surah-list-container">
                      {foundSurah.length > 0 ? (
                        currentSurahs.map((surahItem, index) => (
                          <SurahCard key={index} surah={surahItem} />
                        ))
                      ) : (
                        <p>Tidak ada surah yang cocok.</p>
                      )}
                    </div>
                  </div>
                  {foundSurah.length > itemsPerPage && (
                    <Stack spacing={2}>
                      <Pagination
                        count={totalPages}
                        page={currentPage}
                        onChange={handlePageChange}
                        size="large"
                      />
                    </Stack>
                  )}
                </header>
                <footer className="App-footer">
                  <p>by Alief Kurnia for Portofolio only</p>
                </footer>
              </>
            }
          />
          <Route
            path="/surah/:surahId"
            element={<SurahDetail surahList={surahList} />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
