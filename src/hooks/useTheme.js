import { useState, useEffect } from 'react';

/**
 * Custom hook for theme management (light/dark mode)
 */
export const useTheme = () => {
  const [theme, setTheme] = useState(() => {
    // Check localStorage for saved theme preference
    const savedTheme = localStorage.getItem('calculator-theme');
    return savedTheme || 'dark';
  });

  useEffect(() => {
    // Save theme preference to localStorage
    localStorage.setItem('calculator-theme', theme);
    
    // Update document root class for theme styling
    if (theme === 'light') {
      document.documentElement.classList.add('light-theme');
    } else {
      document.documentElement.classList.remove('light-theme');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'dark' ? 'light' : 'dark');
  };

  return {
    theme,
    toggleTheme,
    isDark: theme === 'dark',
    isLight: theme === 'light'
  };
};
