export default function Home() {
  return (
    <div className="flex h-screen items-center justify-center bg-gray-900 text-white">
      <div className="text-center">
        <h2 className="text-4xl font-bold mb-8">Welcome to Finalis </h2>
        <h1 className="text-4xl font-bold mb-8">Onboarding Platform</h1>
        <div className="flex gap-6">
          <a
            href="/prospect/apply"
            className="px-6 py-3 text-xl font-semibold bg-blue-500 rounded-lg shadow-lg hover:bg-blue-600 transition"
          >
            Prospect Application
          </a>
          <a
            href="/prospect/list"
            className="px-6 py-3 text-xl font-semibold bg-green-500 rounded-lg shadow-lg hover:bg-green-600 transition"
          >
            Qualifying Prospects
          </a>
        </div>
        <h4 className="font-bold mt-8">Developed by Ricardo Olivari </h4>
      </div>
    </div>
  );
}
