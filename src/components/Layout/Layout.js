import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';

import Footer from '../Footer';
import SkipLink from '../Navigation/SkipLink';
// import Link from '../Transition/FadeLink';

import '../../assets/css/app.css';
import style from './Layout.module.css';

class Layout extends React.PureComponent {
	render() {
		const { children } = this.props;

		return (
			<>
				<SkipLink to="#start-of-content">Skip to content</SkipLink>
				<header>
					<h1 className={style.title}>
						<Link to="/">
							jcock.rocks
							<span role="img" aria-label="Rock on!">
								🤘
							</span>
						</Link>
					</h1>
				</header>
				<main id="start-of-content">{children}</main>
				<Footer />
			</>
		);
	}
}

Layout.propTypes = {
	children: PropTypes.node.isRequired
};

export default Layout;
