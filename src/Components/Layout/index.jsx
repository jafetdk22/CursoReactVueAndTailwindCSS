import { useState } from 'react';
import NavBar from '../NavBar';

const Layout = ({children}) => {
    const [darkMode, setDarkMode] = useState(false);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    return (
        <div className={`flex flex-col items-center mt-20 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'} shadow-lg rounded-lg p-6`}>
            <NavBar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
            {children}
        </div>
    )
}   

export default Layout;
