import React, { useState, useEffect } from 'react';
import { useTheme } from './context/ThemeContext.jsx';
import { Routes, Route } from 'react-router-dom';
import Navbar from './shared/components/Navbar.jsx';
import About from './features/profile/About.jsx';
import Footer from './shared/components/Footer.jsx';
import Contact from './features/contact/Contact.jsx';
import Projects from './features/project/Projects.jsx';
import Skills from './features/profile/Skills.jsx';
import Work from './features/work/Work.jsx';
import Home from './features/home/Home.jsx';
import BackgroundColors from "./shared/components/BackgroundColors.jsx";

export default function App() {
    const { theme } = useTheme();
    const [activeSection, setActiveSection] = useState('home');

    useEffect(() => {
        document.title = activeSection === "home"
            ? "Anurag Zete | Home"
            : `Anurag Zete | ${activeSection.charAt(0).toUpperCase() + activeSection.slice(1)}`;
    }, [activeSection]);

    return (
        <div
            className={`relative overflow-hidden ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}
        >
            <BackgroundColors />
            <div className="relative min-h-screen flex flex-col transition-all duration-700">
                <Navbar setActiveSection={setActiveSection} />
                <main className="container flex-grow mx-auto px-4 pt-20">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/work" element={<Work />} />
                        <Route path="/projects" element={<Projects />} />
                        <Route path="/skills" element={<Skills />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/about" element={<About />} />
                    </Routes>
                </main>
                <Footer />
            </div>
        </div>
    );
}