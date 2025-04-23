import { useRouter } from 'next/router';

export default function Help() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center px-4">
      <div className="w-full max-w-xl text-center">
        <h1 className="text-4xl font-bold mb-6">Help Center</h1>
        <p className="text-gray-300 mb-8 text-lg">
          Choose a topic below to get the assistance you need.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <button
            onClick={() => router.push("/help/faq")}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-2xl text-white text-lg font-medium shadow-md transition duration-300"
          >
            Help FAQ
          </button>

          <button
            onClick={() => router.push("/help/privacy")}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-2xl text-white text-lg font-medium shadow-md transition duration-300"
          >
            Help Privacy
          </button>

          <button
            onClick={() => router.push("/help/contact")}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-2xl text-white text-lg font-medium shadow-md transition duration-300"
          >
            Help Contact
          </button>
        </div>
      </div>
    </div>
  );
}
