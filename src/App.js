import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./components/page/HomePage";
import SignInPage from "./components/page/SignInPage";
import RegisterPage from "./components/page/RegisterPage";
import JobResultsPage from "./components/page/JobResultsPage";
import JobsPage from "./components/page/JobsPage";
import Header from "./components/ui/Header";
import ProfilePage from "./components/page/ProfilePage";

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
						<Route path="/jobs/:jobTitle" element={<JobResultsPage />} />
						<Route path="/profile" element={<ProfilePage />} />
						<Route path="/my-jobs" element={<JobsPage />} />
					</Routes>
				</div>
			</div>
		</Router>
	);
}

const styles = {
<<<<<<< HEAD
    container: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        maxWidth: 'none',
        padding: 0,
    },
    header: {
        width: '100%',
        backgroundColor: '#01212E', 
        color: '#fff',
        textAlign: 'center',
    },
    mainContent: {
        display: 'flex',
        margin: 0,
        padding: 0,
        width: '100%',
    },
=======
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
>>>>>>> 2963532b5b7bd68c332b3cd2a19dd81482b2485f
};

export default App;
