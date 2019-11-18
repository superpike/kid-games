import { useContext } from 'react';
import ThemeContext from '../context/themeContext';

const useTheme = () => {
    const themeContext = useContext(ThemeContext);
    return {
        currentTheme: themeContext.currentTheme,
        changeTheme: themeContext.changeTheme
    }
}

export default useTheme;