import React from 'react';

function JobsPage() {
    const jobStatus = "Applied";

    return (
        <div style={styles.pageContainer}>
            <div style={styles.container}>
                <h2 style={styles.title}>Jobs Applied</h2>
                <div style={styles.jobList}>
                    <div style={styles.jobCard}>
                        <div style={styles.jobHeader}>
                            <h3 style={styles.jobTitle}>Job Title</h3>
                            <button style={styles.inProgressButton}>In Progress</button>
                        </div>
                        <hr style={styles.separator} />
                        <p style={styles.company}>Company</p>
                        <div style={styles.buttonContainer}>
                            <button style={styles.editButton}>Edit Application</button>
                            <button style={styles.cancelButton}>Cancel Application</button>
                        </div>
                    </div>
                    
                    <div style={styles.jobCard}>
                        <div style={styles.jobHeader}>
                            <h3 style={styles.jobTitle}>Job Title</h3>
                            <button style={styles.completedButton}>Applied</button>
                        </div>
                        <hr style={styles.separator} />
                        <p style={styles.company}>Company</p>
                        <div style={styles.buttonContainer}>
                            <button style={styles.applicationStatusButton}>Application Status</button>
                            <button style={styles.viewApplicationButton}>View Application</button>
                        </div>
                    </div>
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
        flexWrap: 'wrap',
        gap: '20px',
        width: '100%',
    },
    jobCard: {
        background: "linear-gradient(180deg, #1A7270, #31D8D4)",
        borderRadius: '10px',
        padding: '15px',
        margin: '10px 0',
        width: 'calc(50% - 10px)',
        display: 'flex',
        flexDirection: 'column',
    },
    jobHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    jobTitle: {
        fontSize: '20px',
        fontWeight: 'bold',
    },
    inProgressButton: {
        backgroundColor: '#FFC107', 
        padding: '5px 10px',
        color: '#000',
        border: 'none',
        borderRadius: '5px',
        fontSize: '14px',
    },
    completedButton: {
        backgroundColor: '#4CAF50',
        padding: '5px 10px',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        fontSize: '14px',
    },
    separator: {
        margin: '10px 0',
        border: 'none',
        borderTop: '1px solid #fff',
    },
    company: {
        textAlign: 'left',
        marginBottom: '10px',
    },
    buttonContainer: {
        display: 'flex',
        gap: '5px',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    editButton: {
        padding: '10px',
        backgroundColor: '#C5EBEB',
        borderRadius: '5px',
        color: '#000',
        border: 'none',
        fontFamily: "'Hammersmith One', sans-serif",
    },
    cancelButton: {
        padding: '10px',
        backgroundColor: '#FF6F61',
        borderRadius: '5px',
        color: '#fff',
        border: 'none',
        fontFamily: "'Hammersmith One', sans-serif",
    },
    applicationStatusButton: {
        padding: '10px',
        backgroundColor: '#1A7270',
        borderRadius: '5px',
        color: '#000',
        border: 'none',
        width: 'calc(50% - 5px)', // Half width minus gap
        textAlign: 'center',
    },
    viewApplicationButton: {
        padding: '10px',
        backgroundColor: '#C5EBEB',
        borderRadius: '5px',
        color: '#000',
        border: 'none',
        width: 'calc(50% - 5px)', // Half width minus gap
        textAlign: 'center',
    },
};

export default JobsPage;
