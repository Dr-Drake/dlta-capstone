import React from 'react';
import { useRouter } from 'next/router';


const NotFound = () => {
  const router = useRouter();

  return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-6xl font-bold mb-4">404 - Page Not Found</h1>
            <p className="text-xl mb-8">Sorry, the page you are looking for does not exist.</p>
            <button
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={() => router.back()}
            >
                Go Back
            </button>
        </div>
  );
};

export default NotFound;