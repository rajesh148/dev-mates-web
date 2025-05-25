import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-64px-64px)] bg-base-900 px-4 overflow-hidden">
      <div className="text-center">
        <h1 className="text-7xl font-bold text-blue-600 mb-4">404</h1>
        <h2 className="text-2xl md:text-3xl font-semibold mb-2 text-gray-200">
          Page Not Found
        </h2>
        <p className="text-2xl text-gray-200 mb-6">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-xl text-lg font-medium hover:bg-blue-700 transition duration-300"
        >
          Go to Home
        </Link>
      </div>
    </div>
  );
};

export default PageNotFound;
