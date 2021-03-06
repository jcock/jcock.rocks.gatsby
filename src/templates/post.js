import React from 'react';
import { graphql } from 'gatsby';

import Figure from '../components/Figure';
import Layout from '../components/Layout';
import SEO from '../components/SEO';
import SiblingsNav from '../components/Navigation/SiblingsNav';

class PostTemplate extends React.Component {
	render() {
		const page = this.props.data.markdownRemark;
		const description = page.frontmatter.description ? page.frontmatter.description : page.excerpt;
		const featuredImg = page.frontmatter.featuredImage;
		const { previous, next } = this.props.pageContext;

		const siblings = {
			prevLocation: previous && previous.fields.slug,
			prevTitle: previous && previous.frontmatter.title,
			nextLocation: next && next.fields.slug,
			nextTitle: next && next.frontmatter.title
		};

		return (
			<Layout>
				<SEO
					date={page.frontmatter.date}
					title={page.frontmatter.title}
					description={description}
					image={featuredImg && featuredImg.childImageSharp.fixed.src}
					imageAlt={featuredImg && page.frontmatter.featuredImageAlt}
					pathname={page.fields.slug}
					keywords={page.frontmatter.tags}
					type={page.frontmatter.dataType}
				/>
				<article>
					<h1>{page.frontmatter.title}</h1>
					<p>{page.frontmatter.date}</p>

					{featuredImg && (
						<Figure
							fluid={featuredImg.childImageSharp.fluid}
							alt={page.frontmatter.title}
							caption={page.frontmatter.title}
							type="feature"
						/>
					)}

					<div dangerouslySetInnerHTML={{ __html: page.html }} />

					<SiblingsNav
						prevLocation={siblings.prevLocation}
						prevTitle={siblings.prevTitle}
						nextLocation={siblings.nextLocation}
						nextTitle={siblings.nextTitle}
					/>
				</article>
			</Layout>
		);
	}
}

export default PostTemplate;

export const postQuery = graphql`
	query PostQuery($slug: String!) {
		markdownRemark(fields: { slug: { eq: $slug } }) {
			excerpt(pruneLength: 160)
			html
			frontmatter {
				date(formatString: "MMMM DD, YYYY")
				title
				description
				tags
				dataType
				featuredImageAlt
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
