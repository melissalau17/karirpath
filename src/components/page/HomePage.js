import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import logo from "../../assets/karirpath.png";
import bookmarkIcon from "../../assets/bookmark-icon.png";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../App";
import { GoogleGenerativeAI } from "@google/generative-ai";
import JobTrendChart from "../ui/charts/JobTrendChart";
import GraduationTotalChart from "../ui/charts/GraduationTotalChart";
import JobByLocationChart from "../ui/charts/JobByLocationChart";
import JobCard from "../ui/JobCard";
import ResultsPage from "../page/ResultsPage";


function HomePage() {
	const [searchQuery, setSearchQuery] = useState("");
	const [isSearchSubmitted, setIsSearchSubmitted] = useState(false);
	const [recentSearches, setRecentSearches] = useState([]);
	const [jobResult, setJobResult] = useState();
	const [courses, setCourses] = useState();
	const geminiApi = process.env.REACT_APP_GEMINI_API_KEY;
	const genAI = new GoogleGenerativeAI(geminiApi);
	const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
	const generationConfig = {
		temperature: 0,
		topP: 0.95,
		topK: 64,
		maxOutputTokens: 8192,
		responseMimeType: "text/plain",
	};
	const chatSession = model.startChat({
		generationConfig,
		history: [],
	});

	const handleSearchChange = (e) => {
		setSearchQuery(e.target.value);
	};

	const handleSearchInputChange = (event) => {
		setSearchQuery(event.target.value);
	};

	const handleSearch = async () => {
		if (searchQuery.trim() !== "") {
			setRecentSearches([...recentSearches, searchQuery]);
			setSearchQuery("");
			const SCHEMA = `CREATE TABLE  public."Country" (    id BIGINT GENERATED ALWAYS AS IDENTITY NOT NULL,    NAME TEXT NULL,    alpha_2 TEXT NULL,    alpha_3 TEXT NULL,    country_code INTEGER NULL,    iso_3166_2 TEXT NULL,    region TEXT NULL,    sub_region TEXT NULL,    intermediate_region TEXT NULL,    region_code INTEGER NULL,    sub_region_code INTEGER NULL,    intermediate_region_code INTEGER NULL,    CONSTRAINT country_pkey PRIMARY KEY (id)  ) TABLESPACE pg_default;CREATE TABLE  public."Industry" (    id BIGINT GENERATED ALWAYS AS IDENTITY NOT NULL,    nama TEXT NOT NULL,    CONSTRAINT industry_pkey PRIMARY KEY (id)  ) TABLESPACE pg_default;CREATE TABLE  public."Job" (    id BIGINT GENERATED ALWAYS AS IDENTITY NOT NULL,    title TEXT NULL,    description TEXT NULL,    salary_min TEXT NULL,    salary_max TEXT NULL,    id_location BIGINT NULL,    ROLE TEXT NULL,    id_roleclass BIGINT NULL,    id_workplacement BIGINT NULL,    id_worktype BIGINT NULL,    date TIMESTAMP WITH TIME ZONE NULL,    id_industry BIGINT NULL,    id_joblevel BIGINT NULL,    link TEXT NULL,    CONSTRAINT job_pkey PRIMARY KEY (id),    CONSTRAINT job_id_joblevel_fkey FOREIGN KEY (id_joblevel) REFERENCES "JobLevel" (id),    CONSTRAINT job_id_roleclass_fkey FOREIGN KEY (id_roleclass) REFERENCES "RoleClass" (id),    CONSTRAINT job_id_industry_fkey FOREIGN KEY (id_industry) REFERENCES "Industry" (id),    CONSTRAINT job_id_worktype_fkey FOREIGN KEY (id_worktype) REFERENCES "WorkType" (id),    CONSTRAINT job_location_fkey FOREIGN KEY (id_location) REFERENCES "Location" (id) ON UPDATE CASCADE,    CONSTRAINT job_id_workplacement_fkey FOREIGN KEY (id_workplacement) REFERENCES "WorkPlacement" (id)  ) TABLESPACE pg_default;CREATE TABLE  public."JobLevel" (    id BIGINT GENERATED ALWAYS AS IDENTITY NOT NULL,    nama TEXT NOT NULL,    CONSTRAINT joblevel_pkey PRIMARY KEY (id)  ) TABLESPACE pg_default;CREATE TABLE  public."Location" (    id BIGINT GENERATED ALWAYS AS IDENTITY NOT NULL,    city TEXT NOT NULL,    id_province BIGINT NULL,    id_country BIGINT NULL,    CONSTRAINT location_pkey PRIMARY KEY (id),    CONSTRAINT location_id_country_fkey FOREIGN KEY (id_country) REFERENCES "Country" (id),    CONSTRAINT location_id_province_fkey FOREIGN KEY (id_province) REFERENCES "Province" (id)  ) TABLESPACE pg_default;CREATE TABLE  public."Province" (    id BIGINT GENERATED ALWAYS AS IDENTITY NOT NULL,    nama TEXT NOT NULL,    CONSTRAINT province_pkey PRIMARY KEY (id)  ) TABLESPACE pg_default; TABLESPACE pg_default;CREATE TABLE  public."WorkPlacement" (    id BIGINT GENERATED ALWAYS AS IDENTITY NOT NULL,    NAME TEXT NOT NULL,    CONSTRAINT workplacement_pkey PRIMARY KEY (id)  )`;
			const RULES = `RULES:
                            1. Output only supabase posgresql query.
                            2. minimum limit is 5 if asked. never use limit if not asked.
                            3. maximum limit is 20,
                            4. always use LIKE and LOWER operator for string matching.
                            5. Table name and column name write with double quotation mark.
                            6. Maximum usage of WHERE operator is 5.
                            7. always using SELECT id, title, description, salary_min, salary_max, id_location, id_workplacement, id_worktype, date , id_joblevel, link`;
			let QUESTION = `QUESTION${searchQuery}`;
			const generatedQuery = await chatSession.sendMessage(
				`${SCHEMA} \n ${RULES} \n ${QUESTION}`
			);
			let queryText = generatedQuery.response.text();
			queryText = queryText.replace(/```/g, "");
			queryText = queryText.replace("sql", "");
			console.log(queryText);
			const dataResult = await supabase.rpc("rcp_execute_sql", {
				query: queryText,
			});

			console.log("dataResult.data");
			console.log(dataResult);
			setJobResult(dataResult.data);
            navigate(`/results?query=${encodeURIComponent(searchQuery)}`);
		}
	};

	const handleKeyDown = (event) => {
		if (event.key === "Enter") {
			handleSearch();
		}
	};

	const handleDeleteSearch = (index) => {
		const updatedSearches = recentSearches.filter((_, i) => i !== index);
		setRecentSearches(updatedSearches);
	};

    const [currentIndex, setCurrentIndex] = useState(0);

    const nextCourse = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % courseCard.length);
    };

    const prevCourse = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? courseCard.length - 1 : prevIndex - 1
        );
    };

	const courseCard = [
        { title: "Course 1", level: "Beginner", duration: "2h", rating: "4.5/5" },
        { title: "Course 2", level: "Intermediate", duration: "3h", rating: "4.7/5" },
        { title: "Course 3", level: "Advanced", duration: "4h", rating: "4.8/5" },
    ];

	const articles = [
		{
			title: "Jobs Predicted to Rise in 2024, According To Experts",
			link: "#",
			id: 1,
		},
		{
			title: "AI is Revolutionizing Job Markets: Here's What You Need to Know",
			link: "#",
			id: 2,
		},
	];

	useEffect(() => {
		supabase
			.from("Course")
			.select("*")
			.then((r) => {
				setCourses(r.data);
			});
	}, []);

	const navigate = useNavigate();

	return (
		<div style={styles.container}>
			{!isSearchSubmitted ? (
				<>
					<main style={styles.main}>
						<section style={styles.heroSection}>
							<h1>Empowering your Career</h1>
							<div style={styles.searchBar}>
								<div style={styles.searchInputWrapper}>
									<FaSearch onClick={handleSearch} style={styles.searchIcon} />
									<input
										type="text"
										placeholder="Search jobs"
										value={searchQuery}
										onChange={handleSearchInputChange}
										onKeyDown={handleKeyDown}
										style={styles.input}
									/>
								</div>
							</div>
						</section>

						<section style={styles.recentSearchesSection}>
							<div style={styles.recentSearchesRow}>
								<h2 style={styles.recentSearchesTitle}>Recent Searches:</h2>
								<div style={styles.recentSearchesContainer}>
									{recentSearches.map((search, index) => (
										<div key={index} style={styles.recentSearchItem}>
											<button style={styles.recentSearchButton}>
												<span
													onClick={() => handleDeleteSearch(index)}
													style={styles.deleteButton}
												>
													&times;
												</span>
												{search}
											</button>
										</div>
									))}
								</div>
							</div>
						</section>

						<section className="grid grid-cols-12">
							{jobResult &&
								jobResult.map((d) => {
									return (
										<div className="col-span-3 p-3">
											<JobCard
												title={d.title}
												salary={`Rp${d.salary_min}-Rp${d.salary_max}`}
												level={"Intermediete"}
												desc={d.description}
												date={d.date}
												link={d.link}
											/>
										</div>
									);
								})}
						</section>

						<section style={styles.jobsSection}>
							<div style={styles.jobsContainer}>
								<h2 style={styles.jobHeaderText}>New Jobs in Jakarta</h2>
								<div style={styles.filters}>
									<button style={styles.filterButton}>By City</button>
									<button style={styles.filterButton}>My Jobs</button>
								</div>
								<div style={styles.mapContainer}>
									<div style={styles.mapPlaceholder}>Map of Jakarta Jobs</div>
								</div>
								<div style={styles.jobItems}>
									<div style={styles.jobCard}>
										<div style={styles.jobHeader}>
											<h3 style={styles.jobTitle}>Job Title</h3>
											<p style={styles.jobLevel}>Level</p>
										</div>
										<div style={styles.divider}></div>
										<div style={styles.companyDetails}>
											<p style={styles.companyName}>
												<strong>Company</strong>
											</p>
											<p style={styles.jobDescription}>Job Description</p>
										</div>
										<div style={styles.jobFooter}>
											<button style={styles.applyButton}>Apply Now</button>
											<button style={styles.learnMoreButton}>Learn More</button>
											<img
												src={bookmarkIcon}
												alt="Bookmark"
												style={styles.bookmarkIcon}
											/>
										</div>
									</div>
								</div>
								<div style={styles.viewMoreButtonContainer}>
									<button style={styles.viewMoreButton}>View More</button>
								</div>
							</div>

							<div style={styles.jobsContainer}>
								<h2 style={styles.jobHeaderText}>Popular Jobs in Indonesia</h2>
								{/* <div style={styles.filters}>
									<button style={styles.filterButton}>By City</button>
									<button style={styles.filterButton}>My Jobs</button>
								</div> */}
								<div
									// style={styles.chartPlaceholder}
									className="border rounded-md h-full"
								>
									<JobByLocationChart />
								</div>
							</div>
						</section>

						<section style={styles.trendsSection}>
							<div
								// style={styles.trendsContainer}
								className="border rounded-lg mx-12 p-3"
							>
								{/* <h2 style={styles.chartTitle}>
									AI-Generated Job Trend Detector
								</h2> */}
								<div
									// style={styles.mapContainer}
									className="w-full h-96 grid grid-cols-12 "
								>
									<div className="rounded-md border col-span-6 mx-2">
										<JobTrendChart />
									</div>
									<div className="rounded-md border col-span-6 mx-2">
										<GraduationTotalChart />
									</div>
									{/* <div
										// style={styles.graphPlaceholder}
										className=""
									>
									</div> */}
								</div>
							</div>
						</section>

						<section style={styles.articlesCoursesSection}>
							<div style={styles.articlesContainer}>
								<h2 style={styles.articlesCoursesText}>Articles</h2>
								<div style={styles.articleGrid}>
									{articles.map((article) => (
										<div key={article.id} style={styles.articleCard}>
											<div style={styles.articleRow}>
												<div style={styles.imagePlaceholder}></div>
												<h4 style={styles.articleTitle}>{article.title}</h4>
											</div>
											<button style={styles.readMoreButton}>Read More</button>
										</div>
									))}
								</div>
								<div style={styles.viewMoreButtonContainer}>
									<button style={styles.viewMoreButton}>View More</button>
								</div>
							</div>

<<<<<<< HEAD
							<div style={styles.coursesContainer}>
                                <h2 style={styles.articlesCoursesText}>Courses For You</h2>
                                <div style={styles.carouselContainer}>
                                    <button style={{ ...styles.carouselButton, ...styles.leftButton }} onClick={prevCourse}>
                                        {"<"}
                                    </button>
                                    <div style={styles.carouselWrapper}>
                                        <div style={styles.courseCard}>
                                            <div style={styles.courseImagePlaceholder}></div>
                                            <h2>{courseCard[currentIndex].title}</h2>
                                            <div style={styles.courseInfo}>
                                                <span>{courseCard[currentIndex].level}</span>
                                                <span>{courseCard[currentIndex].duration}</span>
                                                <span>{courseCard[currentIndex].rating}</span>
                                            </div>
                                            <div style={styles.courseFooter}>
                                                <button style={styles.button}>Go to Website</button>
                                                <img
                                                    src={bookmarkIcon}
                                                    alt="Bookmark"
                                                    style={styles.bookmarkIcon}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <button style={{ ...styles.carouselButton, ...styles.rightButton }} onClick={nextCourse}>
                                        {">"}
                                    </button>
                                </div>
                            </div>
=======
							<div style={styles.articlesContainer}>
								<h2 style={styles.articlesCoursesText}>Courses</h2>
								{courses && <CourseCarousel courseCard={courses} />}
							</div>
>>>>>>> 72b4b92335f848b1a497ef7eaf17d6cedbd501dc
						</section>
					</main>
				</>
			) : (
				<ResultsPage />
			)}
		</div>
	);
}

<<<<<<< HEAD
=======
const CourseCarousel = ({ courseCard }) => {
	const [currentIndex, setCurrentIndex] = useState(0);

	const prevSlide = () => {
		setCurrentIndex(
			currentIndex === 0 ? courseCard.length - 1 : currentIndex - 1
		);
	};

	const nextSlide = () => {
		setCurrentIndex(
			currentIndex === courseCard.length - 1 ? 0 : currentIndex + 1
		);
	};

	return (
		<div style={styles.carouselContainer}>
			<button
				style={{ ...styles.carouselButton, ...styles.leftButton }}
				onClick={prevSlide}
			>
				&lt;
			</button>
			<div style={styles.coursesContainer}>
				{courseCard.map((course, index) => (
					<a
						href={course.url}
						target="_blank"
						style={{
							...styles.courseItem,
							display: currentIndex === index ? "block" : "none",
						}}
					>
						<div key={index} className="flex flex-col">
							<div className="flex flex-row">
								<p className=" text-sm mr-auto">{course.author}</p>
								<p className=" text-sm ">{course.level}</p>
							</div>
							<p>{course.title}</p>
							<hr />
							<p>{course.desc}</p>
						</div>
					</a>
				))}
			</div>
			<button
				style={{ ...styles.carouselButton, ...styles.rightButton }}
				onClick={nextSlide}
			>
				&gt;
			</button>
		</div>
	);
};

>>>>>>> 72b4b92335f848b1a497ef7eaf17d6cedbd501dc
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
		padding: "15px",
		margin: 0,
	},
	main: {
		flex: 1,
		padding: "20px",
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
	},
	heroSection: {
		fontSize: "30px",
		textAlign: "center",
		marginBottom: "20px",
	},
	searchBar: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		position: "relative",
		width: "100%",
		margin: "10px auto",
		border: "none",
		borderRadius: "15px",
	},
	searchInputWrapper: {
		position: "relative",
		display: "flex",
		alignItems: "center",
        width: "100%",
	},
	input: {
		padding: "10px 40px 10px 20px",
		fontSize: "16px",
		borderRadius: "25px",
		border: "1px solid #004A5E",
		outline: "none",
		width: "100%",
		color: "#333",
		backgroundColor: "#fff",
	},
	searchIcon: {
		position: "absolute",
		right: "10px",
		color: "#004A5E",
		cursor: "pointer",
	},
	searchButton: {
		padding: "10px 20px",
		fontSize: "16px",
		backgroundColor: "#1A7270",
		border: "none",
		cursor: "pointer",
		marginLeft: "10px",
		color: "#fff",
		borderRadius: "15px",
		fontFamily: "'Hammersmith One', sans-serif",
	},
	recentSearchesSection: {
		textAlign: "left",
		marginTop: "5px",
		marginBottom: "10px",
	},
	recentSearchesRow: {
		display: "flex",
		alignItems: "center",
	},
	recentSearchesTitle: {
		color: "#fff",
		fontSize: "18px",
		marginRight: "10px",
	},
	recentSearchesContainer: {
		display: "flex",
		gap: "10px",
	},
	recentSearchItem: {
		display: "flex",
		alignItems: "center",
		backgroundColor: "transparent",
		borderRadius: "5px",
	},
	recentSearchButton: {
		display: "flex",
		alignItems: "center",
		padding: "10px",
		backgroundColor: "#1A7270",
		color: "#fff",
		border: "none",
		borderRadius: "10px",
		cursor: "pointer",
		fontFamily: "'Hammersmith One', sans-serif",
		fontSize: "16px",
	},
	deleteButton: {
		backgroundColor: "transparent",
		color: "#fff",
		border: "none",
		borderRadius: "50%",
		width: "30px",
		height: "30px",
		display: "flex",
		alignItems: "center",
		cursor: "pointer",
	},
	jobsSection: {
		display: "flex",
		flexWrap: "wrap",
		width: "100%",
		padding: "20px",
		gap: "20px",
		boxSizing: "border-box",
		backgroundColor: "#01212E",
	},
	jobsContainer: {
		flex: 1,
		display: "flex",
		flexDirection: "column",
		backgroundColor: "transparent",
		border: "1px solid #fff",
		padding: "20px",
		borderRadius: "10px",
		color: "#000",
		height: "100%",
		overflow: "auto",
	},
	jobHeaderText: {
		fontSize: "25px",
		marginBottom: "5px",
		color: "#fff",
		marginTop: "0",
	},
	jobItems: {
		display: "grid",
		gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
		gap: "20px",
		padding: "20px",
	},
	jobCard: {
		background: "linear-gradient(180deg, #1A7270, #31D8D4)",
		borderRadius: "10px",
		padding: "20px",
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
	jobLevel: {
		fontSize: "12px",
		margin: "0",
	},
	divider: {
		height: "1px",
		backgroundColor: "#FFFFFF",
		opacity: 0.4,
		margin: "0",
	},
	companyDetails: {
		flexGrow: 1,
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
	},
	companyName: {
		fontSize: "14px",
		marginBottom: "0",
	},
	jobDescription: {
		fontSize: "14px",
	},
	jobFooter: {
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center",
	},
	applyButton: {
		padding: "8px 15px",
		backgroundColor: "#C5EBEB",
		color: "#000",
		borderRadius: "5px",
		border: "none",
		cursor: "pointer",
		fontFamily: "'Hammersmith One', sans-serif",
	},
	learnMoreButton: {
		padding: "8px 15px",
		backgroundColor: "#1A7270",
		color: "#000",
		borderRadius: "5px",
		border: "none",
		cursor: "pointer",
		fontFamily: "'Hammersmith One', sans-serif",
	},
	bookmarkIcon: {
		width: "40px",
		height: "40px",
		cursor: "pointer",
	},
	filters: {
		display: "flex",
		justifyContent: "flex-end",
		gap: "10px",
		marginBottom: "10px",
	},
	filterButton: {
		backgroundColor: "#004A5E",
		color: "#fff",
		padding: "10px 20px",
		border: "none",
		borderRadius: "5px",
		cursor: "pointer",
		fontFamily: "'Hammersmith One', sans-serif",
	},
	mapContainer: {
		flex: 1,
		backgroundColor: "#ccc",
		borderRadius: "10px",
		marginBottom: "20px",
	},
	jobItems: {
		flex: 1,
		display: "grid",
		gridTemplateColumns: "repeat(2, 1fr)",
		gap: "10px",
		marginBottom: "20px",
	},
	viewMoreButtonContainer: {
		display: "flex",
		justifyContent: "center",
		width: "100%",
	},
	viewMoreButton: {
		backgroundColor: "#1A7270",
		borderRadius: "5px",
		cursor: "pointer",
		color: "#fff",
		fontFamily: "'Hammersmith One', sans-serif",
		width: "50%",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		border: "none",
		padding: "8px 15px",
		textAlign: "center",
	},
	chartPlaceholder: {
		flex: 1,
		backgroundColor: "#ccc",
		borderRadius: "10px",
	},
	trendsSection: {
		width: "100vw",
		margin: "0",
		padding: "0",
		boxSizing: "border-box",
	},
	trendsContainer: {
		margin: "30px 20px 0 20px",
		display: "flex",
		flexDirection: "column",
		backgroundColor: "transparent",
		border: "1px solid #fff",
		padding: "0 20px",
		borderRadius: "10px",
		color: "#000",
		alignItems: "center",
		width: "calc(100% - 40px)",
		boxSizing: "border-box",
		overflow: "hidden",
	},
	chartTitle: {
		textAlign: "center",
		margin: "20px",
		color: "#fff",
	},
	graphPlaceholder: {
		width: "100%",
		height: "100%",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#ffffff",
		border: "1px solid #ddd",
	},
	articlesCoursesSection: {
		display: "flex",
		justifyContent: "space-between",
		gap: "20px",
		width: "100%",
		flexWrap: "nowrap",
		padding: "10px",
		textAlign: "center",
	},
	articlesContainer: {
		display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: "20px",
        backgroundColor: "transparent",
        border: "1px solid #fff",
        padding: "20px",
        borderRadius: "10px",
	},
	courseItem: {
		width: "50%",
		textAlign: "center",
		backgroundColor: "#fff",
		color: "#000",
		padding: "20px",
		borderRadius: "10px",
		boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
		transition: "opacity 0.5s ease-in-out",
	},
	coursesContainer: {
		display: "flex",
        flexDirection: "column",
        backgroundColor: "transparent",
        padding: "20px",
        borderRadius: "10px",
        border: "1px solid #fff",
        width: "calc(100% - 40px)",
        color: "#000",
        boxSizing: "border-box",
        overflow: "hidden",
        position: "relative",
	},
    coursesTitle: {
		fontSize: "25px",
		color: "#fff",
		marginBottom: "10px",
		textAlign: "center",
	},
	aiJobTrend: {
		backgroundColor: "#01212E",
		padding: "20px",
		border: "1px solid #FFFFFF",
		marginBottom: "40px",
	},
	trendGraph: {
		backgroundColor: "#FFFFFF",
		color: "#000",
		height: "300px",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		marginTop: "20px",
	},
	contentSections: {
		display: "flex",
		justifyContent: "space-around",
		alignItems: "flex-start",
		margin: "40px 0",
	},
	articles: {
		backgroundColor: "#01212E",
		padding: "20px",
		border: "2px solid #FFFFFF",
	},
	articlesCoursesText: {
		fontSize: '24px',
        color: '#fff',
        margin: '0 0 20px 0',  
        textAlign: 'center',
        display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
	sectionTitle: {
		fontSize: "24px",
		marginBottom: "10px",
	},
	articleGrid: {
		display: "grid",
		gridTemplateColumns: "repeat(2, 1fr)",
		gap: "10px",
		marginBottom: "10px",
	},
	articleRow: {
		display: "flex",
		alignItems: "center",
		marginBottom: "5px",
	},
	articleCard: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "space-between",
		width: "320px",
		padding: "10px",
		backgroundColor: "#fff",
		color: "#000",
		margin: "0",
		borderRadius: "10px",
		textAlign: "left",
		border: "1px solid #000",
		boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
	},
	articleTitle: {
		width: "50%",
		fontSize: "20px",
		fontWeight: "bold",
		textAlign: "left",
		marginRight: "10px",
		marginBottom: "10px",
	},
	imagePlaceholder: {
		width: "50%",
		height: "200px",
		backgroundColor: "#f0f0f0",
		marginRight: "10px",
		flexShrink: 0,
	},
    courseImagePlaceholder: {
        width: "100%",              
        height: "150px",
        backgroundColor: "#f0f0f0",
        borderRadius: "10px 10px 0 0", 
        marginBottom: "10px",                   
        display: "block",
    },
	readMoreButton: {
		backgroundColor: "#000",
        fontSize: "14px",
        color: "#fff",
        border: "none",
        padding: "8px 12px",
        borderRadius: "5px",
        cursor: "pointer",
        width: "100%",
        fontFamily: "'Hammersmith One', sans-serif",
	},
	jobCard: {
		background: "linear-gradient(180deg, #1A7270, #31D8D4)",
		borderRadius: "10px",
		padding: "20px",
		color: "#FFFFFF",
		boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
		display: "flex",
		flexDirection: "column",
		justifyContent: "space-between",
		position: "relative",
		overflow: "hidden",
	},
    courseCarousel: {
		display: "flex",
		flexDirection: "row",
		overflowX: "auto",
		padding: "10px 0",
	},
    carouselWrapper: {
		display: "flex",
		overflowX: "auto",
        alignItems: "center",
        justifyContent: "center",
        overflowX: "hidden",
        boxSizing: "border-box",
		scrollBehavior: "smooth",
	},
	courseCard: {
		backgroundColor: "#FFFFFF",
		color: "#000",
		padding: "10px",
		borderRadius: "10px",
		textAlign: "left",
		display: "inline-block",
		width: "300px",
		margin: "0 10px",
        flex: "0 0 auto",
		boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        position: 'relative',
	},
    courseInfo: {
        display: "flex",
        justifyContent: "space-between",
        fontSize: "14px",
    },
    courseTitle: {
		fontSize: "18px",
		fontWeight: "bold",
		marginBottom: "10px",
	},
	courseDescription: {
		fontSize: "14px",
	},
    courseFooter: {
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        width: '100%',  
        paddingTop: '10px', 
        gap: '10px',
    },
    button: {
        backgroundColor: "#000",
        fontFamily: "'Hammersmith One', sans-serif",
        color: "#FFFFFF",
        border: "none",
        padding: "10px 20px",
        borderRadius: "5px",
        marginTop: "10px",
        cursor: "pointer",
        width: '100%',
        boxSizing: 'border-box',
    },
	carouselButton: {
		position: "absolute",
		top: "50%",
		transform: "translateY(-50%)",
		backgroundColor: "#1A7270",
		border: "none",
		borderRadius: "50%",
        fontSize: "20px",
		width: "40px",
		height: "40px",
		color: "#fff",
		cursor: "pointer",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		zIndex: 1,
	},
	leftButton: {
		left: "10px",
	},
	rightButton: {
		right: "10px",
	},
	footer: {
		textAlign: "center",
		backgroundColor: "#02353C",
		padding: "10px 0",
	},
	logo: {
		width: "50px",
		margin: 0,
		padding: 0,
	},
};

export default HomePage;
