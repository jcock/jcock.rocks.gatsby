import React from 'react';
import Helmet from 'react-helmet';

class Twitter extends React.PureComponent {
	render() {
		const { cardType = 'summary_large_image', username = null } = this.props;

		return (
			<Helmet>
				<meta name="twitter:card" content={cardType} />
				{username && <meta name="twitter:creator" content={username} />}
			</Helmet>
		);
	}
}

export default Twitter;
