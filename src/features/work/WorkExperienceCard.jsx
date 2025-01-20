import React from "react";
import { Calendar, MapPin, ExternalLink, Github } from "lucide-react";
import { useTheme } from "../../context/ThemeContext.jsx";

export default function WorkExperienceCard({ experience, index, visible }) {
    const { theme } = useTheme();

    return (
        <div
            id={`experience-${index}`}
            className={`relative flex items-start transition-opacity duration-700 ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            } ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
        >
            {/* Timeline Indicator */}
            <div className="absolute left-0 md:left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-blue-500 dark:bg-blue-400 z-10">
                <div className="absolute w-8 h-8 rounded-full border-2 border-blue-500 dark:border-blue-400 -left-2 -top-2 animate-ping opacity-20" />
            </div>

            {/* Card Content */}
            <div className={`ml-8 md:ml-0 md:w-1/2 ${index % 2 === 0 ? "md:pr-12" : "md:pl-12"}`}>
                <div
                    className={`p-6 rounded-xl transition-all duration-300 ${
                        theme === "dark"
                            ? "bg-gray-800 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)]"
                            : "bg-white hover:shadow-xl"
                    }`}
                >
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                        {experience.job_title && <h3 className="text-xl font-semibold">{experience.job_title}</h3>}
                        <div className="flex items-center space-x-3">
                            {experience.company_name && experience.company_url && (
                                <a
                                    href={experience.company_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`flex items-center space-x-1 text-sm ${
                                        theme === "dark" ? "text-blue-400 hover:text-blue-300" : "text-blue-600 hover:text-blue-700"
                                    }`}
                                >
                                    <span>{experience.company_name}</span>
                                    <ExternalLink className="w-4 h-4" />
                                </a>
                            )}
                        </div>
                    </div>

                    {(experience.duration.start || experience.duration.end || experience.location) && (
                        <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
                            <div className="flex items-center">
                                <Calendar className="w-4 h-4 mr-1" />
                                {experience.duration.start} - {experience.duration.end && experience.duration.end !== "Invalid date" ? experience.duration.end : "Present"}
                            </div>
                            {experience.location && (
                                <div className="flex items-center">
                                    <MapPin className="w-4 h-4 mr-1" />
                                    {experience.location}
                                </div>
                            )}
                        </div>
                    )}

                    {Array.isArray(experience.description) && experience.description.length > 0 ? (
                        <ul className="list-disc list-outside pl-5 space-y-2 mb-4 text-gray-600 dark:text-gray-300">
                            {experience.description.map((item, i) => (
                                <li key={i}>{typeof item === "string" ? item : JSON.stringify(item)}</li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-500 dark:text-gray-400 mb-4">No description available.</p>
                    )}

                    <div className="flex items-center justify-between mt-4">
                        {/* Technologies */}
                        {experience.technologies?.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                                {experience.technologies.map((tech, i) => (
                                    <span
                                        key={i}
                                        className={`px-3 py-1 text-sm rounded-full ${
                                            theme === "dark" ? "bg-blue-900/50 text-blue-400" : "bg-blue-100 text-blue-600"
                                        }`}
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        )}

                        {experience.github_url && (
                            <a
                                href={experience.github_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
                                title="View GitHub Repository"
                            >
                                <Github className="w-6 h-6" />
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

