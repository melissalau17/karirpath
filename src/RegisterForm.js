// src/components/RegisterForm.js
import React, { useState } from 'react';
import Image from './connect-you.png';

function RegisterForm() {
    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };

    return (
        <div style={styles.container}>
            <div style={styles.formSection}>
                <h1 style={styles.heading}>Make a Difference</h1>
                <form style={styles.form}>
                    <input type="text" placeholder="Full Name" style={styles.input} />
                    <input type="email" placeholder="Email" style={styles.input} />
                    <input type="password" placeholder="Password" style={styles.input} />
                    <input type="password" placeholder="Confirm Password" style={styles.input} />
                    <div style={styles.checkboxContainer}>
                        <input
                            type="checkbox"
                            id="terms"
                            checked={isChecked}
                            onChange={handleCheckboxChange}
                            style={styles.checkbox}
                        />
                        <label htmlFor="terms" style={styles.checkboxLabel}>
                            I agree to the <a href="#" style={styles.termsLink}>Terms and Conditions</a>
                        </label>
                    </div>
                    <button type="submit" style={styles.button}>Sign Up</button>
                </form>
            </div>
            <div style={styles.imageSection}>
                <img src={Image} alt="Connect Image" style={styles.image} />
            </div>
        </div>
    );
}

const styles = {
    container: {
        display: 'flex',
        width: '100vw',
        height: '100vh',
        backgroundColor: '#01212E',
        margin: 0,
        padding: 0,
    },
    formSection: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        padding: '20px', 
        color: '#fff',
        fontFamily: "'Hammersmith One', sans-serif",
    },
    heading: {
        color: '#fff',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        width: '100%',
    },
    input: {
        marginBottom: '10px',
        padding: '10px',
        borderRadius: '5px',
        border: '1px solid #fff',
        backgroundColor: 'transparent',
        color: 'white',
        width: '100%',
    },
    checkboxContainer: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '10px',
    },
    checkbox: {
        marginRight: '10px',
    },
    checkboxLabel: {
        color: '#fff',
    },
    termsLink: {
        color: '#1c8c84',
        textDecoration: 'none',
    },
    button: {
        padding: '10px',
        borderRadius: '5px',
        border: 'none',
        backgroundColor: '#1A7270',
        color: '#fff',
        cursor: 'pointer',
        width: '50%',
        fontFamily: "'Hammersmith One', sans-serif",
    },
    imageSection: {
        flex: 1,
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        padding: '20px', 
    },
    image: {
        maxWidth: '100%',
        height: 'auto',
    },
};

export default RegisterForm;