import React from "react";
import "./AboutHero.css";

const AboutHero = () => {
  return (
    <>
      <div className="AboutHeroContainer">
        <div className="AboutHeroContent">
          <div className="text">
            <h1>
              <span>ABOUT US</span>
            </h1>
            <p>
              "Home CareTaker connects skilled service providers with homeowners who need them. Vendors get work; users get peace of mind. Simple, secure, and designed for care."
            </p>
          </div>
        </div>
      </div>

      <div className="AnimatedText">
        <p>
          <span>Home CareTaker </span>
          bridges the gap between trusted service providers and homeowners looking for dependable help. Whether you're a vendor seeking opportunities or a user needing assistance, our platform ensures smooth, secure, and stress-free service bookings. Because every home deserves care delivered with professionalism and peace of mind.
        </p>
      </div>
    </>
  );
};

export default AboutHero;
