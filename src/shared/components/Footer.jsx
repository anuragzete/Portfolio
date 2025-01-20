import React from 'react';
import { useTheme } from '../../context/ThemeContext.jsx';

export default function Footer() {
    const { theme } = useTheme();

    return (
        <footer className={`w-full py-4 text-center mt-auto text-sm transition-all duration-300 
      ${theme === 'dark' ? 'bg-gray-900 text-white shadow-[0_-4px_15px_rgba(255,255,255,0.2)]' : 'bg-gray-100 text-gray-600 shadow-[0_-4px_10px_rgba(0,0,0,0.1)]'}`}>
            <p>&copy; {new Date().getFullYear()} Anurag Zete. All rights reserved.</p>
        </footer>
    );
}
