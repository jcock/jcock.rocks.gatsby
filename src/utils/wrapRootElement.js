import React from 'react';
import ThemeProvider from '../context/Theme/ThemeProvider';

const wrapRootElement = ({ element, props }) => {
	return <ThemeProvider {...props}>{element}</ThemeProvider>;
};

export default wrapRootElement;
