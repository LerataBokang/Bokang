import React from 'react';

const Home = () => {
    return (
        <div style={styles.container}>
            <h1 style={styles.heading}>WINGS inventory</h1>

            

            <h1 style={styles.subtitle}>Please come</h1>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        padding: '40px',
        backgroundColor: '#f4f4f4',
        height: '100vh',  // Ensure the content covers full viewport height
        fontFamily: '"Roboto", sans-serif',  // Clean and modern font
    },
    heading: {
        fontSize: '3rem', 
        color: '#2c3e50',
        fontWeight: 'bold',
        marginBottom: '20px',
    },
    image: {
        width: '80%',  // Make the image responsive
        maxWidth: '600px',  // Limit max width for larger screens
        height: 'auto',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',  // Subtle shadow effect
        marginBottom: '30px',  // Add space between image and text
    },
    subtitle: {
        fontSize: '2rem',
        color: '#e74c3c',  // A vibrant red to draw attention
        fontWeight: '500',
        marginTop: '20px',
    },
};

export default Home;
