import React from 'react';

function JobsPage() {
    return (
        <div style={styles.pageContainer}>
            <div style={styles.container}>
                <h2 style={styles.title}>Jobs Applied</h2>
                <div style={styles.jobList}>
                    <div style={styles.jobCard}>
                        <h3 style={styles.jobTitle}>Job Title</h3>
                        <p style={styles.company}>Company</p>
                        <button style={styles.editButton}>Edit Application</button>
                    </div>
                    {/* Repeat job cards */}
                </div>
            </div>
        </div>
    );
}

const styles = {
    pageContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '100vw',
        backgroundColor: '#01212E', 
        alignItems: 'flex-start',
    },
    container: {
        fontFamily: "'Hammersmith One', sans-serif",
        padding: '20px',
        color: '#fff',
        display: 'flex',
        backgroundColor: 'transparent',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        maxWidth: '800px', 
        border: '1px solid #fff',
        borderRadius: '8px',
        boxShadow: '0 0 10px rgba(0,0,0,0.2)', 
        marginTop: '20px',
    },
    title: {
        fontSize: '24px',
        marginBottom: '20px',
    },
    jobList: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
    },
    jobCard: {
        background: "linear-gradient(180deg, #1A7270, #31D8D4)",
        borderRadius: '10px',
        padding: '15px',
        margin: '10px 0',
        width: '40%',
        alignItems: 'center',
    },
    editButton: {
        marginTop: '10px',
        padding: '10px',
        backgroundColor: '#C5EBEB',
        borderRadius: '5px',
        color: '#000',
        border: 'none',
        fontFamily: "'Hammersmith One', sans-serif",
    },
};

export default JobsPage;
