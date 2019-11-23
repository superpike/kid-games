import React, { createContext, useState, useContext } from 'react';

const ThemeContext = createContext();
const ChangeThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [theme, settheme] = useState('dark');
    const changeTheme = (currTheme) => {
        if (currTheme === 'dark') {
            settheme('light');
        } else {
            settheme('dark');
        }
    };
    return (
        <ThemeContext.Provider value={theme}>
            <ChangeThemeContext.Provider value={changeTheme}>
                {children}
            </ChangeThemeContext.Provider >
        </ThemeContext.Provider >
    )
}

export const useThemeValue = () => useContext(ThemeContext);

export const useChangeTheme = () => useContext(ChangeThemeContext);

export const useTheme = () => {
    return {
        theme: useContext(ThemeContext),
        changeTheme: useContext(ChangeThemeContext)
    }
};

// export const ThemeProvider = ({ theme, changeTheme, children }) => {
//     return (
//         <ThemeContext.Provider value={
//             {
//                 currentTheme: theme,
//                 changeTheme
//             }
//         }
//         >
//             {children}
//         </ThemeContext.Provider >
//     )
// }

export default ThemeContext;