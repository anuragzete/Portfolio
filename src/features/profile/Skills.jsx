import React, {useEffect, useState} from "react";
import {CircularProgressbar, buildStyles} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import {
    FaReact, FaJs, FaDocker, FaGitAlt, FaPython, FaJava, FaCuttlefish, FaGithub, FaAws, FaServer, FaProjectDiagram, FaCubes, FaSitemap, FaUserShield
} from "react-icons/fa";
import {
    SiTailwindcss, SiJetbrains, SiSpring,  SiTypescript, SiFirebase, SiRedis, SiPostman, SiMysql, SiPostgresql, SiMongodb
} from "react-icons/si";
import {motion} from "framer-motion";

const skillCategories = {
    "Languages": [
        {name: "Java", icon: <FaJava/>, level: 80, color: "#f89820"},
        {name: "JavaScript", icon: <FaJs/>, level: 85, color: "#F7DF1E"},
        {name: "TypeScript", icon: <SiTypescript/>, level: 70, color: "#3178C6"},
        {name: "Python", icon: <FaPython/>, level: 55, color: "#6A98F0"},
        {name: "C", icon: <FaCuttlefish/>, level: 60, color: "#283593"}
    ],

    "Frameworks & Libraries": [
        {name: "React", icon: <FaReact/>, level: 90, color: "#61DAFB"},
        {name: "Spring", icon: <SiSpring/>, level: 70, color: "#6DB33F"},
        {name: "Spring Boot", icon: <SiSpring/>, level: 75, color: "#6DB33F"},
        {name: "Tailwind CSS", icon: <SiTailwindcss/>, level: 85, color: "#38B2AC"}
    ],

    "Databases": [
        {name: "MySQL", icon: <SiMysql/>, level: 75, color: "#00758F"},
        {name: "PostgreSQL", icon: <SiPostgresql/>, level: 75, color: "#336791"},
        {name: "MongoDB", icon: <SiMongodb/>, level: 80, color: "#47A248"},
        {name: "Redis", icon: <SiRedis/>, level: 70, color: "#DC382D"}
    ],

    "DevOps & Cloud": [
        {name: "Docker", icon: <FaDocker/>, level: 65, color: "#2496ED"},
        {name: "AWS", icon: <FaAws/>, level: 70, color: "#FF9900"},
        {name: "Firebase", icon: <SiFirebase/>, level: 75, color: "#FFCA28"}
    ],

    "Tools": [
        {name: "Git", icon: <FaGitAlt/>, level: 90, color: "#F1502F"},
        {name: "GitHub", icon: <FaGithub/>, level: 90, color: "#6e5494"},
        {name: "Postman", icon: <SiPostman/>, level: 80, color: "#FF6C37"},
        {name: "JetBrains IDEs", icon: <SiJetbrains/>, level: 90, color: "#FF0066"}
    ],

    "Backend & Architecture": [
        {name: "REST APIs", icon: <FaServer />, level: 100, color: "#4CAF50"},
        {name: "Microservices", icon: <FaProjectDiagram />, level: 100, color: "#FF9800"},
        {name: "Monolithic Architecture", icon: <FaCubes />, level: 100, color: "#3F51B5"},
        {name: "System Design", icon: <FaSitemap />, level:100, color: "#9C27B0"},
        {name: "Authentication & Authorization", icon: <FaUserShield />, level:100, color: "#E91E63"}
    ]
};

export default function Skills() {
    const [animatedLevels, setAnimatedLevels] = useState({});

    useEffect(() => {
        const timeout = setTimeout(() => {
            const newLevels = {};
            Object.keys(skillCategories).forEach((category) => {
                skillCategories[category].forEach((skill) => {
                    newLevels[skill.name] = skill.level;
                });
            });
            setAnimatedLevels(newLevels);
        }, 500);
        return () => clearTimeout(timeout);
    }, []);

    return (
        <section id="skills" className="py-20 text-gray-800 dark:text-gray-100">
            <div className="max-w-5xl mx-auto px-4">
                <h2 className="text-4xl font-bold text-center mb-12">Skills</h2>
                {Object.entries(skillCategories).map(([category, skills]) => (
                    <div key={category} className="mb-14">
                        <h3 className="text-2xl font-semibold mb-8 text-center">{category}</h3>
                        {category === "CS Fundamentals" ? (
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                                {skills.map((skill, index) => (
                                    <motion.div
                                        key={skill.name}
                                        className="p-4 rounded-xl shadow-md bg-white dark:bg-gray-800 text-gray-800 dark:text-white hover:shadow-lg transition-shadow duration-300"
                                        initial={{ opacity: 0, y: 10 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.05 }}
                                    >
                                        <div className="text-center text-sm sm:text-base font-semibold">
                                            {skill.name}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                                {skills.map((skill, index) => (
                                    <motion.div
                                        key={skill.name}
                                        className="rounded-2xl p-6 shadow-md bg-white dark:bg-gray-800 hover:shadow-lg transition-shadow duration-300 flex flex-col items-center"
                                        initial={{opacity: 0, y: 30}}
                                        whileInView={{opacity: 1, y: 0}}
                                        viewport={{once: true}}
                                        transition={{delay: index * 0.1}}
                                    >
                                        <div className="w-24 h-24 relative mb-4">
                                            <CircularProgressbar
                                                value={animatedLevels[skill.name] || 0}
                                                text={``}
                                                styles={buildStyles({
                                                    pathColor: skill.color,
                                                    trailColor: "#d1d5db",
                                                    strokeLinecap: "round",
                                                })}
                                            />
                                            <div
                                                className="absolute inset-0 flex items-center justify-center text-4xl"
                                                style={{color: skill.color}}
                                            >
                                                {skill.icon}
                                            </div>
                                        </div>
                                        <p className="text-lg font-medium" style={{color: skill.color}}>
                                            {skill.name}
                                        </p>
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
}
