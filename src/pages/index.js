import { useRouter } from 'next/router';
import path from 'path';
import fs from 'fs/promises';

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), 'data', 'movies.json');
  let trendingMovies = [];

  try {
    const jsonData = await fs.readFile(filePath);
    const data = JSON.parse(jsonData);
    trendingMovies = data.movies
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 5);
  } catch (error) {
    console.error('Error reading movies data:', error);
  }

  return {
    props: {
      trendingMovies,
    },
    revalidate: 10,
  };
}

export default function Home({ trendingMovies }) {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">🔥 Trending Movies</h1>

        {trendingMovies.length === 0 ? (
          <p className="text-gray-400">No trending movies available at the moment.</p>
        ) : (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {trendingMovies.map((movie) => (
              <div
                key={movie.id}
                className="bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl p-5 cursor-pointer transition-all"
                onClick={() => router.push(`/movies/${movie.id}`)}
              >
                <h2 className="text-2xl font-semibold mb-2">{movie.title}</h2>
                <p className="text-gray-400 text-sm mb-1">Release Year: {movie.releaseYear}</p>
                <p className="text-sm text-blue-400 font-medium">⭐ Rating: {movie.rating}</p>
              </div>
            ))}
          </div>
        )}

        <div className="mt-12">
          <h2 className="text-3xl font-semibold mb-6">🎬 Quick Navigation</h2>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => router.push('/genres')}
              className="px-6 py-3 bg-blue-600 text-white rounded-2xl hover:bg-blue-700 transition shadow-md"
            >
              Browse Genres
            </button>

            <button
              onClick={() => router.push("/directors")}
              className="px-6 py-3 bg-blue-600 text-white rounded-2xl hover:bg-blue-700 transition shadow-md"
            >
              Directors
            </button>

            <button
              onClick={() => router.push("/help")}
              className="px-6 py-3 bg-blue-600 text-white rounded-2xl hover:bg-blue-700 transition shadow-md"
            >
              Help Center
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
