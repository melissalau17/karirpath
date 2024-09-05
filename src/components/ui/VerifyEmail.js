import React from 'react';
import Image from './open-mail.png';

function VerifyEmail() {
  return (
    <div style={styles.container}>
       <div style={styles.imageSection}>
        <img src={Image} alt="Verification" style={styles.image} />
      </div>
      <div style={styles.textSection}>
        <h1 style={styles.heading}>Verify Your Email</h1>
        <p style={styles.text}>
          An email has been sent to your email address. Please check your inbox and click on the verification link to complete your registration.
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100vw',
    height: '100vh',
    padding: '50px',
    backgroundColor: '#01212E',
  },
  imageSection: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: '20px', 
  },
  textSection: {
    flex: 1,
    color: '#ffffff',
    textAlign: 'left',
    paddingLeft: '20px', 
  },
  image: {
    maxWidth: '100%',
    height: 'auto',
    borderRadius: '8px',
  },
  heading: {
    fontSize: '2.5rem',
    marginBottom: '20px',
    fontFamily: "'Hammersmith One', sans-serif",
  },
  text: {
    fontSize: '1.2rem',
    lineHeight: '1.5',
    fontFamily: "'Hammersmith One', sans-serif",
  },
};

export default VerifyEmail;