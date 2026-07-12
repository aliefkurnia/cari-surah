import React from "react";
import "../styles/About.css";

const About = () => {
  return (
    <section className="about-section" id="about">
      <h2>
        Tentang <span>CariSurah</span>
      </h2>
      <p>
        CariSurah adalah aplikasi Al-Qur'an digital yang memudahkan Anda untuk
        membaca, mendengarkan, dan memahami Al-Qur'an. Dilengkapi dengan
        terjemahan bahasa Indonesia, transliterasi Latin, tafsir, dan audio
        dari qari ternama.
      </p>

      <div className="about-features">
        <div className="about-feature">
          <div className="feature-icon">&#128214;</div>
          <h3>114 Surah Lengkap</h3>
          <p>Baca seluruh Al-Qur'an dengan teks Arab, transliterasi, dan terjemahan</p>
        </div>
        <div className="about-feature">
          <div className="feature-icon">&#127911;</div>
          <h3>Audio Per Ayat</h3>
          <p>Dengarkan tilawah dari 6 qari ternama dunia untuk setiap ayat</p>
        </div>
        <div className="about-feature">
          <div className="feature-icon">&#128218;</div>
          <h3>Tafsir</h3>
          <p>Pahami makna mendalam setiap ayat melalui tafsir lengkap</p>
        </div>
        <div className="about-feature">
          <div className="feature-icon">&#9998;</div>
          <h3>Kalkulator Zakat</h3>
          <p>Hitung kewajiban zakat maal Anda dengan mudah dan akurat</p>
        </div>
      </div>
    </section>
  );
};

export default About;
