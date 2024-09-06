import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { supabase } from "../../App";
import { useNavigate } from "react-router-dom";

function ResultsPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [recentSearches, setRecentSearches] = useState([]);
	const [jobResult, setJobResult] = useState([]);
	const [courses, setCourses] = useState([]);
    const navigate = useNavigate();

    const handleSearch = async () => {
		// Logic for search handling...
	};

    const handleSearchInputChange = (event) => setSearchQuery(event.target.value);

    const handleKeyDown = (event) => {
		if (event.key === "Enter") handleSearch();
	};

	const handleDeleteSearch = (index) => {
		const updatedSearches = recentSearches.filter((_, i) => i !== index);
		setRecentSearches(updatedSearches);
	};

    return (
        <div style={styles.container}>
            <main style={styles.main}>
				<h1 style={styles.headerText}>Results for '{searchQuery || 'Web Designer'}'</h1>
				<div style={styles.searchBar}>
					<input 
						type="text"
						value={searchQuery}
						onChange={handleSearchInputChange}
						onKeyDown={handleKeyDown}
						placeholder="Web Designer"
						style={styles.input}
					/>
					<FaSearch style={styles.searchIcon} onClick={handleSearch} />
				</div>

				<section style={styles.coursesEnrolledSection}>
					<h2 style={styles.sectionTitle}>What do you do?</h2>
					<div style={styles.coursesEnrolled}>
						{['Design webpage layout', 'Responsive design', 'Website Testing', 'Wireframing & Prototyping', 'User Experience', 'Collaboration'].map((course, index) => (
							<button key={index} style={styles.courseTag}>{course}</button>
						))}
					</div>
				</section>

				<section style={styles.jobOutlookSection}>
					<p style={styles.jobOutlookText}>
						The web designer job is projected to grow <b>16%</b> from 2022 to 2032,
						faster than the average for all occupations. About <b>19,000 openings</b> 
						are projected each year, on average, over the decade.
					</p>
				</section>

				<section style={styles.jobsSection}>
					<h2 style={styles.sectionTitle}>Search Jobs in Jakarta</h2>
					<div style={styles.jobItems}>
						{jobResult.length ? (
							jobResult.map((job, index) => (
								<div key={index} style={styles.jobCard}>
									<h3>{job.title}</h3>
									<p>{job.description}</p>
									<div style={styles.jobActions}>
										<button style={styles.applyButton}>Apply Now</button>
										<button style={styles.learnMoreButton}>Learn More</button>
									</div>
								</div>
							))
						) : (
							<p>No jobs found.</p>
						)}
					</div>
					<button style={styles.viewMoreButton}>View More Jobs</button>
				</section>

				<section style={styles.coursesSection}>
					<h2 style={styles.sectionTitle}>Courses For You</h2>
					<div style={styles.courseCarousel}>
						{/* Carousel logic */}
						{courses.map((course, index) => (
							<div key={index} style={styles.courseCard}>
								<h3>Course Title</h3>
								<p>Level | Duration | Rating</p>
								<button style={styles.courseButton}>Go to Website</button>
							</div>
						))}
					</div>
				</section>
            </main>
        </div>
    );
}

const styles = {
    container: {
		display: "flex",
		width: "100vw",
		minHeight: "100vh",
		flexDirection: "column",
		boxSizing: "border-box",
		fontFamily: "'Hammersmith One', sans-serif",
		backgroundColor: "#01212E",
		color: "#fff",
		padding: "20px",
	},
    main: {
		flex: 1,
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	},
	headerText: {
		fontSize: "3em",
		margin: "20px 0",
	},
	searchBar: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		width: "100%",
	},
	input: {
		width: "400px",
		padding: "12px",
		borderRadius: "8px",
		border: "none",
		fontSize: "18px",
		marginRight: "10px",
		outline: "none",
	},
	searchIcon: {
		fontSize: "1.5em",
		cursor: "pointer",
	},
	coursesEnrolledSection: {
		marginTop: "40px",
		width: "100%",
		textAlign: "center",
	},
	sectionTitle: {
		fontSize: "1.8em",
		marginBottom: "20px",
	},
	coursesEnrolled: {
		display: "flex",
		justifyContent: "center",
		flexWrap: "wrap",
		gap: "10px",
	},
	courseTag: {
		padding: "10px 20px",
		backgroundColor: "#1A7270",
		color: "#fff",
		border: "none",
		borderRadius: "20px",
		cursor: "pointer",
	},
	jobOutlookSection: {
		marginTop: "40px",
		backgroundColor: "#013748",
		padding: "20px",
		borderRadius: "10px",
		width: "80%",
		textAlign: "center",
	},
	jobOutlookText: {
		fontSize: "1.2em",
	},
	jobsSection: {
		marginTop: "40px",
		width: "100%",
		textAlign: "center",
	},
	jobItems: {
		display: "flex",
		justifyContent: "space-around",
		flexWrap: "wrap",
		gap: "20px",
	},
	jobCard: {
		backgroundColor: "#01677C",
		borderRadius: "10px",
		padding: "20px",
		width: "250px",
	},
	jobActions: {
		marginTop: "20px",
		display: "flex",
		justifyContent: "space-between",
	},
	applyButton: {
		backgroundColor: "#007BFF",
		color: "#fff",
		padding: "10px",
		border: "none",
		borderRadius: "5px",
		cursor: "pointer",
	},
	learnMoreButton: {
		backgroundColor: "transparent",
		color: "#007BFF",
		border: "2px solid #007BFF",
		padding: "10px",
		borderRadius: "5px",
		cursor: "pointer",
	},
	viewMoreButton: {
		marginTop: "20px",
		backgroundColor: "#007BFF",
		color: "#fff",
		border: "none",
		padding: "10px 20px",
		borderRadius: "5px",
		cursor: "pointer",
	},
	coursesSection: {
		marginTop: "40px",
		width: "100%",
		textAlign: "center",
	},
	courseCarousel: {
		display: "flex",
		justifyContent: "center",
		gap: "20px",
		overflowX: "auto",
	},
	courseCard: {
		backgroundColor: "#014350",
		padding: "20px",
		borderRadius: "10px",
		width: "250px",
		textAlign: "center",
	},
	courseButton: {
		backgroundColor: "#007BFF",
		color: "#fff",
		padding: "10px 20px",
		border: "none",
		borderRadius: "5px",
		cursor: "pointer",
		marginTop: "10px",
	},
};

export default ResultsPage;
