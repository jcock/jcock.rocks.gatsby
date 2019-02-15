import React from 'react';
import { Link } from 'gatsby';

import '../../assets/css/app.css';
import style from './Layout.module.css';

class Layout extends React.Component {
	render() {
		const { location, title, children } = this.props;
		const rootPath = `${__PATH_PREFIX__}/`; // eslint-disable-line no-undef
		let header;

		if (location.pathname === rootPath) {
			header = (
				<h1 className={style.title}>
					<Link to="/">{title}</Link>
				</h1>
			);
		} else {
			header = (
				<h3 className={style.title}>
					<Link to="/">{title}</Link>
				</h3>
			);
		}
		return (
			<div>
				<a href="#start-of-content" className="sr focusable">
					Skip to content
				</a>
				<header>{header}</header>
				<main id="start-of-content">{children}</main>
				<footer>
					<p>
						&copy; {new Date().getFullYear()}.Built with
						{` `}
						<a href="https://www.gatsbyjs.org">Gatsby</a>
					</p>
				</footer>
			</div>
		);
	}
}

export default Layout;
