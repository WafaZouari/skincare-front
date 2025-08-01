export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-white px-6 text-center">
            <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-4">404 - Page Not Found</h1>
                <p className="text-gray-600 mb-6">
                    Oops! The page you're looking for doesn't exist.
                </p>
                <a
                    href="/"
                    className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition"
                >
                    Go back home
                </a>
            </div>
        </div>
    );
}
