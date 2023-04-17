// HeroSection.js
import React from 'react';
import './HeroSection.css';
import ImageSlider from '../heroSection/ImageSlider'
import { Link } from "react-router-dom";

const HeroSection = ({ images }) => {
    return (
        <div className="hero-container">
            <div className="hero-text">
                <h2>Hitta tiden för vänskap</h2>
                <p>Trött på att aldrig hitta tid för att umgås med dina bästa vänner? </p>
                <p>Glöm bökiga WhatsApp-grupper och timmar av planerande! </p>
                <p>Vi har lösningen</p>
                <p> - en sida där du kan enkelt lägga till tider när du är ledig för att träffa dina vänner. Skicka sedan en förfrågan till dina vänner och vi hittar den perfekta matchningen på era lediga tider. </p>
                <p>Så varför vänta? </p>
                <p>Logga in nu och börja planera roliga stunder med dina favoritmänniskor</p>
                <button style={{ width: "100px" }}><Link to={"/login"}>Logga in
                </Link></button>
                <button style={{ width: "100px" }}><Link to={"/register"}>Registrera
                </Link></button>
            </div>
            <div className="hero-image">
                <ImageSlider images={images} />
            </div>
        </div>
    );
};

export default HeroSection;




