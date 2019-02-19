import React from 'react';

import Layout from '../components/Layout';
import SEO from '../components/SEO';

class NotFoundPage extends React.Component {
	render() {
		const url = this.props.location;

		return (
			<Layout location={url}>
				<SEO title="404: Not Found" pathname={url.pathname} />
				<h1>Not Found</h1>
				<p>You just hit a route that doesn&#39;t exist... the sadness.</p>
			</Layout>
		);
	}
}

export default NotFoundPage;
