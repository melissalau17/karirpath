import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { supabase } from "../../App";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { GoogleGenerativeAI } from "@google/generative-ai";

function ResultsPage({ data }) {
	const [searchQuery, setSearchQuery] = useState("");
	const [recentSearches, setRecentSearches] = useState([]);
	const [jobResult, setJobResult] = useState([]);
	const [courses, setCourses] = useState([]);
	const navigate = useNavigate();
	const [searchParams, setSearchParams] = useSearchParams();

	useEffect(() => {
		let q = searchParams.get("query");
		setSearchQuery(q);
		handleSearch(q);
	}, []);

	useEffect(() => {}, [searchQuery]);

	const geminiApi = process.env.REACT_APP_GEMINI_API_KEY;
	const genAI = new GoogleGenerativeAI(geminiApi);
	const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
	const generationConfig = {
		temperature: 0.5,
		topP: 0.99,
		topK: 64,
		maxOutputTokens: 8192,
		responseMimeType: "text/plain",
	};
	const chatSession = model.startChat({
		generationConfig,
		history: [],
	});

	const handleSearch = async (q) => {
		const SCHEMA = `CREATE TABLE  public."Country" (    id BIGINT GENERATED ALWAYS AS IDENTITY NOT NULL,    NAME TEXT NULL,    alpha_2 TEXT NULL,    alpha_3 TEXT NULL,    country_code INTEGER NULL,    iso_3166_2 TEXT NULL,    region TEXT NULL,    sub_region TEXT NULL,    intermediate_region TEXT NULL,    region_code INTEGER NULL,    sub_region_code INTEGER NULL,    intermediate_region_code INTEGER NULL,    CONSTRAINT country_pkey PRIMARY KEY (id)  ) TABLESPACE pg_default;CREATE TABLE  public."Industry" (    id BIGINT GENERATED ALWAYS AS IDENTITY NOT NULL,    nama TEXT NOT NULL,    CONSTRAINT industry_pkey PRIMARY KEY (id)  ) TABLESPACE pg_default;CREATE TABLE  public."Job" (    id BIGINT GENERATED ALWAYS AS IDENTITY NOT NULL,    title TEXT NULL,    description TEXT NULL,    salary_min TEXT NULL,    salary_max TEXT NULL,    id_location BIGINT NULL,    ROLE TEXT NULL,    id_roleclass BIGINT NULL,    id_workplacement BIGINT NULL,    id_worktype BIGINT NULL,    date TIMESTAMP WITH TIME ZONE NULL,    id_industry BIGINT NULL,    id_joblevel BIGINT NULL,    link TEXT NULL,    CONSTRAINT job_pkey PRIMARY KEY (id),    CONSTRAINT job_id_joblevel_fkey FOREIGN KEY (id_joblevel) REFERENCES "JobLevel" (id),    CONSTRAINT job_id_roleclass_fkey FOREIGN KEY (id_roleclass) REFERENCES "RoleClass" (id),    CONSTRAINT job_id_industry_fkey FOREIGN KEY (id_industry) REFERENCES "Industry" (id),    CONSTRAINT job_id_worktype_fkey FOREIGN KEY (id_worktype) REFERENCES "WorkType" (id),    CONSTRAINT job_location_fkey FOREIGN KEY (id_location) REFERENCES "Location" (id) ON UPDATE CASCADE,    CONSTRAINT job_id_workplacement_fkey FOREIGN KEY (id_workplacement) REFERENCES "WorkPlacement" (id)  ) TABLESPACE pg_default;CREATE TABLE  public."JobLevel" (    id BIGINT GENERATED ALWAYS AS IDENTITY NOT NULL,    nama TEXT NOT NULL,    CONSTRAINT joblevel_pkey PRIMARY KEY (id)  ) TABLESPACE pg_default;CREATE TABLE  public."Location" (    id BIGINT GENERATED ALWAYS AS IDENTITY NOT NULL,    city TEXT NOT NULL,    id_province BIGINT NULL,    id_country BIGINT NULL,    CONSTRAINT location_pkey PRIMARY KEY (id),    CONSTRAINT location_id_country_fkey FOREIGN KEY (id_country) REFERENCES "Country" (id),    CONSTRAINT location_id_province_fkey FOREIGN KEY (id_province) REFERENCES "Province" (id)  ) TABLESPACE pg_default;CREATE TABLE  public."Province" (    id BIGINT GENERATED ALWAYS AS IDENTITY NOT NULL,    nama TEXT NOT NULL,    CONSTRAINT province_pkey PRIMARY KEY (id)  ) TABLESPACE pg_default; TABLESPACE pg_default;CREATE TABLE  public."WorkPlacement" (    id BIGINT GENERATED ALWAYS AS IDENTITY NOT NULL,    NAME TEXT NOT NULL,    CONSTRAINT workplacement_pkey PRIMARY KEY (id)  )`;
		const RULES = `RULES:
                            1. Output only supabase posgresql query.
                            2. minimum limit is 5 if asked. never use limit if not asked.
                            3. maximum limit is 20,
                            4. always use LIKE and LOWER operator for string matching and always use %%.
                            5. Table name and column name write with double quotation mark.
                            6. Maximum usage of WHERE operator is 5.
                            7. always using SELECT id, title, description, salary_min, salary_max, id_location, id_workplacement, id_worktype, date , id_joblevel, link`;
		let QUESTION = `QUESTION: ${searchQuery}`;
		const generatedQuery = await chatSession.sendMessage(
			`${SCHEMA} \n ${RULES} \n ${q || QUESTION}`
		);
		let queryText = generatedQuery.response.text();
		queryText = queryText.replace(/```/g, "");
		queryText = queryText.replace("sql", "");
		console.log(queryText);
		const dataResult = await supabase.rpc("rcp_execute_sql", {
			query: queryText,
		});

		// console.log("dataResult.data");
		// console.log(dataResult);
		setJobResult(dataResult.data);
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
				<h1 style={styles.headerText}>
					Results for '{searchQuery || "Web Designer"}'
				</h1>
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
						{[
							"Design webpage layout",
							"Responsive design",
							"Website Testing",
							"Wireframing & Prototyping",
							"User Experience",
							"Collaboration",
						].map((course, index) => (
							<button key={index} style={styles.courseTag}>
								{course}
							</button>
						))}
					</div>
				</section>

				<section style={styles.jobOutlookSection}>
					<p style={styles.jobOutlookText}>
						The web designer job is projected to grow <b>16%</b> from 2022 to
						2032, faster than the average for all occupations. About{" "}
						<b>19,000 openings</b>
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
										<a
											href={job.link}
											target="_blank"
											style={styles.applyButton}
										>
											Apply Now
										</a>
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
		color: "black",
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
