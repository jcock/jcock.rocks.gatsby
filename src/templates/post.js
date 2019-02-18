import React from 'react';
import Img from 'gatsby-image';
import { Link, graphql } from 'gatsby';

import Bio from '../components/Bio';
import Layout from '../components/Layout';
import SEO from '../components/SEO';

class PostTemplate extends React.Component {
	render() {
		const url = this.props.location;
		const post = this.props.data.markdownRemark;
		const description = post.frontmatter.description ? post.frontmatter.description : post.excerpt;
		const featuredImg = post.frontmatter.featuredImage;
		const { previous, next } = this.props.pageContext;

		return (
			<Layout location={url}>
				<SEO
					date={post.frontmatter.date}
					title={post.frontmatter.title}
					description={description}
					image={featuredImg ? featuredImg.childImageSharp.fixed.src : ''}
					pathname={post.fields.slug}
					keywords={post.frontmatter.tags}
					type={post.frontmatter.dataType}
				/>
				<article>
					<h1>{post.frontmatter.title}</h1>
					<p>{post.frontmatter.date}</p>

					{featuredImg && <Img fluid={featuredImg.childImageSharp.fluid} alt={post.frontmatter.title} fadeIn />}

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
			excerpt(pruneLength: 160)
			html
			frontmatter {
				date(formatString: "MMMM DD, YYYY")
				title
				description
				tags
				dataType
				featuredImage {
					publicURL
					childImageSharp {
						fluid(maxWidth: 1920) {
							...GatsbyImageSharpFluid_withWebp_tracedSVG
						}
						fixed(width: 1200, height: 630) {
							...GatsbyImageSharpFixed
						}
					}
				}
			}
			fields {
				slug
			}
		}
	}
`;
