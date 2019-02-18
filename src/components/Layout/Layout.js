import React from 'react';
import { Link } from 'gatsby';

import SkipLink from '../Navigation/SkipLink';

import '../../assets/css/app.css';
import style from './Layout.module.css';

class Layout extends React.Component {
	render() {
		const { title, children } = this.props;

		return (
			<>
				<SkipLink href="#start-of-content">Skip to content</SkipLink>
				<header>
					<h1 className={style.title}>
						<Link to="/">{title}</Link>
					</h1>
				</header>
				<main id="start-of-content">{children}</main>
				<footer>
					<p>
						&copy; {new Date().getFullYear()}.Built with
						{` `}
						<a href="https://www.gatsbyjs.org">Gatsby</a>
					</p>
				</footer>
			</>
		);
	}
}

export default Layout;
