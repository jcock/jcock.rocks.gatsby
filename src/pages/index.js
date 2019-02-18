import React from 'react';
import { Link, graphql } from 'gatsby';

import Bio from '../components/Bio';
import Layout from '../components/Layout';
import SEO from '../components/SEO';

class AppIndex extends React.Component {
	render() {
		const { data } = this.props;
		const url = data.location;
		const posts = data.allMarkdownRemark.edges;

		return (
			<Layout location={url}>
				<SEO title="" />
				<Bio />
				<ol reversed>
					{posts.map(({ node }) => {
						const title = node.frontmatter.title || node.fields.slug;
						return (
							<li key={node.fields.slug}>
								<h2>
									<Link to={node.fields.slug}>{title}</Link>
								</h2>
								<p>{node.frontmatter.date}</p>
								<p dangerouslySetInnerHTML={{ __html: node.excerpt }} />
							</li>
						);
					})}
				</ol>
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
		allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
			edges {
				node {
					excerpt
					fields {
						slug
					}
					frontmatter {
						date(formatString: "MMMM DD, YYYY")
						title
					}
				}
			}
		}
	}
`;
