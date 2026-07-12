import React, { useState, useEffect, useMemo } from "react";
import { getDoaList } from "../api";
import "../styles/Doa.css";

const ITEMS_PER_PAGE = 10;

const Doa = () => {
  const [doaList, setDoaList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchInput, setSearchInput] = useState("");
  const [selectedGrup, setSelectedGrup] = useState("semua");
  const [expandedDoa, setExpandedDoa] = useState({});
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    getDoaList().then((data) => {
      setDoaList(data);
      setLoading(false);
    });
  }, []);

  const grupList = useMemo(() => {
    const grups = [...new Set(doaList.map((d) => d.grup))];
    return grups.sort();
  }, [doaList]);

  const filtered = useMemo(() => {
    let list = doaList;

    if (selectedGrup !== "semua") {
      list = list.filter((d) => d.grup === selectedGrup);
    }

    if (searchInput.trim()) {
      const q = searchInput.toLowerCase();
      list = list.filter(
        (d) =>
          d.nama.toLowerCase().includes(q) ||
          d.idn.toLowerCase().includes(q) ||
          d.tag?.some((t) => t.toLowerCase().includes(q))
      );
    }

    return list;
  }, [doaList, searchInput, selectedGrup]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchInput, selectedGrup]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentDoas = filtered.slice(startIdx, startIdx + ITEMS_PER_PAGE);

  const toggleExpand = (id) => {
    setExpandedDoa((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const getPageNumbers = () => {
    const pages = [];
    const max = 5;
    let start = Math.max(1, currentPage - Math.floor(max / 2));
    let end = Math.min(totalPages, start + max - 1);
    if (end - start + 1 < max) start = Math.max(1, end - max + 1);
    for (let i = start; i <= end; i++) pages.push(i);
    return pages;
  };

  if (loading) {
    return (
      <div className="doa-page">
        <div className="doa-loading">
          <div className="loading-spinner"></div>
          <div className="loading-text">Memuat daftar doa...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="doa-page">
      <div className="doa-header">
        <h1>Kumpulan Doa</h1>
        <p>
          {doaList.length} doa harian dari Al-Qur'an dan Hadits
        </p>

        <div className="doa-search">
          <span className="doa-search-icon">&#128269;</span>
          <input
            type="text"
            placeholder="Cari doa... (contoh: tidur, makan, safar)"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>

        <div className="doa-grup-filter">
          <select
            value={selectedGrup}
            onChange={(e) => setSelectedGrup(e.target.value)}
          >
            <option value="semua">Semua Kategori ({doaList.length})</option>
            {grupList.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
        </div>
      </div>

      {currentDoas.length > 0 ? (
        <div className="doa-list">
          {currentDoas.map((doa) => {
            const isExpanded = expandedDoa[doa.id];
            return (
              <div className="doa-card" key={doa.id}>
                <div className="doa-card-header">
                  <span className="doa-card-grup">{doa.grup}</span>
                  <h3 className="doa-card-nama">{doa.nama}</h3>
                </div>

                <div className="doa-card-body">
                  <div className="doa-arabic">{doa.ar}</div>
                  <div className="doa-latin">{doa.tr}</div>
                  <div className="doa-translation">{doa.idn}</div>
                </div>

                {doa.tentang && (
                  <div className="doa-card-footer">
                    <button
                      className="doa-tentang-toggle"
                      onClick={() => toggleExpand(doa.id)}
                    >
                      {isExpanded ? "Sembunyikan" : "Sumber & Keterangan"}
                      <span className={`arrow ${isExpanded ? "open" : ""}`}>
                        &#9660;
                      </span>
                    </button>
                    {isExpanded && (
                      <div className="doa-tentang-text">{doa.tentang}</div>
                    )}
                  </div>
                )}

                {doa.tag?.length > 0 && (
                  <div className="doa-tags">
                    {doa.tag.map((t) => (
                      <span
                        key={t}
                        className="doa-tag"
                        onClick={() => setSearchInput(t)}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="doa-empty">
          Doa tidak ditemukan untuk "{searchInput}"
        </div>
      )}

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
            {startIdx + 1}-{Math.min(startIdx + ITEMS_PER_PAGE, filtered.length)}{" "}
            dari {filtered.length}
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
    </div>
  );
};

export default Doa;
