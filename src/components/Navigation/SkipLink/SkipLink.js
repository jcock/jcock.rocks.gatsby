import React from 'react';
import PropTypes from 'prop-types';

class SkipLink extends React.PureComponent {
	render() {
		const { children, to } = this.props;

		return (
			<a href={to} className="sr focusable">
				{children}
			</a>
		);
	}
}

SkipLink.propTypes = {
	children: PropTypes.node.isRequired,
	to: PropTypes.string.isRequired
};

export default SkipLink;
