import React from 'react';

const ProfilePage = () => {
    return (
        <div>
            <h1>Profile Page</h1>
            <div>
                <img src="/profile-pic-placeholder.png" alt="Profile" />
                <div>
                    <p>Name: John Doe</p>
                    <p>Date of Birth: Jan 1, 1990</p>
                    <p>Job Title: Web Developer</p>
                    <p>Experience: 5 years</p>
                    <button>Upload CV</button>
                </div>
            </div>
            <div>
                <h2>Jobs Applied</h2>
                {/* Jobs applied component */}
            </div>
            <div>
                <h2>Courses Enrolled</h2>
                {/* Courses component */}
            </div>
        </div>
    );
};

export default ProfilePage;
