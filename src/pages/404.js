import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/Layout';
import SEO from '../components/SEO';

class NotFoundPage extends React.Component {
	render() {
		const { data } = this.props;
		const url = this.props.location;
		const siteTitle = data.site.siteMetadata.title;

		return (
			<Layout location={url} title={siteTitle}>
				<SEO title="404: Not Found" pathname={url.pathname} />
				<h1>Not Found</h1>
				<p>You just hit a route that doesn&#39;t exist... the sadness.</p>
			</Layout>
		);
	}
}

export default NotFoundPage;

export const pageQuery = graphql`
	query {
		site {
			siteMetadata {
				title
			}
		}
	}
`;
