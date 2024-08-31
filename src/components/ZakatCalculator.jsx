import React, { useState } from "react";
import "../styles/ZakatCalculator.css";

const ZakatCalculator = () => {
  const [income, setIncome] = useState("");
  const [savings, setSavings] = useState("");
  const [zakat, setZakat] = useState(null);

  const calculateZakat = () => {
    const total = parseFloat(income) + parseFloat(savings);
    const zakatAmount = total * 0.025; // Zakat 2.5%
    setZakat(zakatAmount);
  };

  return (
    <section class="calculator-section" id="zakat-calculator">
      <div className="zakat-calculator">
        <h1>Kalkulator Zakat</h1>
        <div className="calculator-inputs">
          <input
            type="number"
            placeholder="Pendapatan Tahunan"
            value={income}
            onChange={(e) => setIncome(e.target.value)}
          />
          <input
            type="number"
            placeholder="Tabungan"
            value={savings}
            onChange={(e) => setSavings(e.target.value)}
          />
          <button onClick={calculateZakat}>Hitung Zakat</button>
        </div>
        {zakat !== null && (
          <div className="zakat-result">
            <p>Zakat yang harus dibayar: Rp {zakat.toFixed(2)}</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ZakatCalculator;
