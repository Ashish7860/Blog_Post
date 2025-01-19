import React from 'react';
import { useUserName } from '../Context/UserContext';

const About = () => {
  const userName = useUserName();

  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '80vh',
      padding: '20px',
      background: 'linear-gradient(to bottom, #f7f7f7, #e1e1e1)',
    },
    heading: {
      fontSize: '2rem',
      marginBottom: '20px',
      textAlign: 'center',
      color: '#333',
    },
    authorName: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      color: '#007BFF',
    },
    description: {
      fontSize: '1rem',
      marginTop: '20px',
      textAlign: 'center',
      color: '#666',
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Welcome to our Blog Post Website</h2>
      <p style={styles.authorName}>Developed by {userName}</p>
      <p style={styles.description}>
        Explore our collection of insightful blog posts on various topics.
      </p>
    </div>
  );
};

export default About;
