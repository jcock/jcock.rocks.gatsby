import React from 'react';
import PropTypes from 'prop-types';

class ToTopLink extends React.PureComponent {
	render() {
		const { to } = this.props;

		return (
			<a href={to} className="sr focusable">
				Top of page
			</a>
		);
	}
}

ToTopLink.propTypes = {
	to: PropTypes.string.isRequired
};

export default ToTopLink;
