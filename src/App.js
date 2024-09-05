import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from './Header';
import SignInForm from './SignInForm';
import RegisterForm from './RegisterForm';
import HomePage from './HomePage';
import JobResultsPage from './JobResultsPage';
import ProfilePage from './ProfilePage';
import JobsPage from './JobsPage';

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
                        <Route path="/jobs/:jobTitle" element={<JobResultsPage />} />
                        <Route path="/profile" element={<ProfilePage />} />
                        <Route path="/my-jobs" element={<JobsPage />} />
                    </Routes>
                </div>
            </div>
        </Router>
    )
}

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        maxWidth: 'none',
        padding: 0,
    },
    header: {
        width: '100%',
        backgroundColor: '#01212E', 
        color: '#fff',
        textAlign: 'center',
    },
    mainContent: {
        display: 'flex',
        margin: 0,
        padding: 0,
        width: '100%',
    },
};

export default App;
