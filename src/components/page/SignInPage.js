import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Image from "../../assets/connect-you.png";
import supabase from "../auth/supabaseClient";

function SignInPage() {
	const navigate = useNavigate();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');

	const handleSignIn = async (event) => {
		event.preventDefault();

		try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email: email,
                password: password,
            });

            if (error) {
                setError(error.message);
                console.error('Error during sign-in:', error.message);
            } else {
                console.log('Sign-in successful:', data);
                navigate('../profile');
            }
        } catch (err) {
            console.error('Unexpected error during sign-in:', err);
            setError('An unexpected error occurred. Please try again.');
        }
	};

	return (
		<div style={styles.container}>
			<div style={styles.formSection}>
				<h1 style={styles.heading}>Welcome Back.</h1>
				{error && <p style={styles.error}>{error}</p>}
				<form onSubmit={handleSignIn} style={styles.form}>
					<input type="email" name="email" placeholder="Email" value={email} style={styles.input}  onChange={(e) => setEmail(e.target.value)} />
					<input type="password" name="password" placeholder="Password" value={password} style={styles.input} onChange={(e) => setPassword(e.target.value)} />
					<a href="#" style={styles.forgotPassword}>
						Forget Password?
					</a>
					<a href="/signup" style={styles.signUpLink}>
						Sign Up
					</a>
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
		color: "#fff",
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
