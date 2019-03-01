import React from 'react';
import { Link } from 'gatsby';
import PropTypes from 'prop-types';

class SiblingNav extends React.PureComponent {
	render() {
		const { prevLocation, prevTitle, nextLocation, nextTitle } = this.props;

		return (
			<ul>
				{prevTitle && (
					<li>
						<Link to={prevLocation} rel="prev">
							← {prevTitle}
						</Link>
					</li>
				)}
				{nextTitle && (
					<li>
						<Link to={nextLocation} rel="next">
							{nextTitle} →
						</Link>
					</li>
				)}
			</ul>
		);
	}
}

SiblingNav.defaultProps = {
	prevLocation: null,
	prevTitle: null,
	nextLocation: null,
	nextTitle: null
};

SiblingNav.propTypes = {
	prevLocation: PropTypes.string,
	prevTitle: PropTypes.string,
	nextLocation: PropTypes.string,
	nextTitle: PropTypes.string
};

export default SiblingNav;
