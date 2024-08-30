import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from './Header';
import SignInForm from './SignInForm';
import RegisterForm from './RegisterForm';
import HomePage from './HomePage';

function App() {
    return (
        <Router>
            <div style={styles.container}>
                <Header />
                <div style={styles.mainContent}>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/signin" element={<SignInForm />} />
                        <Route path="/signup" element={<RegisterForm />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
    },
    header: {
        width: '100%',
        backgroundColor: '#01212E', 
        color: '#fff',
        textAlign: 'center',
    },
    mainContent: {
        display: 'flex',
    },
};

export default App;
