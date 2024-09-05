import { useNavigate } from 'react-router-dom';
import Image from './close-mail.png';

function EmailVerified() {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Successfully Verified!</h1>
      <img src={Image} alt="Verified Icon" style={styles.image} />
      <button onClick={() => navigate('/')} style={styles.button}>
        Go to Homepage
      </button>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100vw',
    height: '100vh',
    backgroundColor: '#01212E',
    color: '#fff',
    textAlign: 'center',
    padding: '20px',
  },
  heading: {
    fontSize: '2.5rem',
    marginBottom: '20px',
    fontFamily: "'Hammersmith One', sans-serif",
  },
  image: {
    maxWidth: '100%',
    height: 'auto',
    marginBottom: '20px',
    maxHeight: '250px', 
  },
  button: {
    padding: '10px 20px',
    fontSize: '1rem',
    backgroundColor: '#1A7270',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontFamily: "'Hammersmith One', sans-serif",
  },
};

export default EmailVerified;