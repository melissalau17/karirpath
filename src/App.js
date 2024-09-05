import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from 'src/components/ui/Header';
import SignInPage from 'src/components/page/SignInPage';
import RegisterPage from 'src/components/page/RegisterPage';
import HomePage from 'src/components/page/HomePage';
import JobResultsPage from 'src/components/page/JobResultsPage';
import ProfilePage from 'src/components/page/ProfilePage';
import JobsPage from 'src/components/page/JobsPage';

function App() {
    return (
        <Router>
            <div style={styles.container}>
                <Header />
                <div style={styles.mainContent}>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/signin" element={<SignInPage />} />
                        <Route path="/signup" element={<RegisterPage />} />
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
        height: '100vh',  
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
        flex: 1,
        margin: 0,
        padding: 0,
        width: '100%',
    },
};

export default App;
