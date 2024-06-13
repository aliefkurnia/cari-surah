import React, { useEffect, useState } from "react";
import "./App.css";
import { getSurahList, findSimilarSurahByName } from "./api";
import SurahCard from "./SurahCard";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";

const App = () => {
  const [surahList, setSurahList] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [foundSurah, setFoundSurah] = useState([]);
  const [expandedSurah, setExpandedSurah] = useState(null);
  const [surahNotFound, setSurahNotFound] = useState(false);
  const [emptyInputError, setEmptyInputError] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    getSurahList()
      .then((result) => {
        setSurahList(result);
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
      setFoundSurah([]);
      setExpandedSurah(null);
      setEmptyInputError(true);
    } else {
      const surah = findSimilarSurahByName(surahList, trimmedInput);
      if (surah.length === 0) {
        setSurahNotFound(true);
        setFoundSurah(surahList);
      } else {
        setSurahNotFound(false);
        setFoundSurah(surah);
      }
      setExpandedSurah(null);
      setEmptyInputError(false);
      setCurrentPage(1);
    }
  };

  const toggleSurahDetails = (index) => {
    if (expandedSurah === index) {
      setExpandedSurah(null);
    } else {
      setExpandedSurah(index);
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
    <div className="App">
      <header className="App-header">
        <h1>Cari Surah</h1>
        <Stack direction="row" spacing={2} alignItems="center">
          <TextField
            className="text-input"
            variant="filled"
            label="Masukkan nama surah"
            value={searchInput}
            onChange={handleInputChange}
            error={emptyInputError}
            helperText={emptyInputError ? "Contoh: al fatihah" : ""}
          />
          <Button
            variant="contained"
            endIcon={<SearchIcon />}
            style={{
              backgroundColor: "#f1ead7",
              color: "#5f7e78",
              marginLeft: 10,
            }}
            onClick={handleSearch}
          >
            Cari
          </Button>
        </Stack>
        {emptyInputError && (
          <p className="error-message">Masukkan nama surah</p>
        )}
        {surahNotFound && <p>Surah tidak ditemukan.</p>}
        <div
          className={`Surah-list ${foundSurah.length > 0 ? "show" : "hide"}`}
        >
          <div className="Surah-list-container">
            {currentSurahs.map((surahItem, index) => (
              <SurahCard
                key={index}
                surah={surahItem}
                onClick={() => toggleSurahDetails(index)}
                expanded={expandedSurah === index}
              />
            ))}
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
        <p>Footer Content</p>
      </footer>
    </div>
  );
};

export default App;
