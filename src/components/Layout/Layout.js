import React from 'react';
import PropTypes from 'prop-types';

import Footer from './Footer';
import Header from './Header';
import SkipLink from '../Navigation/SkipLink';

import '../../assets/css/app.css';

class Layout extends React.PureComponent {
	render() {
		const { children } = this.props;

		return (
			<>
				<SkipLink to="#start-of-content">Skip to content</SkipLink>
				<Header />
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
