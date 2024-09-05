import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import logo from "../../assets/karirpath.png";
import bookmarkIcon from "../../assets/bookmark-icon.png";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../App";
import { GoogleGenerativeAI } from "@google/generative-ai";

function HomePage() {
<<<<<<< HEAD
    const [searchQuery, setSearchQuery] = useState("");
    const [isSearchSubmitted, setIsSearchSubmitted] = useState(false);
    const [recentSearches, setRecentSearches] = useState([
        "Search 1",
        "Search 2",
        "Search 3",
        "Search 4",
    ]);
=======
	const [searchQuery, setSearchQuery] = useState("");
	const [isSearchSubmitted, setIsSearchSubmitted] = useState(false);
	const [recentSearches, setRecentSearches] = useState([]);
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
>>>>>>> 6b082f0357b8da5c6e46a73c990ebcf8464c76b5

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSearchInputChange = (event) => {
        setSearchQuery(event.target.value);
    };

<<<<<<< HEAD
    const handleSearch = () => {
        if (searchQuery.trim() !== "") {
            setRecentSearches([...recentSearches, searchQuery]);
            setSearchQuery("");
        }
    };
=======
	const handleSearch = async () => {
		if (searchQuery.trim() !== "") {
			setRecentSearches([...recentSearches, searchQuery]);
			setSearchQuery("");
			const SCHEMA = `CREATE TABLE  public."Country" (    id BIGINT GENERATED ALWAYS AS IDENTITY NOT NULL,    NAME TEXT NULL,    alpha_2 TEXT NULL,    alpha_3 TEXT NULL,    country_code INTEGER NULL,    iso_3166_2 TEXT NULL,    region TEXT NULL,    sub_region TEXT NULL,    intermediate_region TEXT NULL,    region_code INTEGER NULL,    sub_region_code INTEGER NULL,    intermediate_region_code INTEGER NULL,    CONSTRAINT country_pkey PRIMARY KEY (id)  ) TABLESPACE pg_default;CREATE TABLE  public."Industry" (    id BIGINT GENERATED ALWAYS AS IDENTITY NOT NULL,    nama TEXT NOT NULL,    CONSTRAINT industry_pkey PRIMARY KEY (id)  ) TABLESPACE pg_default;CREATE TABLE  public."Job" (    id BIGINT GENERATED ALWAYS AS IDENTITY NOT NULL,    title TEXT NULL,    description TEXT NULL,    salary_min TEXT NULL,    salary_max TEXT NULL,    id_location BIGINT NULL,    ROLE TEXT NULL,    id_roleclass BIGINT NULL,    id_workplacement BIGINT NULL,    id_worktype BIGINT NULL,    date TIMESTAMP WITH TIME ZONE NULL,    id_industry BIGINT NULL,    id_joblevel BIGINT NULL,    link TEXT NULL,    CONSTRAINT job_pkey PRIMARY KEY (id),    CONSTRAINT job_id_joblevel_fkey FOREIGN KEY (id_joblevel) REFERENCES "JobLevel" (id),    CONSTRAINT job_id_roleclass_fkey FOREIGN KEY (id_roleclass) REFERENCES "RoleClass" (id),    CONSTRAINT job_id_industry_fkey FOREIGN KEY (id_industry) REFERENCES "Industry" (id),    CONSTRAINT job_id_worktype_fkey FOREIGN KEY (id_worktype) REFERENCES "WorkType" (id),    CONSTRAINT job_location_fkey FOREIGN KEY (id_location) REFERENCES "Location" (id) ON UPDATE CASCADE,    CONSTRAINT job_id_workplacement_fkey FOREIGN KEY (id_workplacement) REFERENCES "WorkPlacement" (id)  ) TABLESPACE pg_default;CREATE TABLE  public."JobLevel" (    id BIGINT GENERATED ALWAYS AS IDENTITY NOT NULL,    nama TEXT NOT NULL,    CONSTRAINT joblevel_pkey PRIMARY KEY (id)  ) TABLESPACE pg_default;CREATE TABLE  public."Location" (    id BIGINT GENERATED ALWAYS AS IDENTITY NOT NULL,    city TEXT NOT NULL,    id_province BIGINT NULL,    id_country BIGINT NULL,    CONSTRAINT location_pkey PRIMARY KEY (id),    CONSTRAINT location_id_country_fkey FOREIGN KEY (id_country) REFERENCES "Country" (id),    CONSTRAINT location_id_province_fkey FOREIGN KEY (id_province) REFERENCES "Province" (id)  ) TABLESPACE pg_default;CREATE TABLE  public."Province" (    id BIGINT GENERATED ALWAYS AS IDENTITY NOT NULL,    nama TEXT NOT NULL,    CONSTRAINT province_pkey PRIMARY KEY (id)  ) TABLESPACE pg_default; TABLESPACE pg_default;CREATE TABLE  public."WorkPlacement" (    id BIGINT GENERATED ALWAYS AS IDENTITY NOT NULL,    NAME TEXT NOT NULL,    CONSTRAINT workplacement_pkey PRIMARY KEY (id)  )`;
			const RULES = `RULES:
                            1. Output only supabase posgresql query
                            2. minimum limit is 5 if asked. never use limit if not.
                            3. always use LIKE and LOWER operator for string matching.
                            4. Table name and column name write with double quotation mark
                            5. Maximum where operator is 5
                            6. always using SELECT id, title, description, salary_min, salary_max, id_location, id_workplacement, id_worktype, date , id_joblevel, link`;
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

			console.log(dataResult);
		}
	};
>>>>>>> 6b082f0357b8da5c6e46a73c990ebcf8464c76b5

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
                                <div style={styles.filters}>
                                    <button style={styles.filterButton}>By City</button>
                                    <button style={styles.filterButton}>My Jobs</button>
                                </div>
                                <div style={styles.chartPlaceholder}>
                                    Bar Chart of Popular Jobs
                                </div>
                            </div>
                        </section>

                        <section style={styles.trendsSection}>
                            <div style={styles.trendsContainer}>
                                <h2 style={styles.chartTitle}>
                                    AI-Generated Job Trend Detector
                                </h2>
                                <div style={styles.mapContainer}>
                                    <div style={styles.graphPlaceholder}>Line Graph</div>
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

                            <div style={styles.coursesContainer}>
                                <h2 style={styles.articlesCoursesText}>Articles</h2>
                                <button style={{ ...styles.carouselButton, ...styles.leftButton }} onClick={prevCourse}>
                                    {"<"}
                                </button>
                                <div style={styles.courseCard}>
                                    <div style={styles.courseImagePlaceholder}></div>
                                    <h2>{courseCard[currentIndex].title}</h2>
                                    <div style={styles.courseInfo}>
                                        <span>{courseCard[currentIndex].level}</span>
                                        <span>{courseCard[currentIndex].duration}</span>
                                        <span>{courseCard[currentIndex].rating}</span>
                                    </div>
                                    <button style={styles.button}>Go to Website</button>
                                </div>
                                <button style={{ ...styles.carouselButton, ...styles.rightButton }} onClick={nextCourse}>
                                    {">"}
                                </button>
                            </div>
                        </section>
                    </main>

                    <footer style={styles.footer}>
                        <img src={logo} alt="Footer Logo" />
                        <p>Copyright 2024 karirpath</p>
                    </footer>
                </>
            ) : (
                <div style={styles.resultsPage}>
                    <main style={styles.main}>
                        <section style={styles.resultsSection}>
                            <h1>Results for '{searchQuery}'</h1>
                            <div style={styles.searchBar}>
                                <input
                                    type="text"
                                    placeholder="Web Designer"
                                    value={searchQuery}
                                    onChange={handleSearchInputChange}
                                    style={styles.input}
                                />
                                <FaSearch onClick={handleSearch} style={styles.searchIcon} />
                            </div>

                            <section style={styles.jobOutlookSection}>
                                <p>
                                    The web designer job is projected to grow <b>16%</b> from 2022
                                    to 2032, faster than average. Around <b>19,000</b> openings
                                    per year are projected.
                                </p>
                            </section>

                            <section style={styles.jobsSection}>
                                <h2>Search Jobs in Jakarta</h2>
                                <div style={styles.jobItems}>{/* Job items go here */}</div>
                                <div style={styles.viewMoreButtonContainer}>
                                    <button style={styles.viewMoreButton}>View More</button>
                                </div>
                            </section>

                            <section style={styles.coursesSection}>
                                <h2>Courses For You</h2>
                                {/* Courses slider goes here */}
                            </section>
                        </section>
                    </main>

                    <footer style={styles.footer}>
                        <img src={logo} alt="Footer Logo" style={styles.logo} />
                        <p>Copyright &copy; 2024 karirpath</p>
                    </footer>
                </div>
            )}
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
        padding: "15px",
        alignItems: "center",
    },
    main: {
        flex: 1,
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
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
        gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", // Responsive layout
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
        width: "20px",
        height: "20px",
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
        padding: "8px 12px",
        textAlign: "center",
    },
    chartPlaceholder: {
        flex: 1,
        backgroundColor: "#ccc",
        borderRadius: "10px",
    },
    trendsContainer: {
        marginTop: "30px",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "transparent",
        border: "1px solid #fff",
        padding: "20px",
        borderRadius: "10px",
        color: "#fff",
        alignItems: "center",
        flexGrow: "1",
        boxSizing: "border-box",
    },
    articlesCoursesSection: {
        display: "flex",
        justifyContent: "space-between",
        gap: "20px",
        width: "100%",
        flexWrap: "nowrap",
        margin: '0',
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
    coursesContainer: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "0",
        borderRadius: "10px",
        margin: "0 30px 0 0",
        transition: "transform 0.5s ease-in-out",
        border: "1px solid #fff",
        height: "auto",
        overflow: "hidden",
        position: "relative",
        width: "100%",
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
        width: '100%',
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "20px",
    },
    contentSections: {
        display: "flex",
        justifyContent: "space-around",
        alignItems: "flex-start",
        margin: "0",
    },
    articles: {
        backgroundColor: "#01212E",
        border: "2px solid #FFFFFF",
    },
    articlesCoursesText: {
        color: "#fff",
        fontSize: "25px",
        marginBottom: "0",
        marginTop: "0",
    },
    sectionTitle: {
        fontSize: "25px",
        marginBottom: "5px",
        marginTop: "0",
    },
    articleGrid: {
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gap: "20px",
    },
    articleRow: {
        display: "flex",
        alignItems: "center",
    },
    articleCard: {
        display: "flex",
        flexDirection: "column",
        justifyContent: 'space-between',
        width: '320px',
        padding: '10px',
        backgroundColor: '#fff',
        color: '#000',
        margin: '0',
        borderRadius: '10px',
        textAlign: 'left',
        border: '1px solid #000',
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden',
    },
    articleTitle: {
        width: "50%",
        fontSize: "20px",
        fontWeight: "bold",
        textAlign: "left",
        marginRight: "10px",
        marginLeft: "10px",
    },
    imagePlaceholder: {
        width: '50%',
        height: '200px',
        backgroundColor: '#f0f0f0',
        marginBottom: '10px',
        flexShrink: 0,
    },
    courseImagePlaceholder: {
        width: "100%",              
        height: "150px",
        backgroundColor: "#f0f0f0",
        borderRadius: "10px 10px 0 0", 
        margin: 0,          
        padding: 0,                   
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
    courseCard: {
        backgroundColor: "#FFFFFF",
        color: "#000",
        padding: "10px",
        borderRadius: "10px",
        textAlign: "left",
        width: "300px",
        margin: "10px",
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        position: 'relative',
    },
    courseInfo: {
        display: "flex",
        justifyContent: "space-between",
        fontSize: "14px",
        color: "#777",
    },
    button: {
        backgroundColor: "#0C5A5A",
        fontFamily: "'Hammersmith One', sans-serif",
        color: "#FFFFFF",
        border: "none",
        padding: "10px 20px",
        borderRadius: "5px",
        marginTop: "10px",
        cursor: "pointer",
    },
    carouselButton: {
        position: "absolute",
        top: "50%",
        transform: "translateY(-50%)",
        backgroundColor: "#1A7270",
        border: "none",
        borderRadius: "50%",
        width: "40px",
        height: "40px",
        color: "#fff",
        cursor: "pointer",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
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