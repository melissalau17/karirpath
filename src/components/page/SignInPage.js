// src/components/SignInForm.js
import React from "react";
import { useNavigate } from "react-router-dom";
import Image from "../../assets/connect-you.png";

function SignInPage() {
	const navigate = useNavigate();

	const handleSignIn = (event) => {
		event.preventDefault();
		navigate("/signin");
	};

	return (
		<div style={styles.container}>
			<div style={styles.formSection}>
				<h1 style={styles.heading}>Welcome Back.</h1>
				<form onSubmit={handleSignIn} style={styles.form}>
					<input type="email" placeholder="Email" style={styles.input} />
					<input type="password" placeholder="Password" style={styles.input} />
					<a href="#" style={styles.forgotPassword}>
						Forget Password?
					</a>
					<a href="/signup" style={styles.signUpLink}>
						Sign Up
					</a>{" "}
					{/* Added Sign Up link */}
					<button type="submit" style={styles.button}>
						Sign In
					</button>
				</form>
			</div>
			<div style={styles.imageSection}>
				<img src={Image} alt="Connect Image" style={styles.image} />
			</div>
		</div>
	);
}

const styles = {
	container: {
		display: "flex",
		width: "100vw",
		height: "100vh",
		backgroundColor: "#01212E",
		margin: 0,
		padding: 0,
	},
	formSection: {
		flex: 1,
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "flex-start",
		color: "#1A7270",
		padding: "20px",
		fontFamily: "'Hammersmith One', sans-serif",
	},
	heading: {
		color: "#fff", // Ensure heading color contrasts with background
	},
	form: {
		display: "flex",
		flexDirection: "column",
		gap: "10px",
		width: "100%",
	},
	input: {
		marginBottom: "10px",
		padding: "10px",
		borderRadius: "5px",
		border: "1px solid #fff",
		backgroundColor: "transparent",
		color: "#fff",
		width: "100%",
	},
	forgotPassword: {
		color: "#1A7270",
		textDecoration: "none",
		marginBottom: "10px",
		fontFamily: "'Hammersmith One', sans-serif",
	},
	signUpLink: {
		color: "#1A7270",
		textDecoration: "none",
		marginBottom: "10px",
		fontFamily: "'Hammersmith One', sans-serif",
	},
	button: {
		padding: "10px",
		borderRadius: "5px",
		border: "none",
		backgroundColor: "#1A7270",
		color: "#fff",
		cursor: "pointer",
		width: "50%",
		fontFamily: "'Hammersmith One', sans-serif",
	},
	imageSection: {
		flex: 1,
		display: "flex",
		justifyContent: "flex-end",
		alignItems: "center",
		padding: "20px",
	},
	image: {
		maxWidth: "100%",
		height: "auto",
	},
};

export default SignInPage;
