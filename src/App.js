import React, { useEffect, useState } from 'react';
import './App.css';
import { getSurahList, findSimilarSurahByName } from "./api";

const App = () => {
  const [surahList, setSurahList] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [foundSurah, setFoundSurah] = useState([]);
  const [expandedSurah, setExpandedSurah] = useState(null);
  const [surahNotFound, setSurahNotFound] = useState(false);

  useEffect(() => {
    getSurahList().then((result) => {
      setSurahList(result);
    }).catch((error) => {
      console.error('Error fetching surah list:', error);
      setSurahList([]);
    });
  }, []);

  const handleInputChange = (e) => {
    setSearchInput(e.target.value);
  }

  const handleSearch = () => {
    const surah = findSimilarSurahByName(surahList, searchInput);
    if (surah.length === 0) {
      setSurahNotFound(true);
      setFoundSurah(surahList);
    } else {
      setSurahNotFound(false);
      setFoundSurah(surah);
    }
    setExpandedSurah(null); // Reset state expandedSurah saat melakukan pencarian baru
  }

  const toggleSurahDetails = (index) => {
    if (expandedSurah === index) {
      setExpandedSurah(null); // Tutup detail jika sudah terbuka
    } else {
      setExpandedSurah(index);
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Daftar Surah</h1>
        <input type="text" value={searchInput} onChange={handleInputChange} placeholder="Masukkan nama surah" />
        <button onClick={handleSearch}>Cari</button>
        {surahNotFound && <p>Surah tidak ditemukan.</p>}
        {foundSurah.length > 0 && (
          <div className="Surah-list">
            {foundSurah.map((surahItem, index) => (
              <div className='Surah-wrapper' key={index}>
                <div className='Surah-nama' onClick={() => toggleSurahDetails(index)}>
                  {surahItem.nama}
                </div>
                {expandedSurah === index && (
                  <div className='Surah-details'>
                    <div>Arti: {surahItem.arti}</div>
                    <div>Asma: {surahItem.asma}</div>
                    <div>Tipe: {surahItem.type}</div>
                    <div>Keterangan: <span dangerouslySetInnerHTML={{ __html: surahItem.keterangan }} /></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
