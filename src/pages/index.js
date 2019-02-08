import React from 'react';
import { Link, graphql } from 'gatsby';

import Bio from '../components/Bio';
import Layout from '../components/Layout';
import SEO from '../components/SEO';

class AppIndex extends React.Component {
	render() {
		const { data } = this.props;
		const siteTitle = data.site.siteMetadata.title;
		const posts = data.allMarkdownRemark.edges;

		return (
			<Layout location={this.props.location} title={siteTitle}>
				<SEO
					title="All posts"
					keywords={[`blog`, `gatsby`, `javascript`, `react`]}
				/>
				<Bio />
				{posts.map(({ node }) => {
					const title = node.frontmatter.title || node.fields.slug;
					return (
						<div key={node.fields.slug}>
							<h3>
								<Link to={node.fields.slug}>{title}</Link>
							</h3>
							<small>{node.frontmatter.date}</small>
							<p dangerouslySetInnerHTML={{ __html: node.excerpt }} />
						</div>
					);
				})}
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
