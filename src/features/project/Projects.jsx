import React, { useEffect, useState, useContext } from "react";
import ProjectCard from "./ProjectCard.jsx";
import LoadingSpinner from "../../shared/components/LoadingSpinner.jsx";
import {DataContext} from "../../context/DataProvider.jsx";

export default function Projects() {
    const [currentPage, setCurrentPage] = useState(1);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const { projects, loading, error } = useContext(DataContext);
    const projectsPerPage = 3;

    useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    }, [currentPage]);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const totalPages = Math.ceil(projects.length / projectsPerPage);
    const indexOfLastProject = currentPage * projectsPerPage;
    const indexOfFirstProject = indexOfLastProject - projectsPerPage;
    const currentProjects = isMobile ? projects.slice(indexOfFirstProject, indexOfLastProject) : projects;

    if (loading) return <LoadingSpinner label="Fetching Projects..." />;

    if (error)
        return (
            <p className="text-center text-2xl font-semibold text-red-500 absolute inset-0 flex items-center justify-center">
                Error: {error}
            </p>
        );

    if (projects.length === 0)
        return (
            <p className="text-center text-2xl font-semibold text-gray-500 absolute inset-0 flex items-center justify-center">
                Sorry, No projects available.
            </p>
        );

    return (
        <section id="projects" className="py-20">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Projects</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {currentProjects.map((project) => (
                        <ProjectCard key={project.id} project={project} />
                    ))}
                </div>

                {isMobile && totalPages > 1 && (
                    <div className="flex justify-center mt-6 space-x-4">
                        {currentPage > 1 && (
                            <button
                                onClick={() => setCurrentPage(currentPage - 1)}
                                className="px-4 py-2 bg-blue-500 rounded-lg hover:bg-gray-300"
                            >
                                Previous
                            </button>
                        )}
                        {currentPage < totalPages && (
                            <button
                                onClick={() => setCurrentPage(currentPage + 1)}
                                className="px-4 py-2 bg-blue-500 rounded-lg hover:bg-gray-300"
                            >
                                Next
                            </button>
                        )}
                    </div>
                )}
            </div>
        </section>
    );
}
