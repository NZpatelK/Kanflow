'use client';

import React from 'react';

const LoadingCard: React.FC = () => {
    return (
        <div className="w-full max-w-xs h-24rounded border rounded border-neutral-700 bg-neutral-800 p-3 shadow-md flex flex-col justify-center">
            {/* Short description placeholder */}
            <div className="h-4 bg-gray-600 rounded w-3/4 mb-2 animate-pulse" />
            <div className="h-4 bg-gray-600 rounded w-1/2 animate-pulse" />
        </div>
    )
};

export default LoadingCard;