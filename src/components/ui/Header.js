import React from "react";
import { useNavigate, Link } from "react-router-dom";
import logo from "../../assets/karirpath.png";

export const Header = ({ isLoggedIn }) => {
	const navigate = useNavigate();

	const handleSignInClick = () => {
		navigate("/signin");
	};

	return (
		<header style={styles.header}>
			<div style={styles.logoNavContainer}>
				<img src={logo} alt="karirpath-logo" style={styles.logo} />
				<nav style={styles.nav}>
					<Link to="/" style={styles.navLink}>
						Find Jobs
					</Link>
					<Link to="/my-jobs" style={styles.navLink}>
						Your Jobs
					</Link>
				</nav>
			</div>
			<div style={styles.authButtons}>
				{isLoggedIn ? (
					<Link to="/profile" style={styles.navLink}>
						My Profile
					</Link>
				) : (
					<button onClick={handleSignInClick} style={styles.signInButton}>
						Sign In
					</button>
				)}
				<button style={styles.partnerButton}>Be a Partner</button>
			</div>
		</header>
	);
};

const styles = {
	header: {
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center",
		margin: 0,
		backgroundColor: "#02353C",
		fontFamily: "'Hammersmith One', sans-serif",
	},
	logoNavContainer: {
		display: "flex",
		alignItems: "center",
		margin: 0,
		padding: 0,
	},
	logo: {
		width: "80px",
		margin: 0,
		padding: 0,
	},
	nav: {
		display: "flex",
		gap: "20px",
		marginLeft: "20px",
	},
	navLink: {
		textDecoration: "none",
		color: "#fff",
		fontSize: "18px",
		lineHeight: "1",
		margin: 0,
		padding: 0,
		fontFamily: "'Hammersmith One', sans-serif",
	},
	authButtons: {
		display: "flex",
		gap: "10px",
	},
	signInButton: {
		backgroundColor: "#006a6b",
		color: "#fff",
		border: "none",
		padding: "10px 20px",
		cursor: "pointer",
		fontFamily: "'Hammersmith One', sans-serif",
		borderRadius: "15px",
	},
	partnerButton: {
		backgroundColor: "#fff",
		color: "#000",
		border: "2px solid #000",
		padding: "10px 20px",
		cursor: "pointer",
		fontFamily: "'Hammersmith One', sans-serif",
		borderRadius: "15px",
	},
};

export default Header;
