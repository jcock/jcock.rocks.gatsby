import React from 'react';
import { Link } from 'gatsby';

import ThemeToggle from '../../ThemeToggle';

import style from './Header.module.css';

class Header extends React.PureComponent {
	render() {
		return (
			<header className={style.header}>
				<h1 className={style.title}>
					<Link to="/">
						jcock.rocks
						<span role="img" aria-label="Rock on!">
							🤘
						</span>
					</Link>
				</h1>
				<ThemeToggle />
			</header>
		);
	}
}

export default Header;
