import fs from 'fs/promises';
import path from 'path';
import Link from 'next/link';

export async function getServerSideProps() {
  const filePath = path.join(process.cwd(), 'data', 'movies.json');
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);

  const genres = data.genres || [];

  return {
    props: {
      genres,
    },
  };
}

export default function GenresPage({ genres }) {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">🎭 Browse by Genre</h1>
        {genres.length === 0 ? (
          <p className="text-gray-400">No genres found.</p>
        ) : (
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {genres.map((genre) => (
              <li key={genre.id}>
                <Link
                  href={`/genres/${genre.id}`}
                  className="block bg-gray-800 rounded-xl p-4 text-lg text-white hover:bg-gray-700 transition shadow hover:shadow-lg"
                >
                  {genre.name}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
