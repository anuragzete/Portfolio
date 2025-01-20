import React, {useState, useEffect} from "react";
import {ArrowDown, Code, Github, Linkedin} from "lucide-react";
import {useTheme} from "../../context/ThemeContext.jsx";

export default function Hero() {
    const {theme} = useTheme();
    const fullText = "Anurag Zete";
    const [text, setText] = useState("");
    const [index, setIndex] = useState(0);
    const [showCursor, setShowCursor] = useState(true);
    const [showEmoji, setShowEmoji] = useState(false);

    useEffect(() => {
        if (index < fullText.length) {
            const typingInterval = setTimeout(() => {
                setText((prev) => prev + fullText[index]);
                setIndex(index + 1);
            }, 250);

            return () => clearTimeout(typingInterval);
        } else {
            setTimeout(() => setShowCursor(false), 500);
            setTimeout(() => setShowEmoji(true), 700);
            setTimeout(() => {
                setText("");
                setIndex(0);
                setShowCursor(true);
                setShowEmoji(false);
            }, 10000);
        }
    }, [index]);

    return (
        <section id="home" className="min-h-screen flex items-center justify-center pt-14">
            <div className="text-center space-y-8">
                <div className="space-y-4">
                    <h1 className="text-5xl md:text-7xl font-bold">
                        Hi, I'm{" "}
                        <span className="text-blue-600 dark:text-blue-400">
                            {text}
                            {showCursor && <span className="animate-blink">|</span>}
                        </span>{" "}
                        {showEmoji && <span className="inline-block animate-waving-hand">👋</span>}
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300">
                        Software Developer & CS Enthusiast
                    </p>
                </div>

                <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-300">
                    I specialize in building reliable, scalable, and secure systems — from backend services and
                    databases to modern web applications.
                </p>

                <div className="flex justify-center space-x-4 sm:flex md:flex">
                    <a
                        href="https://github.com/anuragzete/"
                        rel="noopener noreferrer"
                        className={`p-2 rounded-full ${
                            theme === 'dark' ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'
                        } transition-colors`}
                        title="GitHub"
                    >
                        <Github className="w-6 h-6"/>
                    </a>
                    <a
                        href="https://linkedin.com/in/anuragzete"
                        rel="noopener noreferrer"
                        className={`p-2 rounded-full ${
                            theme === 'dark' ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'
                        } transition-colors`}
                        title="LinkedIn"
                    >
                        <Linkedin className="w-6 h-6"/>
                    </a>
                    <a
                        href="https://leetcode.com/u/anuragzete/"
                        rel="noopener noreferrer"
                        className={`p-2 rounded-full ${
                            theme === 'dark' ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'
                        } transition-colors`}
                        title="LeetCode"
                    >
                        <Code className="w-6 h-6"/>
                    </a>
                </div>

                <a href="#homeAbout" className="inline-block animate-bounce">
                    <ArrowDown className="w-6 h-6"/>
                </a>
            </div>
        </section>
    );
}
