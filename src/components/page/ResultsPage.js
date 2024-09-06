import React from 'react';
import { FaSearch } from 'react-icons/fa';

function ResultsPage({ searchQuery, handleSearchInputChange, handleSearch }) {
    return (
        <div style={styles.resultsPage}>
            <main style={styles.main}>
                <section style={styles.resultsSection}>
                    <h1>Results for '{searchQuery}'</h1>
                    <div style={styles.searchBar}>
                        <input
                            type="text"
                            placeholder="Web Designer"
                            value={searchQuery}
                            onChange={handleSearchInputChange}
                            style={styles.input}
                        />
                        <FaSearch onClick={handleSearch} style={styles.searchIcon} />
                    </div>

                    <section style={styles.jobOutlookSection}>
                        <p>
                            The web designer job is projected to grow <b>16%</b> from 2022
                            to 2032, faster than average. Around <b>19,000</b> openings
                            per year are projected.
                        </p>
                    </section>

                    <section style={styles.jobsSection}>
                        <h2>Search Jobs in Jakarta</h2>
                        <div style={styles.jobItems}>
                            {/* Job items go here */}
                        </div>
                        <div style={styles.viewMoreButtonContainer}>
                            <button style={styles.viewMoreButton}>View More</button>
                        </div>
                    </section>

                    <section style={styles.coursesSection}>
                        <h2>Courses For You</h2>
                        {/* Courses slider goes here */}
                    </section>
                </section>
            </main>
        </div>
    );
}

const styles = {
    resultsPage: {
        fontFamily: "'Hammersmith One', sans-serif",
        backgroundColor: '#f5f5f5',
        minHeight: '100vh',
        padding: '20px',
    },
    main: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    resultsSection: {
        backgroundColor: '#fff',
        borderRadius: '8px',
        boxShadow: '0 0 10px rgba(0,0,0,0.1)',
        padding: '20px',
        width: '100%',
        maxWidth: '1200px',
        margin: '0 auto',
    },
    searchBar: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '20px',
    },
    input: {
        flex: 1,
        padding: '10px',
        borderRadius: '4px',
        border: '1px solid #ddd',
        marginRight: '10px',
    },
    searchIcon: {
        cursor: 'pointer',
        color: '#007BFF',
    },
    jobOutlookSection: {
        marginBottom: '20px',
    },
    jobsSection: {
        marginBottom: '20px',
    },
    jobItems: {
        display: 'flex',
        flexDirection: 'column',
    },
    viewMoreButtonContainer: {
        textAlign: 'center',
    },
    viewMoreButton: {
        padding: '10px 20px',
        backgroundColor: '#007BFF',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '16px',
    },
    coursesSection: {
        marginTop: '20px',
    },
};

export default ResultsPage;