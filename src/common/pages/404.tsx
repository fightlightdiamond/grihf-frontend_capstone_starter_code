import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center">
      <h1 className="text-4xl font-bold text-red-500 mb-4">404</h1>
      <p className="text-lg text-gray-700 mb-4">
        Oops! The page you are looking for does not exist.
      </p>
      <Link
        to="/"
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
      >
        Go to Homepage
      </Link>
    </div>
  );
};

export default NotFound;
