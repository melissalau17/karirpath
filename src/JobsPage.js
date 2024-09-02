import React from 'react';

const JobsPage = () => {
    return (
        <div>
            <h1>Your Jobs</h1>
            <div>
                {/* Example of Job Status */}
                <JobStatus title="Web Designer" company="TechCorp" status="Applied" />
                <JobStatus title="UI/UX Designer" company="DesignHub" status="In Progress" />
            </div>
        </div>
    );
};

const JobStatus = ({ title, company, status }) => (
    <div>
        <h3>{title} at {company}</h3>
        <p>Status: {status}</p>
    </div>
);

export default JobsPage;
