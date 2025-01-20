
import React from "react";
import { useNavigate } from "react-router-dom";

export default function HomeAbout() {
    const navigate = useNavigate();

    return (
        <section id="homeAbout" className="py-16 scroll-mt-20 md:scroll-mt-24">
            <div className="max-w-4xl mx-auto text-center px-4 space-y-6">
                <h2 className="text-3xl md:text-4xl font-bold">About Me</h2>
                <p className="text-gray-600 dark:text-gray-300 text-lg md:text-xl">
                    I’m a passionate software developer who enjoys building scalable apps, exploring system design,
                    and working with modern technologies. I'm also enthusiastic about open-source contribution and
                    continuous learning.
                </p>
                <button
                    onClick={() => navigate("/about")}
                    className="mt-4 px-6 py-3 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-colors"
                >
                    Know More
                </button>
            </div>
        </section>
    );
}

