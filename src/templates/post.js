import React from 'react';
import { Link, graphql } from 'gatsby';

import Bio from '../components/Bio';
import Layout from '../components/Layout';
import SEO from '../components/SEO';

class PostTemplate extends React.Component {
	render() {
		const post = this.props.data.markdownRemark;
		const url = this.props.location;
		const siteTitle = this.props.data.site.siteMetadata.title;
		const { previous, next } = this.props.pageContext;

		return (
			<Layout location={url} title={siteTitle}>
				<SEO
					title={post.frontmatter.title}
					description={
						post.frontmatter.description
							? post.frontmatter.description
							: post.excerpt
					}
					image={post.frontmatter.image}
					pathname={post.frontmatter.slug}
					keywords={post.frontmatter.tags}
					article
				/>
				<article>
					<h1>{post.frontmatter.title}</h1>
					<p>{post.frontmatter.date}</p>
					<p>{post.frontmatter.slug}</p>
					<div dangerouslySetInnerHTML={{ __html: post.html }} />
					<hr />
					<Bio />

					<ul>
						{previous && (
							<li>
								<Link to={previous.fields.slug} rel="prev">
									← {previous.frontmatter.title}
								</Link>
							</li>
						)}
						{next && (
							<li>
								<Link to={next.fields.slug} rel="next">
									{next.frontmatter.title} →
								</Link>
							</li>
						)}
					</ul>
				</article>
			</Layout>
		);
	}
}

export default PostTemplate;

export const postQuery = graphql`
	query PostQuery($slug: String!) {
		site {
			siteMetadata {
				title
				author
			}
		}
		markdownRemark(fields: { slug: { eq: $slug } }) {
			id
			excerpt(pruneLength: 160)
			html
			frontmatter {
				date(formatString: "MMMM DD, YYYY")
				title
				slug
				description
				tags
			}
		}
	}
`;
