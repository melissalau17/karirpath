import React from 'react';
import logo from '../../assets/karirpath.png'; // Adjust path as necessary

function Footer() {
    return (
        <footer style={styles.footer}>
            <div style={styles.content}>
                <img src={logo} alt="Footer Logo" style={styles.logo} />
                <div style={styles.copyrightContainer}>
                    <p style={styles.copyright}>Copyright &copy; 2024 karirpath</p>
                </div>
            </div>
        </footer>
    );
}

const styles = {
    footer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#02353C',
        padding: '10px 20px', 
        fontFamily: "'Hammersmith One', sans-serif",
    },
    content: {
        display: 'flex',
        width: '100%',
        justifyContent: 'space-between', 
        alignItems: 'center', 
    },
    logo: {
        width: '150px',
        margin: 0,
    },
    copyrightContainer: {
        flex: 1,
        textAlign: 'center', 
    },
    copyright: {
        color: '#FFFFFF',
        margin: '100px 0 0 0',
    },
};

export default Footer;
