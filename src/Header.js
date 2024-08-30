// src/components/Header.js
import React from 'react';
import logo from './karirpath.png';
import { useNavigate } from 'react-router-dom';

function Header() {
    const navigate = useNavigate();

    const handleSignInClick = () => {
        navigate('/signin'); // Redirect to the Sign In page
    };

    return (
        <header style={styles.header}>
            <div style={styles.logoNavContainer}>
                <img src={logo} alt="karirpath-logo" style={styles.logo} />
                <nav style={styles.nav}>
                    <a href="#" style={styles.navLink}>Find Jobs</a>
                    <a href="#" style={styles.navLink}>Your Jobs</a>
                </nav>
            </div>
            <div style={styles.authButtons}>
                <button onClick={handleSignInClick} style={styles.signInButton}>Sign In</button>
                <button style={styles.partnerButton}>Be a Partner</button>
            </div>
        </header>
    );
}

const styles = {
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: 0,
        backgroundColor: '#02353C',
        fontFamily: "'Hammersmith One', sans-serif",
    },
    logoNavContainer: {
        display: 'flex',
        alignItems: 'center',
        margin: 0,
        padding: 0,
      },
    logo: {
        width: '80px',
        margin: 0,
        padding: 0,
    },
    nav: {
        display: 'flex',
        gap: '20px',
        marginLeft: '20px',
    },
    navLink: {
        textDecoration: 'none',
        color: '#fff',  
        fontSize: '18px',
        lineHeight: '1',
        margin: 0,
        padding: 0,
        fontFamily: "'Hammersmith One', sans-serif",  
      },
    authButtons: {
        display: 'flex',
        gap: '10px',
    },
    signInButton: {
        backgroundColor: '#006a6b',
        color: '#fff',
        border: 'none',
        padding: '10px 20px',
        cursor: 'pointer',
        fontFamily: "'Hammersmith One', sans-serif",
        borderRadius: '15px',
    },
    partnerButton: {
        backgroundColor: '#fff',
        color: '#000',
        border: '2px solid #000',
        padding: '10px 20px',
        cursor: 'pointer',
        fontFamily: "'Hammersmith One', sans-serif",
        borderRadius: '15px',
    },
};

export default Header;
