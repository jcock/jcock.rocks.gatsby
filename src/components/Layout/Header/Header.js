import React from 'react';
import { Link } from 'gatsby';

import Brand from '../../Brand';
import ThemeToggle from '../../ThemeToggle';

import style from './Header.module.css';

class Header extends React.PureComponent {
	render() {
		return (
			<header className={style.header}>
				<Link to="/">
					<Brand />
				</Link>
				<ThemeToggle />
			</header>
		);
	}
}

export default Header;
