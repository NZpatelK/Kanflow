import React from 'react';

const LoadingSpinner = () => {
    return (
        <div className="flex">
            <div className="relative w-16 h-16">
                <div className="absolute inset-0 border-4 border-t-4 border-t-blue-500 border-gray-300 rounded-full animate-spin"></div>
                <div className="absolute inset-2 border-4 border-t-4 border-t-blue-300 border-gray-700 rounded-full animate-spin animation-delay-200"></div>
            </div>
        </div>
    );
};

export default LoadingSpinner;