import React from 'react';

function ProfilePage() {
    return (
        <div style={styles.container}>
            <div style={styles.profileHeader}>
                <div style={styles.profilePicture}></div>
                <div style={styles.profileInfo}>
                    <h2>Name</h2>
                    <p>Date of Birth</p>
                    <p>Job Title</p>
                    <p>Experience</p>
                    <button style={styles.editProfileButton}>Edit Profile</button>
                </div>
            </div>
            <div style={styles.sections}>
                <div style={styles.jobsApplied}>
                    <h3>Jobs Applied</h3>
                    {/* Jobs Applied List */}
                </div>
                <div style={styles.coursesEnrolled}>
                    <h3>Courses Enrolled</h3>
                    {/* Courses Enrolled List */}
                </div>
            </div>
        </div>
    );
}

const styles = {
    container: {
        padding: '20px',
        color: '#FFFFFF',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    profileHeader: {
        display: 'flex',
        width: '100%',
        justifyContent: 'space-between',
    },
    profilePicture: {
        width: '100px',
        height: '100px',
        backgroundColor: '#ccc',
        borderRadius: '50%',
    },
    profileInfo: {
        flex: 1,
        marginLeft: '20px',
    },
    editProfileButton: {
        padding: '10px 20px',
        backgroundColor: '#008CBA',
        border: 'none',
        borderRadius: '5px',
        color: '#fff',
    },
    sections: {
        display: 'flex',
        width: '100%',
        justifyContent: 'space-between',
        marginTop: '20px',
    },
    jobsApplied: {
        backgroundColor: '#017C7A',
        padding: '20px',
        borderRadius: '10px',
        width: '48%',
    },
    coursesEnrolled: {
        backgroundColor: '#017C7A',
        padding: '20px',
        borderRadius: '10px',
        width: '48%',
    },
};

export default ProfilePage;
