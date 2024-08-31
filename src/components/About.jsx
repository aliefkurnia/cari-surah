import React from "react";
import "../styles/About.css"; // Import CSS khusus untuk About

const About = () => {
  return (
    <section className="about-section" id="about">
      <div className="about-container">
        <h1>About Us</h1>
        <p>
          Welcome to our application! This app provides a convenient way to
          explore and learn about various Surahs from the Quran. Our mission is
          to make accessing Islamic texts and information easier for everyone.
          We strive to provide accurate and comprehensive information to help
          users better understand and appreciate the Quranic teachings.
        </p>
        <p>
          If you have any questions or feedback, feel free to contact us through
          our Contact page.
        </p>
      </div>
    </section>
  );
};

export default About;
