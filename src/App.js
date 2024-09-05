import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./components/page/HomePage";
import SignInPage from "./components/page/SignInPage";
import RegisterPage from "./components/page/RegisterPage";
import ResultsPage from "./components/page/ResultsPage";
import JobsPage from "./components/page/JobsPage";
import Header from "./components/ui/Header";
import Footer from "./components/ui/Footer";
import ProfilePage from "./components/page/ProfilePage";
import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
	"https://xuufthgrikirrjowtzzy.supabase.co/",
	process.env.REACT_APP_SUPABASE_KEY
);
function App() {
    return (
        <Router>
            <div style={styles.container}>
                <Header />
                <div style={styles.mainContent}>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/signin" element={<SignInPage />} />
                        <Route path="/signup" element={<RegisterPage />} />
                        <Route path="/jobs/:jobTitle" element={<ResultsPage />} />
                        <Route path="/profile" element={<ProfilePage />} />
                        <Route path="/my-jobs" element={<JobsPage />} />
                    </Routes>
                </div>
                <Footer />
            </div>
        </Router>
    )
}

const styles = {
	container: {
		display: "flex",
		flexDirection: "column",
		width: "100%",
		maxWidth: "none",
		padding: 0,
	},
	header: {
		width: "100%",
		backgroundColor: "#01212E",
		color: "#fff",
		textAlign: "center",
	},
	mainContent: {
		display: "flex",
		margin: 0,
		padding: 0,
		width: "100%",
	},

	container: {
		display: "flex",
		flexDirection: "column",
	},
	header: {
		width: "100%",
		backgroundColor: "#01212E",
		color: "#fff",
		textAlign: "center",
	},
	mainContent: {
		display: "flex",
	},
};

export default App;
