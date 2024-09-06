import React from 'react';

function ProfilePage() {
    return (
        <div style={styles.container}>
            <div style={styles.profileHeader}>
				<div style={styles.profilePictureContainer}>
					<div style={styles.profilePicture}></div>
					<button style={styles.editProfileButton}>Edit Profile</button>
				</div>
				<div style={styles.profileInfo}>
					<h2>Name</h2>
					<p>Date of Birth</p>
					<p>Job Title</p>
					<p>Experience</p>
				</div>
			</div>
			<div style={styles.cvUploadContainer}>
				<button style={styles.cvUploadButton}>Upload CV</button>
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
    pageContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '100vw',
        backgroundColor: 'transparent', 
        alignItems: 'flex-start',
    },
    container: {
        fontFamily: "'Hammersmith One', sans-serif",
        padding: '15px',
        color: '#fff',
        margin: 0,
        display: 'flex',
        backgroundColor: 'transparent',
        flexDirection: 'column',
        alignItems:'center',
        width: '100vw',
        minHeight: "100vh",
        border: '1px solid #fff',
        borderRadius: '10px',
        boxShadow: '0 0 10px rgba(0,0,0,0.2)', 
        marginTop: '20px',
    },
    profileHeader: {
        display: 'flex',
		alignItems: "center",
    },
    profilePictureContainer: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		marginRight: "20px",
	},
    profilePicture: {
        width: '100px',
        height: '100px',
        backgroundColor: '#ddd',
        borderRadius: '50%',
    },
    profileInfo: {
        flex: 1,
        flexDirection: "column",
    },
    editProfileButton: {
        marginTop: "10px",
		padding: "8px 16px",
		backgroundColor: "#007bff",
		color: "#fff",
		border: "none",
		borderRadius: "5px",
		cursor: "pointer",
    },
    cvUploadContainer: {
		display: "flex",
		alignItems: "center",
		justifyContent: "flex-end",
	},
	cvUploadButton: {
		padding: "8px 16px",
		backgroundColor: "#28a745",
		color: "#fff",
		border: "none",
		borderRadius: "5px",
		cursor: "pointer",
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