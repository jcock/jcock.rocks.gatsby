import React from 'react';

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

export default SkipLink;
