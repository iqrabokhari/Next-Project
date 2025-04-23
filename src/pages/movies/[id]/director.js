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
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const { id } = context.params;

  const filePath = path.join(process.cwd(), 'data', 'movies.json');
  const jsonData = await fs.readFile(filePath, 'utf-8');
  const data = JSON.parse(jsonData);

  const movie = data.movies.find((m) => m.id === id);
  if (!movie) {
    return { notFound: true };
  }

  const director = data.directors.find((d) => d.id === movie.directorId);
  if (!director) {
    return { notFound: true };
  }

  return {
    props: {
      movieId: movie.id,
      movieTitle: movie.title,
      director,
    },
  };
}

export default function DirectorPage({ movieId, movieTitle, director }) {
  return (
    <div className="min-h-screen bg-gray-900 text-white py-10 px-6 flex justify-center">
      <div className="max-w-2xl w-full bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-[repeating-linear-gradient(45deg,#61dafb, #61dafb_10px,#333_10px,#333_20px)] py-4 px-6 text-center text-2xl font-bold">
          🎬 Director Info
        </div>

        {/* Content */}
        <div className="p-6">
          <h1 className="text-3xl font-bold text-blue-400 mb-2">Director of {movieTitle}</h1>
          <h2 className="text-xl font-semibold text-white">{director.name}</h2>
          <p className="mt-4 text-gray-300 whitespace-pre-line">{director.biography}</p>

          <div className="mt-6">
            <Link
              href={`/movies/${movieId}`}
              className="text-blue-400 hover:underline"
            >
              ← Back to Movie
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
