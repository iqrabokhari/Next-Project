import Link from 'next/link';

export default function Custom404() {
  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h1 style={styles.heading}>404</h1>
        <h2 style={styles.subheading}>Page Not Found</h2>
        <p style={styles.text}>
          UH OH! The page you're looking for might have been moved or doesn't exist at this address.
        </p>
        <Link href="/">
          <button style={styles.button}>Back to Home</button>
        </Link>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#20232a',
    color: '#61dafb',
    fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
  },
  content: {
    textAlign: 'center',
    padding: '20px',
    backgroundColor: '#282c34',
    borderRadius: '10px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  heading: {
    fontSize: '5rem',
    margin: 0,
    fontWeight: 'bold',
  },
  subheading: {
    fontSize: '1.5rem',
    margin: '10px 0',
    fontWeight: '300',
  },
  text: {
    color: '#a0a0a0',
    margin: '20px 0',
    fontSize: '1.1rem',
  },
  button: {
    fontSize: '1.2rem',
    padding: '10px 25px',
    backgroundColor: '#61dafb',
    color: '#20232a',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
};
