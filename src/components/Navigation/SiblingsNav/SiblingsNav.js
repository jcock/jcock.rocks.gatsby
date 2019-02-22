import React from 'react';
import { Link } from 'gatsby';

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

export default SiblingNav;
