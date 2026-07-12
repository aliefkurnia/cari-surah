import React, { useState } from "react";
import "../styles/ZakatCalculator.css";

const NISAB = 85 * 1100000;

const formatRupiah = (num) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(num);
};

const ZakatCalculator = () => {
  const [income, setIncome] = useState("");
  const [savings, setSavings] = useState("");
  const [result, setResult] = useState(null);

  const calculateZakat = (e) => {
    e.preventDefault();
    const total = (parseFloat(income) || 0) + (parseFloat(savings) || 0);
    const meetsNisab = total >= NISAB;
    const zakatAmount = meetsNisab ? total * 0.025 : 0;
    setResult({ total, zakatAmount, meetsNisab });
  };

  return (
    <section className="zakat-section" id="zakat-calculator">
      <div className="zakat-card">
        <h2>Kalkulator Zakat</h2>
        <p className="zakat-subtitle">
          Hitung kewajiban zakat maal Anda (2.5% dari total harta)
        </p>

        <form className="zakat-form" onSubmit={calculateZakat}>
          <div className="zakat-field">
            <label>Pendapatan Tahunan (Rp)</label>
            <input
              type="number"
              placeholder="Contoh: 120000000"
              value={income}
              onChange={(e) => setIncome(e.target.value)}
            />
          </div>
          <div className="zakat-field">
            <label>Total Tabungan & Investasi (Rp)</label>
            <input
              type="number"
              placeholder="Contoh: 50000000"
              value={savings}
              onChange={(e) => setSavings(e.target.value)}
            />
          </div>

          <div className="zakat-nisab">
            <span>&#9432;</span>
            Nisab: {formatRupiah(NISAB)} (setara 85 gram emas)
          </div>

          <button type="submit" className="zakat-btn">
            Hitung Zakat
          </button>
        </form>

        {result && (
          <div className="zakat-result">
            {result.meetsNisab ? (
              <>
                <div className="zakat-result-label">Zakat yang harus dibayar</div>
                <div className="zakat-result-value">
                  {formatRupiah(result.zakatAmount)}
                </div>
                <div className="zakat-result-note">
                  2.5% dari total harta {formatRupiah(result.total)}
                </div>
              </>
            ) : (
              <>
                <div className="zakat-result-label">Total Harta</div>
                <div className="zakat-result-value" style={{ color: "var(--text-secondary)" }}>
                  {formatRupiah(result.total)}
                </div>
                <div className="zakat-result-note below-nisab">
                  Harta Anda belum mencapai nisab ({formatRupiah(NISAB)}). Anda
                  tidak wajib membayar zakat maal, namun tetap dianjurkan untuk
                  bersedekah.
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default ZakatCalculator;
