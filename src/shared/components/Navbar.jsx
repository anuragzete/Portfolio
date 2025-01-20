import React, {useState, useEffect, useRef} from 'react';
import {useTheme} from '../../context/ThemeContext.jsx';
import {Sun, Moon, Home, User, Code, Mail, Briefcase, BookOpen, Clock, X, Menu} from 'lucide-react';
import {NavLink} from 'react-router-dom';

const NEON_COLORS = [
    'from-pink-500 to-purple-500',
    'from-blue-500 to-cyan-500',
    'from-green-500 to-emerald-500',
    'from-yellow-500 to-orange-500'
];

export default function Navbar({setActiveSection}) {
    const {theme, toggleTheme} = useTheme();
    const [isHovered, setIsHovered] = useState(false);
    const [neonIndex, setNeonIndex] = useState(0);
    const hoverTimeout = useRef(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [disableHover, setDisableHover] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setDisableHover(window.innerWidth < 768);
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const navItems = [
        {name: 'Home', icon: Home, to: '/'},
        {name: 'Skills', icon: Code, to: '/skills'},
        {name: 'Work', icon: Clock, to: '/work'},
        {name: 'Projects', icon: Briefcase, to: '/projects'},
        {name: 'Contact', icon: Mail, to: '/contact'}
    ];

    const visibleNavItems = navItems.filter(item => ['Home', 'Contact'].includes(item.name));
    const hiddenNavItems = navItems.filter(item => !['Home', 'Contact'].includes(item.name));


    useEffect(() => {
        if (theme === 'dark') {
            const interval = setInterval(() => {
                setNeonIndex((prev) => (prev + 1) % NEON_COLORS.length);
            }, 5000);
            return () => clearInterval(interval);
        }
    }, [theme]);

    const handleMouseEnter = () => {
        clearTimeout(hoverTimeout.current);
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        hoverTimeout.current = setTimeout(() => {
            setIsHovered(false);
        }, 500); 
    };

    const handleClick = (title) => {
        setActiveSection(title);
    }

    return (
        <nav
            className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-4xl 
                ${theme === 'dark'
                ? 'bg-gray-900/80 shadow-[0_0_15px_rgba(255,255,255,0.2)]'
                : 'bg-white/80 shadow-lg'}
                backdrop-blur-md rounded-2xl transition-all duration-300`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div className="px-4 py-3 flex items-center justify-between">
                <NavLink
                    to="/"
                    className={`text-2xl font-bold transition-all duration-300 bg-gradient-to-r ${NEON_COLORS[neonIndex]} bg-clip-text text-transparent`}
                >
                    Portfolio
                </NavLink>

                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="md:hidden text-gray-600 dark:text-white focus:outline-none"
                >
                    {isMenuOpen ? <X size={28}/> : <Menu size={28}/>}
                </button>

                {/* Visible Navigation Items */}
                <div className="hidden md:flex items-center space-x-4">
                    {visibleNavItems.map((item) => (
                            <NavItem key={item.name} to={item.to} label={item.name} Icon={item.icon} theme={theme}
                                     onClick={() => handleClick(item.name)} neonIndex={neonIndex}/>
                        )
                    )}

                    <button
                        onClick={toggleTheme}
                        className={`p-2 rounded-lg transition-all duration-300 ${
                            theme === 'dark'
                                ? `hover:bg-gradient-to-r ${NEON_COLORS[neonIndex]} text-yellow-400`
                                : 'hover:bg-gray-100 text-gray-600'
                        }`}
                    >
                        {theme === 'dark' ? <Sun className="w-5 h-5"/> : <Moon className="w-5 h-5"/>}
                    </button>
                </div>
            </div>

            <div
                className={`absolute left-0 mt-2 w-full rounded-xl p-4 backdrop-blur-md transition-all duration-500
                    ${isHovered && !disableHover ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}
                    ${theme === 'dark'
                    ? 'bg-gray-900/80 shadow-[0_0_15px_rgba(255,255,255,0.2)]'
                    : 'bg-white/80 shadow-lg'}`}
            >
                <div className="grid grid-cols-2 gap-4">
                    <NavItem key={'About'} to={'/about'} label={'About'} Icon={User} theme={theme}
                             onClick={() => handleClick('About')} neonIndex={neonIndex}/>
                    {hiddenNavItems.map((item) => {
                        const commonClasses = `flex items-center space-x-2 p-2 rounded-lg transition-all duration-300 
            ${theme === 'dark' ? `hover:bg-gradient-to-r ${NEON_COLORS[neonIndex]} text-white` : 'hover:bg-gray-100 text-gray-600'}`;

                        return (
                            <NavItem
                                key={item.name}
                                to={item.to}
                                label={item.name}
                                Icon={item.icon}
                                theme={theme}
                                onClick={() => handleClick(item.name)}
                                neonIndex={neonIndex}
                                className={commonClasses} 
                            />
                        );
                    })}
                </div>
            </div>

            {isMenuOpen && (
                <div className="md:hidden px-4 pb-4 flex flex-col space-y-3">
                    {navItems.map((item) => (
                        
                            <NavItem
                                key={item.name}
                                to={item.to}
                                label={item.name}
                                Icon={item.icon}
                                theme={theme}
                                onClick={() => {
                                    handleClick(item.name);
                                    setIsMenuOpen(false);
                                }}
                                className={`flex items-center w-full space-x-3 px-4 py-3 rounded-lg transition-all duration-300
          ${theme === 'dark' ? `hover:bg-gradient-to-r ${NEON_COLORS[neonIndex]} text-white` : 'hover:bg-gray-100 text-gray-600'}`}
                                neonIndex={neonIndex}
                            />
                        )
                    )}

                    <button
                        onClick={() => {
                            toggleTheme();
                            setIsMenuOpen(false);
                        }}
                        className={`flex items-center w-full space-x-3 px-4 py-3 rounded-lg transition-all duration-300
      ${theme === 'dark' ? `hover:bg-gradient-to-r ${NEON_COLORS[neonIndex]} text-yellow-400` : 'hover:bg-gray-100 text-gray-600'}`}
                    >
                        {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                        <span className="flex-1">Toggle Theme</span>
                    </button>
                </div>
            )}

        </nav>
    )
        ;
}

const NavItem = ({ to, label, Icon, theme, onClick, neonIndex }) => (
    <NavLink
        to={to}
        onClick={onClick}
        className={({ isActive }) =>
            `flex items-center w-full space-x-3 px-4 py-3 rounded-lg transition-all duration-300
      ${theme === 'dark'
                ? `hover:bg-gradient-to-r ${NEON_COLORS[neonIndex]} text-white`
                : 'hover:bg-gray-100 text-gray-600'} 
      ${isActive
                ? '!text-indigo-500 font-bold' 
                : ''}`
        }
    >
        <Icon className="w-5 h-5" />
        <span className="flex-1">{label}</span>
    </NavLink>
);

