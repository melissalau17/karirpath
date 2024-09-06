import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../auth/supabaseClient';
import Image from '../../assets/connect-you.png'

function RegisterForm() {
    const [isChecked, setIsChecked] = useState(false);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (!isChecked) {
            setError('You must agree to the terms and conditions');
            return;
        }

        try {
            const { error } = await supabase.auth.signUp({
                email: formData.email,
                password: formData.password,
            });

            if (error) throw error;

			alert('Check your gmail to confirm')
            navigate('/');
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.formSection}>
                <h1 style={styles.heading}>Make a Difference</h1>
                {error && <p style={styles.error}>{error}</p>}
                <form style={styles.form} onSubmit={handleSubmit}>
                    <input type="text" name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleInputChange} style={styles.input} />
                    <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleInputChange} style={styles.input} />
                    <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleInputChange} style={styles.input} />
                    <input type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleInputChange} style={styles.input} />
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

// Styling for components
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
    error: {
        color: 'red',
        marginBottom: '10px',
    },
};

export default RegisterForm;
