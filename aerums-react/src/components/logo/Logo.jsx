import React from 'react';
import './Logo.css'
import LogoImage from '../../images/LogoImage.jpg'

const Logo = () => {
    return (
        <div className='logoContainer'>
            <img className='logoImage' src={LogoImage} alt='LogoImage'></img>
            <div className='logoText'>
                <h1>Aerums</h1>
                <p>Vi hörs!</p>
            </div>
        </div>
    );
}

export default Logo;
