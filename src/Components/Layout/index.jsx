import { useState } from 'react';

const Layout = ({children}) => {
    const [darkMode, setDarkMode] = useState(false);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    return (
        <div className="flex flex-col mt-20 items-center">
            {children}
        </div>
    )

}   

export default Layout;
