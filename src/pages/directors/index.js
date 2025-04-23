import Link from 'next/link';
import path from 'path';
import fs from 'fs/promises';


export async function getStaticProps() {
  try {
    const filePath = path.join(process.cwd(), 'data', 'movies.json');
    const jsonData = await fs.readFile(filePath, 'utf-8');
    const data = JSON.parse(jsonData);

    return {
      props: {
        data,
      },
    };
  } catch (error) {
    console.error('Error reading movies data:', error);
    return {
      notFound: true,
    };
  }
}


export default function DirectorsPage({ data }) {
  const directors = data.directors;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">🎬 Directors</h1>

        <div className="space-y-6">
          {directors.map((director) => {
            const moviesDirected = data.movies.filter(
              (movie) => movie.directorId === director.id
            );

            return (
              <div
                key={director.id}
                className="bg-gray-800 rounded-2xl p-6 shadow hover:shadow-lg transition"
              >
                <h2 className="text-2xl font-semibold">{director.name}</h2>
                <p className="mt-2 text-gray-300">{director.biography}</p>

                <h3 className="mt-4 text-xl font-medium text-gray-200">
                  Movies Directed:
                </h3>
                <ul className="list-disc pl-6 mt-2 space-y-1 text-blue-400">
                  {moviesDirected.map((movie) => (
                    <li key={movie.id}>
                      <Link
                        href={`/movies/${movie.id}`}
                        className="hover:underline"
                      >
                        {movie.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
