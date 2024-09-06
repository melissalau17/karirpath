import React, { useState } from 'react';
import bookmarkIcon from '../../assets/bookmark-icon.png';
import bookmarkedIcon from '../../assets/bookmarked-icon.png';

const loadSavedJobs = () => {
    const savedJobs = localStorage.getItem('savedJobs');
    return savedJobs ? JSON.parse(savedJobs) : [];
};

const saveJobsToLocalStorage = (jobs) => {
    localStorage.setItem('savedJobs', JSON.stringify(jobs));
};

function JobCard({ jobId, jobTitle, companyName, jobDescription }) {
    const [isBookmarked, setIsBookmarked] = useState(loadSavedJobs().includes(jobId));

    const handleBookmarkClick = () => {
        const savedJobs = loadSavedJobs();
        let updatedJobs;

        if (isBookmarked) {
            updatedJobs = savedJobs.filter(id => id !== jobId);
        } else {
            updatedJobs = [...savedJobs, jobId];
        }

        setIsBookmarked(!isBookmarked);
        saveJobsToLocalStorage(updatedJobs);
    };
    return (
        <div style={styles.jobCard}>
            <div style={styles.jobHeader}>
                <h3 style={styles.jobTitle}>{jobTitle}</h3>
                <button 
                    onClick={handleBookmarkClick} 
                    style={styles.bookmarkButton}
                >
                    <img 
                        src={isBookmarked ? bookmarkedIcon : bookmarkIcon} 
                        alt={isBookmarked ? 'Bookmarked' : 'Bookmark'} 
                        style={styles.icon}
                    />
                </button>
            </div>
            <hr style={styles.separator} />
            <p style={styles.companyName}>{companyName}</p>
            <p style={styles.jobDescription}>{jobDescription}</p>
        </div>
    );
}

const styles = {
    jobCard: {
        background: "linear-gradient(180deg, #1A7270, #31D8D4)",
        borderRadius: "10px",
        padding: "10px",
        color: "#FFFFFF",
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        position: "relative",
        overflow: "hidden",
    },
    jobHeader: {
        display: "flex",
        justifyContent: "space-between",
        marginBottom: "10px",
    },
    jobTitle: {
        fontSize: "18px",
        fontWeight: "bold",
        margin: 0,
    },
    companyName: {
        fontSize: "14px",
        marginTop: "10px",
        marginBottom: "10px",
    },
    jobDescription: {
        fontSize: "14px",
        marginTop: "10px",
        marginBottom: "10px",
    },
    bookmarkButton: {
        backgroundColor: 'transparent',
        border: '1px solid #fff',
        color: '#fff',
        cursor: 'pointer',
        padding: '5px 10px',
        borderRadius: '5px',
    },
    bookmarkedButton: {
        backgroundColor: 'black',
        border: 'none',
        color: '#fff',
        cursor: 'pointer',
        padding: '5px 10px',
        borderRadius: '5px',
    },
    separator: {
        margin: '10px 0',
    },
};

export default JobCard;
