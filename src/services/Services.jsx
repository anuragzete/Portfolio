import React, { useEffect, useState } from "react";
import { FaLaptopCode, FaServer, FaCodeBranch, FaDatabase, FaCogs, FaSitemap } from "react-icons/fa";

const services = [
    {
        title: "Full Stack Development",
        icon: <FaLaptopCode className="w-10 h-10 text-blue-600" />,
        description: "Building end-to-end web applications using Spring Boot and React with clean architecture, scalability, and maintainable code."
    },
    {
        title: "Frontend Development",
        icon: <FaCodeBranch className="w-10 h-10 text-indigo-600" />,
        description: "Creating responsive, high-performance user interfaces using React, Tailwind CSS, and modern JavaScript practices."
    },
    {
        title: "Backend Development",
        icon: <FaServer className="w-10 h-10 text-green-600" />,
        description: "Developing robust backend systems with Spring Boot, including REST APIs, authentication, and business logic."
    },
    {
        title: "API Development & Integration",
        icon: <FaCogs className="w-10 h-10 text-purple-600" />,
        description: "Designing secure RESTful APIs and integrating third-party services for seamless system communication."
    },
    {
        title: "System Architecture",
        icon: <FaSitemap className="w-10 h-10 text-pink-600" />,
        description: "Designing and implementing both monolithic and microservices architectures with focus on scalability, performance, and maintainability."
    },
    {
        title: "Database & System Design",
        icon: <FaDatabase className="w-10 h-10 text-yellow-600" />,
        description: "Designing efficient database schemas using SQL & MongoDB with optimized queries and scalable data handling."
    }
];

export default function Services() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 200) setIsVisible(true);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className="mt-32">
            <h3 className="text-3xl font-bold text-center mb-12">What I Offer</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {services.map((service, index) => (
                    <div
                        key={service.title}
                        className={`relative p-6 rounded-2xl bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm shadow-md hover:scale-[1.03] transition-all duration-500 ${
                            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                        }`}
                        style={{ transitionDelay: `${index * 100}ms` }}
                    >
                        <div className="relative z-10 flex items-center gap-4 mb-4">
                            {service.icon}
                            <h4 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                                {service.title}
                            </h4>
                        </div>
                        <p className="relative z-10 text-gray-700 dark:text-gray-300">{service.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
