import React from "react";
import "./Hero.css";
import { useNavigate } from "react-router-dom";
import Button from "../../../elements/button/Button";

const Hero = () => {
  const navigate = useNavigate();

  const navigateBook = () => {
    navigate("/request-service");
  };

  const navigateContact = () => {
    navigate("/contact");
  };

  return (
    <>
      <div className="HeroContainer">
        <div className="HeroContent">
          <div className="text">
            <h1>
              We <span>Care</span> for Your <span>Home</span> Like It's Our Own
            </h1> 
            <p>
            Enjoy Stress-Free, Expert Home Renovations with Home CareTaker – Quality Craftsmanship, On-Time Delivery, and Hassle-Free Service.
            </p>
          </div>
          <div className="buttons">
            <Button text={"Request Service"} onclick={navigateBook} />
            <Button text={"Contact Us"} onclick={navigateContact} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
