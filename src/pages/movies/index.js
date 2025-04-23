import { useState } from 'react';
import { useRouter } from 'next/router';
import path from 'path';
import fs from 'fs/promises';

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), 'data', 'movies.json');
  let allMovies = [];

  try {
    const jsonData = await fs.readFile(filePath);
    allMovies = JSON.parse(jsonData).movies || [];
  } catch (error) {
    console.error('Error loading movie data:', error);
  }

  return {
    props: {
      allMovies,
    },
    revalidate: 10,
  };
}

export default function MoviesPage({ allMovies }) {
  const router = useRouter();
  const [selectedGenre, setSelectedGenre] = useState("All");

  const genres = Array.from(new Set(allMovies.map((movie) => movie.genreId)));

  const genreNames = {
    g1: "Science Fiction",
    g3: "Adventure",
    g4: "Drama",
    g5: "Thriller",
  };

  const genreOptions = ["All", ...genres.map((genreId) => genreNames[genreId] || genreId)];

  const filteredMovies =
    selectedGenre === "All"
      ? allMovies
      : allMovies.filter((movie) => genreNames[movie.genreId] === selectedGenre);

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h1 style={styles.heading}>🎬 All Movies</h1>

       
        <div style={styles.filterContainer}>
          <label htmlFor="genre" style={styles.label}>Filter by Genre:</label>
          <select
            id="genre"
            style={styles.select}
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value)}
          >
            {genreOptions.map((genre) => (
              <option key={genre}>{genre}</option>
            ))}
          </select>
        </div>

       
        {filteredMovies.length === 0 ? (
          <p style={styles.noMoviesText}>No movies found for this genre.</p>
        ) : (
          <div style={styles.grid}>
            {filteredMovies.map((movie) => (
              <div
                key={movie.id}
                style={styles.card}
                onClick={() => router.push(`/movies/${movie.id}`)}
              >
                <div style={styles.clapperTop}>🎬</div>
                <div style={styles.clapperBottom}>
                  <h2 style={styles.cardTitle}>{movie.title}</h2>
                  <p style={styles.cardText}>{movie.releaseYear}</p>
                  <p style={styles.cardText}>Rating: {movie.rating}</p>
                  <p style={styles.cardGenre}>Genre: {genreNames[movie.genreId]}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: '#20232a',
    color: '#61dafb',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    minHeight: '100vh',
    paddingTop: '50px',
  },
  content: {
    backgroundColor: '#282c34',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    maxWidth: '1200px',
    width: '100%',
  },
  heading: {
    fontSize: '2.5rem',
    color: '#61dafb',
    textAlign: 'center',
    marginBottom: '20px',
  },
  filterContainer: {
    marginBottom: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: '1rem',
    marginRight: '10px',
    fontWeight: 'bold',
    color: '#61dafb',
  },
  select: {
    padding: '10px',
    borderRadius: '8px',
    border: '1px solid #61dafb',
    backgroundColor: '#20232a',
    color: '#61dafb',
    fontSize: '1rem',
    outline: 'none',
  },
  noMoviesText: {
    color: '#a0a0a0',
    textAlign: 'center',
    fontSize: '1.2rem',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '20px',
    marginTop: '20px',
  },
  card: {
    backgroundColor: '#333',
    borderRadius: '12px',
    cursor: 'pointer',
    overflow: 'hidden',
    transition: 'transform 0.3s, box-shadow 0.3s',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)',
  },
  clapperTop: {
    background: 'repeating-linear-gradient(45deg, #61dafb, #61dafb 10px, #333 10px, #333 20px)',
    padding: '10px',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: '1.5rem',
  },
  clapperBottom: {
    padding: '20px',
  },
  cardTitle: {
    fontSize: '1.5rem',
    color: '#61dafb',
    fontWeight: 'bold',
  },
  cardText: {
    color: '#a0a0a0',
    fontSize: '1rem',
  },
  cardGenre: {
    color: '#61dafb',
    fontSize: '1rem',
    fontWeight: 'bold',
  },
};
