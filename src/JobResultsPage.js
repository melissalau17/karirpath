import React from 'react';
import { useParams } from 'react-router-dom';

const JobResultsPage = () => {
    const { jobTitle } = useParams();

    return (
        <div>
            <h1>Results for '{jobTitle}'</h1>
            {/* Add your job result cards here */}
            <div>
                {/* Example of Job Cards */}
                <JobCard title="Web Designer" location="Jakarta" urgency="Urgent" />
                <JobCard title="UI/UX Designer" location="Jakarta" urgency="Normal" />
            </div>
        </div>
    );
};

const JobCard = ({ title, location, urgency }) => (
    <div>
        <h3>{title}</h3>
        <p>Location: {location}</p>
        <p>Urgency: {urgency}</p>
    </div>
);

export default JobResultsPage;
