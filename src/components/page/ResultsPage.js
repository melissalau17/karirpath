import React from 'react';

function JobResultsPage() {
    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Results for 'Web Designer'</h1>
            <div style={styles.searchBoxContainer}>
                <input type="text" placeholder="Web Designer" style={styles.searchInput} />
                <button style={styles.searchButton}>Search</button>
            </div>
            <div style={styles.filters}>
                {/* Add your filter buttons */}
            </div>
            <div style={styles.jobList}>
                {/* Map through job results */}
                <div style={styles.jobCard}>
                    <h2 style={styles.jobTitle}>Job Title</h2>
                    <p style={styles.company}>Company</p>
                    <button style={styles.applyButton}>Apply Now</button>
                </div>
                {/* Repeat job cards */}
            </div>
        </div>
    );
}

const styles = {
    container: {
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    title: {
        fontSize: '36px',
        color: '#FFFFFF',
    },
    searchBoxContainer: {
        display: 'flex',
        margin: '20px 0',
    },
    searchInput: {
        padding: '10px',
        fontSize: '18px',
        borderRadius: '5px',
        marginRight: '10px',
        border: '1px solid #ccc',
    },
    searchButton: {
        padding: '10px 20px',
        backgroundColor: '#008CBA',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
    },
    jobList: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    jobCard: {
        backgroundColor: '#017C7A',
        borderRadius: '10px',
        margin: '10px',
        padding: '15px',
        width: '250px',
        color: 'white',
    },
    applyButton: {
        marginTop: '10px',
        padding: '10px',
        backgroundColor: '#00A86B',
        borderRadius: '5px',
        color: 'white',
        border: 'none',
    },
};

export default JobResultsPage;
