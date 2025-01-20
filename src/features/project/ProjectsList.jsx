import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { DataContext } from '../../context/DataProvider.jsx';
import { useTheme } from '../../context/ThemeContext.jsx';
import ProjectCard from './ProjectCard.jsx';
import LoadingSpinner from '../../shared/components/LoadingSpinner.jsx';

export default function ProjectsList() {
    const { theme } = useTheme(); 
    const { projects, loading, error } = useContext(DataContext);

    const displayedProjects = projects.slice(0, 3);

    if (loading) return <LoadingSpinner />;
    if (error) return <p className="text-center text-red-500">Error: {error}</p>;
    if (projects.length === 0) return null;

    return (
        <section id="projectsList" className="py-20">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
                    Featured Projects
                </h2>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {displayedProjects.map((project) => (
                        <ProjectCard key={project.id} project={project} />
                    ))}
                </div>

                <div className="flex justify-center mt-8">
                    <Link
                        to="/projects"
                        className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg shadow-md hover:bg-blue-700 transition"
                    >
                        View All Projects
                    </Link>
                </div>
            </div>
        </section>
    );
}