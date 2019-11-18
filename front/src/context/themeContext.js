import React, { createContext, useReducer, useContext } from 'react';

const ThemeContext = createContext({
    currentTheme: 'dark',
    changeTheme: () => { }
});

const initialState = {
    currentTheme: 'dark'
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'changeTheme':
            return {
                ...state,
                currentTheme: state.currentTheme === 'dark' ? 'light' : 'dark'
            };

        default:
            return state;
    }
};

export const ThemeProvider = ({ children }) => {
    return (
        <ThemeContext.Provider value={useReducer(reducer, initialState)}>
            {children}
        </ThemeContext.Provider >
    )
}

export const useThemeValue = () => useContext(ThemeContext);

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