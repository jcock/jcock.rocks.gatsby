import React from 'react';
import { graphql } from 'gatsby';

import Bio from '../components/Bio';
import Layout from '../components/Layout';
import SEO from '../components/SEO';
import PageList from '../components/PageList';

class AppIndex extends React.Component {
	render() {
		const { data } = this.props;
		const url = data.location;
		const postEdges = data.allMarkdownRemark.edges;

		return (
			<Layout location={url}>
				<SEO title="" />
				<Bio />
				<PageList postEdges={postEdges} />
			</Layout>
		);
	}
}

export default AppIndex;

export const pageQuery = graphql`
	query {
		site {
			siteMetadata {
				title
			}
		}
		allMarkdownRemark(
			# filter: { fileAbsolutePath: { glob: "**/posts/**" } }
			sort: { fields: [frontmatter___date], order: DESC }
		) {
			edges {
				node {
					excerpt
					fields {
						slug
					}
					frontmatter {
						date(formatString: "MMMM DD, YYYY")
						title
						slug
					}
				}
			}
		}
	}
`;
