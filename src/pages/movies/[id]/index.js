import fs from 'fs/promises';
import path from 'path';
import Link from 'next/link';

export async function getStaticPaths() {
  const filePath = path.join(process.cwd(), 'data', 'movies.json');
  const jsonData = await fs.readFile(filePath, 'utf-8');
  const data = JSON.parse(jsonData);

  const paths = data.movies.map((movie) => ({
    params: { id: movie.id },
  }));

  return {
    paths,
    fallback: 'blocking',
  };
}

export async function getStaticProps(context) {
  const { id } = context.params;

  const filePath = path.join(process.cwd(), 'data', 'movies.json');
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);

  const movie = data.movies.find((m) => m.id === id);
  const genre = data.genres.find((g) => g.id === movie?.genreId);
  const director = data.directors.find((d) => d.id === movie?.directorId);

  if (!movie) {
    return { notFound: true };
  }

  return {
    props: {
      movie,
      genre: genre?.name || 'Unknown',
      directorName: director?.name || 'Unknown',
    },
    revalidate: 10,
  };
}

export default function MovieDetails({ movie, genre, directorName }) {
  return (
    <div className="min-h-screen bg-gray-900 text-white py-10 px-6 flex justify-center">
      <div className="max-w-3xl w-full bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        {/* Clapperboard Header */}
        <div className="bg-[repeating-linear-gradient(45deg,#61dafb, #61dafb_10px,#333_10px,#333_20px)] py-4 px-6 text-center text-2xl font-bold">
          🎬 Movie Details
        </div>

      
        <div className="p-6">
          <h1 className="text-4xl font-extrabold mb-2 text-blue-400">{movie.title}</h1>
          <p className="text-gray-400 text-lg mb-4">
            {movie.releaseYear} • Genre: <span className="text-white">{genre}</span>
          </p>

          <p className="mb-4 text-gray-200">{movie.description}</p>

          <p className="mb-2">
            <span className="font-semibold text-gray-300">Rating:</span> {movie.rating}
          </p>
          <p className="mb-6">
            <span className="font-semibold text-gray-300">Directed by:</span>{' '}
            <span className="text-blue-400">{directorName}</span>
          </p>

          <Link
            href={`/movies/${movie.id}/director`}
            className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            View Director Info
          </Link>

          <div className="mt-6">
            <Link href="/movies" className="text-gray-400 hover:underline">
              ← Back to All Movies
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
