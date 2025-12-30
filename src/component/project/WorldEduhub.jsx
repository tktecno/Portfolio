import { Link } from "react-router-dom";

export default function EduhubPreview() {
  return (
    <div className="min-h-screen px-6 py-16 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold mb-4">World Eduhub — Preview</h2>

      <p className="text-gray-500 mb-6">
        Designed with HTML • CSS • JavaScript
      </p>

      <div className="w-full h-[500px] border rounded-2xl overflow-hidden bg-white dark:bg-gray-900">
        <iframe
          src="/world_eduhub/index.html"
          title="World Eduhub"
          className="w-full h-full border-0"
        />
      </div>

      <Link
        to="/"
        className="inline-block mt-6 px-6 py-3 rounded-2xl bg-blue-600 text-white hover:bg-blue-700"
      >
        ← Back to Portfolio
      </Link>
    </div>
  );
}
