import React from 'react';
import { Laptop } from 'lucide-react';

export default function Unavailable() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-zinc-900 text-gray-800 dark:text-zinc-200 px-4 text-center">
            <div className="max-w-md w-full p-6 bg-white dark:bg-zinc-800 shadow-2xl rounded-2xl border border-gray-200 dark:border-zinc-700">
                
                <div className="flex justify-center mb-4 text-blue-500 dark:text-blue-400">
                    <Laptop className="w-12 h-12" />
                </div>

                <h1 className="text-3xl font-bold mb-2">
                    Portfolio Under Update
                </h1>

                <p className="text-gray-600 dark:text-zinc-300 mb-4">
                    I'm currently refreshing my portfolio to showcase my latest
                    projects, skills, and experience.
                </p>

                <p className="text-gray-600 dark:text-zinc-300 mb-4">
                    Feel free to check back soon — exciting updates are on the way!
                </p>

                <p className="text-sm text-gray-500 dark:text-zinc-400">
                    In the meantime, you can reach me via email or LinkedIn.
                </p>
            </div>
        </div>
    );
}