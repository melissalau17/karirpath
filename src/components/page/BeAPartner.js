import React from 'react';

function BeAPartner() {
    return (
        <div style={styles.container}>
            <div style={styles.formContainer}>
                <h2 style={styles.title}>Become a Partner</h2>
                <form style={styles.form}>
                    <div style={styles.formGroup}>
                        <label htmlFor="name" style={styles.label}>Company Name:</label>
                        <input type="text" id="name" name="name" style={styles.input} />
                    </div>
                    <div style={styles.formGroup}>
                        <label htmlFor="email" style={styles.label}>Company Email:</label>
                        <input type="email" id="email" name="email" style={styles.input} />
                    </div>
                    <div style={styles.formGroup}>
                        <label htmlFor="message" style={styles.label}>Message:</label>
                        <textarea id="message" name="message" style={styles.textarea}></textarea>
                    </div>
                    <button type="submit" style={styles.submitButton}>Submit</button>
                </form>
            </div>
        </div>
    );
}

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        height: '100vh',
        width: '100vw',
        backgroundColor: '#01212E',
        margin:0,
        padding: 0,
        fontFamily: "'Hammersmith One', sans-serif",
        color: '#fff',
        paddingTop: '50px',
    },
    formContainer: {
        backgroundColor: 'transparent',
        borderRadius: '8px',
        padding: '20px',
        boxShadow: '0 0 10px rgba(0,0,0,0.1)',
        width: '100%',
        maxWidth: '600px',
        border: '1px solid #fff',
    },
    title: {
        fontSize: '30px',
        textAlign: 'center',
        marginBottom: '20px',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
    },
    formGroup: {
        marginBottom: '15px',
    },
    label: {
        marginBottom: '5px',
        display: 'block',
    },
    input: {
        width: '100%',
        padding: '10px',
        borderRadius: '4px',
        border: '1px solid #ddd',
    },
    textarea: {
        width: '100%',
        padding: '10px',
        borderRadius: '4px',
        border: '1px solid #ddd',
        resize: 'vertical',
        minHeight: '100px',
    },
    submitButton: {
        padding: '10px',
        backgroundColor: '#1A7270',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '16px',
    },
};

export default BeAPartner;
