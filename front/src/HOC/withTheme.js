import React, { useReducer, useEffect } from 'react';
import { useThemeValue } from '../context/themeContext';

export const withTheme = (WrappedComponent) => {
    return (props) => {
        const [{ currentTheme }] = useThemeValue();
        return (
            <WrappedComponent {...props} theme={currentTheme} />
        )
    }
}