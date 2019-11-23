import React from 'react';
import { useThemeValue } from '../context/themeContext';

export const withTheme = (WrappedComponent) => {
    return (props) => {
        const theme = useThemeValue();
        return (
            <WrappedComponent {...props} theme={theme} />
        )
    }
}