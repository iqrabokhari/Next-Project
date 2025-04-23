import fs from 'fs/promises';
import path from 'path';
import Link from 'next/link';

export async function getServerSideProps(context) {
  const { id } = context.params;

  const filePath = path.join(process.cwd(), 'data', 'movies.json');
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);

  const genre = data.genres.find((g) => g.id === id);
  const filteredMovies = data.movies.filter((movie) => movie.genreId === id);

  if (!genre) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      genreName: genre.name,
      movies: filteredMovies,
    },
  };
}

export default function GenreMoviesPage({ genreName, movies }) {
  return (
    <div className="min-h-screen bg-gray-900 text-white py-10 px-6 flex justify-center">
      <div className="max-w-5xl w-full bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-[repeating-linear-gradient(45deg,#61dafb, #61dafb_10px,#333_10px,#333_20px)] py-4 px-6 text-center text-2xl font-bold text-white">
          🎬 {genreName} Movies
        </div>

        <div className="p-6">
          <h1 className="text-3xl font-bold text-blue-400 mb-4">Movies in: {genreName}</h1>
          {movies.length === 0 ? (
            <p className="text-gray-400">No movies found for this genre.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {movies.map((movie) => (
                <div key={movie.id} className="bg-gray-700 border border-gray-600 p-4 rounded-lg shadow-md transition-transform transform hover:scale-105">
                  <h2 className="text-xl font-semibold text-white">{movie.title}</h2>
                  <p className="text-sm text-gray-300">{movie.releaseYear}</p>
                  <p className="text-sm text-gray-300">Rating: {movie.rating}</p>
                  <p className="text-sm mt-2 text-gray-200">{movie.description}</p>
                </div>
              ))}
            </div>
          )}
          <div className="mt-6 text-center">
            <Link
              href="/genres"
              className="inline-block mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              ← Back to Genres
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
