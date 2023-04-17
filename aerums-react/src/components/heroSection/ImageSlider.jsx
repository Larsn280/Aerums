import React, { useState, useEffect } from 'react';
import "./HeroSection.css"
import image1 from '../../images/Friends.jpg';
import image2 from '../../images/AerumsSlider.png';
import image3 from '../../images/AerumsSlider1.png';
import image4 from '../../images/AerumsSlider2.png';
import image5 from '../../images/AerumsSlider3.png';
import image6 from '../../images/AerumsSlider4.png';
import image7 from '../../images/AerumsSlider5.png';
import image8 from '../../images/AerumsSlider6.png';
import image9 from '../../images/AerumsSlider7.png';
import image10 from '../../images/AerumsSlider8.png';
import image11 from '../../images/AerumsSlider9.png';
import image12 from '../../images/AerumsSlider10.png';

const ImageSlider = () => {
    const images = [
        { src: image1, alt: 'image 1' },
        { src: image2, alt: 'image 2' },
        { src: image3, alt: 'image 3' },
        { src: image4, alt: 'image 4' },
        { src: image5, alt: 'image 5' },
        { src: image6, alt: 'image 6' },
        { src: image7, alt: 'image 7' },
        { src: image8, alt: 'image 8' },
        { src: image9, alt: 'image 9' },
        { src: image10, alt: 'image 10' },
        { src: image11, alt: 'image 11' },
        { src: image12, alt: 'image 12' },
    ];

    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((currentSlide + 1) % images.length);
        }, 4000); // Change this value to adjust the interval
        return () => clearInterval(interval);
    }, [currentSlide, images.length]);

    return (
        <div className="slider-container">
            <img className="slider-image" src={images[currentSlide].src} alt={images[currentSlide].alt} />
        </div>
    );
};

export default ImageSlider;
