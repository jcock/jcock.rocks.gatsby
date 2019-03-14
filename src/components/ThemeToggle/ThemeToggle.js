/* eslint-disable jsx-a11y/label-has-for */
import React from 'react';
import Helmet from 'react-helmet';
import { withTheme } from '../../context/Theme/withTheme';

import style from './ThemeToggle.module.css';

const ThemeToggle = theme => (
	<>
		<Helmet>
			<body className={theme.dark ? 'themeDark' : 'themeLight'} />
		</Helmet>
		<button type="button" className={theme.dark ? style.toggleModeDark : style.toggle} onClick={theme.toggleTheme}>
			{theme.dark ? <span>Dark</span> : <span>Light</span>}
		</button>
	</>
);

export default withTheme(ThemeToggle);
