import React, { useState } from 'react';
import {
    Github,
    ExternalLink,
    CheckCircle,
    Calendar,
    RefreshCcw,
    Info
} from 'lucide-react';
import CardPopup from "./CardPopup.jsx";

const isValidUrl = (url) => {
    try {
        new URL(url);
        return true;
    } catch (e) {
        return false;
    }
};

export default function ProjectCard({ project }) {
    const [isPopupOpen, setPopupOpen] = useState(false);

    return (
        <>
            <article
                onClick={() => setPopupOpen(true)}
                className={`group rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-2 
                bg-white dark:bg-gray-800 hover:shadow-xl`}
            >
                {project.image_url && (
                    <div className="aspect-video overflow-hidden">
                        <img
                            src={project.image_url}
                            alt={project.name || 'Project Image'}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                    </div>
                )}

                <div className="p-6 space-y-4">
                    {(project.status || project.durationText) && (
                        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                            {project.status && (
                                <span className="flex items-center gap-1">
                                    {project.status.toLowerCase() === 'completed' ? (
                                        <CheckCircle className="w-4 h-4 text-green-500" />
                                    ) : project.status.toLowerCase() === 'in_progress' ? (
                                        <RefreshCcw className="w-4 h-4 text-yellow-500 animate-spin" />
                                    ) : (
                                        <Info className="w-4 h-4 text-gray-500" />
                                    )}
                                    {project.status}
                                </span>
                            )}
                            {project.durationText && (
                                <span className="flex items-center gap-1">
                                    <Calendar className="w-4 h-4 text-blue-500" />
                                    {project.durationText}
                                </span>
                            )}
                        </div>
                    )}

                    {project.name && (
                        <h3 className="text-xl font-semibold group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors">
                            {project.name}
                        </h3>
                    )}

                    {project.description && (
                        <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3">
                            {project.description}
                        </p>
                    )}

                    {project.technologies?.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                            {project.technologies.map((tech, index) => (
                                <span key={index} className="px-3 py-1 text-xs font-medium rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300">
                                    {tech}
                                </span>
                            ))}
                        </div>
                    )}

                    <div className="flex gap-4 pt-2">
                        {isValidUrl(project.githubLink) && (
                            <a
                                href={project.githubLink}
                                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition"
                                target="_blank" rel="noopener noreferrer"
                            >
                                <Github className="w-5 h-5" />
                                Code
                            </a>
                        )}
                        {isValidUrl(project.link) && (
                            <a
                                href={project.link}
                                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition"
                                target="_blank" rel="noopener noreferrer"
                            >
                                <ExternalLink className="w-5 h-5" />
                                Live Demo
                            </a>
                        )}
                    </div>
                </div>
            </article>

            {isPopupOpen && <CardPopup project={project} isOpen={isPopupOpen} onClose={() => setPopupOpen(false)} />}
        </>
    );
};
