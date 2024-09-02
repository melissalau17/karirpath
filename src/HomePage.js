import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import logo from './karirpath.png';
import bookmarkIcon from './bookmark-icon.png';
import { useNavigate } from 'react-router-dom';

// Correct HomePage component
function HomePage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [isSearchSubmitted, setIsSearchSubmitted] = useState(false);
    const [recentSearches, setRecentSearches] = useState(['Search 1', 'Search 2', 'Search 3', 'Search 4']);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
      };

      
    const handleSearchInputChange = (event) => {
        setSearchQuery(event.target.value);
    };
    
    const handleSearch = () => {
        if (searchQuery.trim() !== '') {
            setRecentSearches([...recentSearches, searchQuery]);
            setSearchQuery('');
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };

    const handleDeleteSearch = (index) => {
        const updatedSearches = recentSearches.filter((_, i) => i !== index);
        setRecentSearches(updatedSearches);
    };

    const courseCard = [
        { title: 'Course 1', description: 'Introduction to Web Development' },
        { title: 'Course 2', description: 'Advanced JavaScript Techniques' },
        { title: 'Course 3', description: 'AI and Machine Learning Basics' },
        { title: 'Course 4', description: 'Mastering React' }
    ];

    const articles = [
        { title: 'Jobs Predicted to Rise in 2024, According To Experts', link: '#', id: 1 },
        { title: 'AI is Revolutionizing Job Markets: Here\'s What You Need to Know', link: '#', id: 2 },
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
                                            <p style={styles.companyName}><strong>Company</strong></p>
                                            <p style={styles.jobDescription}>Job Description</p>
                                        </div>
                                        <div style={styles.jobFooter}>
                                            <button style={styles.applyButton}>Apply Now</button>
                                            <button style={styles.learnMoreButton}>Learn More</button>
                                            <img src={bookmarkIcon} alt="Bookmark" style={styles.bookmarkIcon} />
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
                                <div style={styles.chartPlaceholder}>Bar Chart of Popular Jobs</div>
                            </div>
                        </section>

                        <section style={styles.trendsSection}>
                            <div style={styles.trendsContainer}>
                                <h2 style={styles.chartTitle}>AI-Generated Job Trend Detector</h2>
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
                                <button style={styles.viewMoreButton}>View More</button>
                            </div>

                            <div style={styles.articlesContainer}>
                                <h2 style={styles.articlesCoursesText}>Courses</h2>
                                <CourseCarousel courseCard={courseCard} />
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
                                <FaSearch onClick={handleSearch} style={styles.searchIcon}/>
                            </div>

                            <section style={styles.jobOutlookSection}>
                                <p>
                                    The web designer job is projected to grow <b>16%</b> from 2022 to
                                    2032, faster than average. Around <b>19,000</b> openings per year
                                    are projected.
                                </p>
                            </section>

                            <section style={styles.jobsSection}>
                                <h2>Search Jobs in Jakarta</h2>
                                <div style={styles.jobItems}>
                                    {/* Job items go here */}
                                </div>
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

const CourseCarousel = ({ courseCard }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const prevSlide = () => {
        setCurrentIndex(currentIndex === 0 ? courseCard.length - 1 : currentIndex - 1);
    };

    const nextSlide = () => {
        setCurrentIndex(currentIndex === courseCard.length - 1 ? 0 : currentIndex + 1);
    };

    return (
        <div style={styles.carouselContainer}>
            <button style={{ ...styles.carouselButton, ...styles.leftButton }} onClick={prevSlide}>
                &lt;
            </button>
            <div style={{ ...styles.coursesContainer, transform: `translateX(-${currentIndex * 300}px)` }}>
                {courseCard.map((course, index) => (
                    <div key={index} style={styles.courseItem}>
                        <h3>{course.title}</h3>
                        <p>{course.description}</p>
                    </div>
                ))}
            </div>
            <button style={{ ...styles.carouselButton, ...styles.rightButton }} onClick={nextSlide}>
                &gt;
            </button>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        width: '100vw',
        minHeight: '100vh',
        flexDirection: 'column',
        boxSizing: 'border-box',
        fontFamily: "'Hammersmith One', sans-serif",
        backgroundColor: '#01212E',
        color: '#fff',
        padding: '15px'
    },
    main: {
        flex: 1,
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    heroSection: {
        fontSize: '30px',
        textAlign: 'center',
        marginBottom: '20px',
    },
    searchBar: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        width: '100%',
        margin: '10px auto',
        border: 'none',
        borderRadius: '15px',
    },
    searchInputWrapper: {
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
    },
    input: {
        padding: '10px 40px 10px 20px',
        fontSize: '16px',
        borderRadius: '25px', 
        border: '1px solid #004A5E',
        outline: 'none',
        width: '100%',
        color: '#333',
        backgroundColor: '#fff',
    },
    searchIcon: {
        position: 'absolute',
        right: '10px',
        color: '#004A5E',
        cursor: 'pointer',
    },
    searchButton: {
        padding: '10px 20px',
        fontSize: '16px',
        backgroundColor: '#1A7270',
        border: 'none',
        cursor: 'pointer',
        marginLeft: '10px',
        color: '#fff',
        borderRadius: '15px',
        fontFamily: "'Hammersmith One', sans-serif",
    },
    recentSearchesSection: {
        textAlign: 'left',
        marginTop: '5px',
        marginBottom: '10px',
    },
    recentSearchesRow: {
        display: 'flex',
        alignItems: 'center',
    },
    recentSearchesTitle: {
        color: '#fff',
        fontSize: '18px',
        marginRight: '10px',
    },
    recentSearchesContainer: {
        display: 'flex',
        gap: '10px',
    },
    recentSearchItem: {
        display: 'flex',
        alignItems: 'center',
        backgroundColor: 'transparent',
        borderRadius: '5px',
    },
    recentSearchButton: {
        display: 'flex',
        alignItems: 'center',
        padding: '10px',
        backgroundColor: '#1A7270',
        color: '#fff',
        border: 'none',
        borderRadius: '10px',
        cursor: 'pointer',
        fontFamily: "'Hammersmith One', sans-serif",
        fontSize: '16px'
    },
    deleteButton: {
        backgroundColor: 'transparent',
        color: '#fff',
        border: 'none',
        borderRadius: '50%',
        width: '30px',
        height: '30px',
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
    },
    jobsSection: {
        display: 'flex',
        flexWrap: 'wrap', 
        width: '100%',
        padding: '20px',
        gap: '20px',  
        boxSizing: 'border-box',
        backgroundColor: '#01212E',
    },
    jobsContainer: {
        flex: 1,  
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'transparent',
        border: '1px solid #fff',
        padding: '20px',
        borderRadius: '10px',
        color: '#000',
        height: '100%',
        overflow: 'auto', 
    },
    jobHeaderText: {
        fontSize: '25px',
        marginBottom: '5px', 
        color: '#fff',
        marginTop: '0',
    },
    jobItems: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', // Responsive layout
        gap: '20px',
        padding: '20px',
    },
    jobCard: {
        background: 'linear-gradient(180deg, #1A7270, #31D8D4)',
        borderRadius: '10px',
        padding: '20px',
        color: '#FFFFFF',
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative',
        overflow: 'hidden',
    },
    jobHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '10px',
    },
    jobTitle: {
        fontSize: '18px',
        fontWeight: 'bold',
        margin: 0,
    },
    jobLevel: {
        fontSize: '12px',
        margin: '0',
    },
    divider: {
        height: '1px',
        backgroundColor: '#FFFFFF',
        opacity: 0.4,
        margin: '0',
    },
    companyDetails: {
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    companyName: {
        fontSize: '14px',
        marginBottom: '0',
    },
    jobDescription: {
        fontSize: '14px',
    },
    jobFooter: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    applyButton: {
        padding: '8px 15px',
        backgroundColor: '#C5EBEB',
        color: '#000',
        borderRadius: '5px',
        border: 'none',
        cursor: 'pointer',
        fontFamily: "'Hammersmith One', sans-serif",
    },
    learnMoreButton: {
        padding: '8px 15px',
        backgroundColor: '#1A7270',
        color: '#000',
        borderRadius: '5px',
        border: 'none',
        cursor: 'pointer',
        fontFamily: "'Hammersmith One', sans-serif",
    },
    bookmarkIcon: {
        width: '20px',
        height: '20px',
        cursor: 'pointer',
    },
    filters: {
        display: 'flex',
        justifyContent: 'flex-end',
        gap: '10px',
        marginBottom: '10px',
    },
    filterButton: {
        backgroundColor: '#004A5E',
        color: '#fff',
        padding: '10px 20px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontFamily: "'Hammersmith One', sans-serif",
    },
    mapContainer: {
        flex: 1,  
        backgroundColor: '#ccc',  
        borderRadius: '10px',
        marginBottom: '20px',
    },
    jobItems: {
        flex: 1,
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '10px',
        marginBottom: '20px',
    },
    viewMoreButtonContainer: {
        display: 'flex',
        justifyContent: 'center',
        width: '100%', 
    },
    viewMoreButton: {
        backgroundColor: '#1A7270',
        borderRadius: '5px',
        cursor: 'pointer',
        color: '#fff',
        fontFamily: "'Hammersmith One', sans-serif",
        width: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: 'none',
        padding: '10px 20px',
        textAlign: 'center',
        marginTop: '20px',
    },
    chartPlaceholder: {
        flex: 1,  
        backgroundColor: '#ccc', 
        borderRadius: '10px',
    },    
    trendsContainer: {
        marginTop: '30px',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'transparent',
        border: '1px solid #fff',
        padding: '20px',
        borderRadius: '10px',
        color: '#000',
        alignItems: 'center',
        width: '100%',
        boxSizing: 'border-box',
    },
    articlesCoursesSection: {
        display: 'flex',
        justifyContent: 'space-between', 
        gap: '20px', 
        width: '100%', 
        flexWrap: 'nowrap', 
        padding: '10px',  
        textAlign: 'center',
    },
    articlesContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: '20px',
        backgroundColor: 'transparent',
        border: '1px solid #fff',
        padding: '20px',
        borderRadius: '10px',
        width: '100%',
        marginBottom: '20px',
    },
    carouselContainer: {
        position: 'relative',
        width: '100%',
        overflow: 'hidden',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    coursesContainer: {
        flex: 1, 
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'transparent',
        border: '1px solid #fff',
        padding: '20px',
        borderRadius: '10px',
        minHeight: '300px',
        transition: 'transform 0.5s ease-in-out',
    },
    aiJobTrend: {
        backgroundColor: '#01212E',
        padding: '20px',
        border: '1px solid #FFFFFF',
        marginBottom: '40px',
    },
    trendGraph: {
        backgroundColor: '#FFFFFF',
        color: '#000',
        height: '300px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '20px',
    },
    contentSections: {
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'flex-start',
        margin: '40px 0',
    },
    articles: {
        backgroundColor: '#01212E',
        padding: '20px',
        border: '2px solid #FFFFFF',
    },
    articlesCoursesText: {
        color: '#fff',
        fontSize: '25px',
        marginBottom: '5px', 
        marginTop: '0',
    },
    sectionTitle: {
        fontSize: '24px',
        marginBottom: '20px',
    },
    articleGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '20px',
        marginBottom: '10px',
    },
    articleRow: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '15px',
    },
    articleCard: {
        display: 'flex',
        alignItems: 'flex-start',
        flexDirection: 'column',
        width: '350px',
        padding: '10px',
        backgroundColor: '#fff',
        color: '#000',
        margin: '10px 0',
        borderRadius: '10px',
        textAlign: 'left',
        border: '1px solid #000',
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
    },
    articleTitle: {
        width: '50%',
        fontSize: '20px',
        fontWeight: 'bold',
        textAlign: 'left',
        marginRight: '10px',
    },
    imagePlaceholder: {
        width: '50%',
        height: '100%',
        backgroundColor: '#f0f0f0',
        marginRight: '10px',
        flexShrink: 1,
    },
    readMoreButton: {
        display: 'inline-block',
        marginTop: '10px',
        backgroundColor: '#000',
        fontSize: '14px',
        color: '#fff',
        border: 'none',
        padding: '8px 12px',
        borderRadius: '5px',
        cursor: 'pointer',
        width: '100%',
        fontFamily: "'Hammersmith One', sans-serif",
    },
    jobCard: {
        background: 'linear-gradient(180deg, #1A7270, #31D8D4)',
        borderRadius: '10px',
        padding: '20px',
        color: '#FFFFFF',
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative',
        overflow: 'hidden',
    },
    courseCard: {
        backgroundColor: '#FFFFFF',
        color: '#000',
        padding: '20px',
        borderRadius: '10px',
        textAlign: 'left',
        display: 'inline-block',
        width: '80%',
        minWidth: '300px',
        margin: '0 20px', 
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
    },
    button: {
        backgroundColor: '#0C5A5A',
        color: '#FFFFFF',
        border: 'none',
        padding: '10px 20px',
        borderRadius: '5px',
        marginTop: '10px',
        cursor: 'pointer',
    },
    carouselButton: {
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        backgroundColor: '#1A7270',
        border: 'none',
        borderRadius: '50%', 
        width: '40px',
        height: '40px',
        color: '#fff',
        cursor: 'pointer',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    leftButton: {
        left: '10px',  // Position to the left
    },
    rightButton: {
        right: '10px',  // Position to the right
    },
    footer: {
        textAlign: 'center',
        backgroundColor: '#02353C',
        padding: '10px 0',
    },
    logo: {
        width: '50px',
        margin: 0,
        padding: 0,
    },
};

export default HomePage;
