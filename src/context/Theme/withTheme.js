import React from 'react';
import { ThemeContext } from './theme-context';

// eslint-disable-next-line import/prefer-default-export
export const withTheme = Component => props => (
	<ThemeContext.Consumer>{contexts => <Component {...contexts} {...props} />}</ThemeContext.Consumer>
);
