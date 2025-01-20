import { motion } from "framer-motion";
import { Dialog } from "@headlessui/react";
import { Github, Globe } from "lucide-react";

export default function CardPopup({ project, isOpen, onClose }) {
    if (!project) return null;

    return (
        <Dialog open={isOpen} onClose={onClose} className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose}></div>
            <div className="relative z-50 flex items-center justify-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="relative bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-xl w-full max-w-3xl text-gray-900 dark:text-gray-200 max-h-[90vh] overflow-hidden"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="max-h-[80vh] overflow-y-auto pr-2 scrollbar-hide">
                        <Dialog.Title className="text-2xl font-bold">{project.name}</Dialog.Title>
                        <p className="mt-2 text-gray-700 dark:text-gray-300">{project.description}</p>

                        {project.features?.length > 0 && (
                            <div className="mt-4">
                                <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-400">Key Features</h3>
                                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
                                    {project.features.map((feature, index) => (
                                        <li key={index}>{feature}</li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {project.technologies?.length > 0 && (
                            <div className="mt-4">
                                <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-400">Technologies Used</h3>
                                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
                                    {project.technologies.map((tech, index) => (
                                        <li key={index}>{tech}</li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {(project.github_url || project.url) && (
                            <div className="mt-4 flex items-center gap-6">
                                {project.github_url && (
                                    <a
                                        href={project.github_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 dark:text-blue-400 hover:scale-110 transition-transform"
                                        title="View GitHub Repository"
                                    >
                                        <Github className="w-6 h-6" />
                                    </a>
                                )}
                                {project.url && (
                                    <a
                                        href={project.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 dark:text-blue-400 hover:scale-110 transition-transform"
                                        title="Visit Live Site"
                                    >
                                        <Globe className="w-6 h-6" />
                                    </a>
                                )}
                            </div>
                        )}

                        <div className="mt-6 mb-2 flex justify-end">
                            <button
                                onClick={onClose}
                                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
                                aria-label="Close Popup"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </Dialog>
    );
}
