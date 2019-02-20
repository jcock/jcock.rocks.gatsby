import React from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import { StaticQuery, graphql } from 'gatsby';
import Facebook from './Facebook';
import Twitter from './Twitter';

const seoQuery = graphql`
	query SEOQuery {
		site {
			buildTime(formatString: "YYYY-MM-DD")
			pathPrefix
			siteMetadata {
				author
				title
				titleTemplate
				description
				keywords
				lang
				logo
				siteUrl
				social {
					twitter
					fbAppId
				}
				verification {
					google
					bing
				}
			}
		}
		favicon: file(relativePath: { eq: "img/favicon.png" }) {
			childImageSharp {
				fixed(width: 1200, height: 630) {
					src
				}
			}
		}
	}
`;

function SEO({ title, date, description, pathname, image, imageAlt, type, keywords }) {
	return (
		<StaticQuery
			query={seoQuery}
			render={data => {
				const seo = {
					// Use title passed in from template/component or fallback to site title as defined in config. [schema, meta tags]
					title: title || data.site.siteMetadata.title,
					// If title has been passed in, use titleTemplate as defined in config. [meta tags]
					titleTemplate: `${title && data.site.siteMetadata.titleTemplate}`,
					// Concat any keywords pass in, to site keywords as defined in config. [meta tags]
					keywords: keywords.concat(data.site.siteMetadata.keywords),
					// Use description passed in from template/component or fallback to site description as defined in config. [schema, meta tags]
					description: description || data.site.siteMetadata.description,
					// If an image has been passed in, use it, else, fall back to preprocessed favicon starter image (1500x1500). [schema, meta tags]
					image: `${data.site.siteMetadata.siteUrl}${image || data.favicon.childImageSharp.fixed.src}`,
					// If an image has been passed in, if defined, use imageAlt, else, fallback to title, then description. If not, use site title as defined in config. [schema, meta tags]
					imageAlt: `${image ? imageAlt || title || description : data.site.siteMetadata.title}`,
					// Use date passed in from template/component or fallback to last buildTime. [schema]
					datePublished: `${date || data.site.buildTime}`,
					// If a type is passed in, use it, if not, fall back to WebPage. [schema]
					pageType: type || 'WebPage',
					// If a pathname has been passed in, append it to the siteUrl defined in config. If not, fall back to /. [schema, meta tags]
					url: `${data.site.siteMetadata.siteUrl}${pathname || '/'}`
				};

				// schema.org in JSONLD format
				// https://developers.google.com/search/docs/guides/intro-structured-data
				// You can fill out the 'author', 'creator' with more data or another type (e.g. 'Organization')
				const schema = {
					'@context': 'http://schema.org',
					'@type': seo.pageType,
					author: {
						'@type': 'Person',
						name: data.site.siteMetadata.author
					},
					copyrightHolder: {
						'@type': 'Person',
						name: data.site.siteMetadata.author
					},
					copyrightYear: `${new Date().getFullYear()}`,
					creator: {
						'@type': 'Person',
						name: data.site.siteMetadata.author,
						logo: {
							'@type': 'ImageObject',
							url: `${data.site.siteMetadata.siteUrl}${data.favicon.childImageSharp.fixed.src}`,
							alt: data.site.siteMetadata.title
						}
					},
					datePublished: seo.datePublished,
					description: seo.description,
					headline: seo.title,
					image: {
						'@type': 'ImageObject',
						url: seo.image,
						alt: seo.imageAlt
					},
					inLanguage: data.site.siteMetadata.lang,
					mainEntityOfPage: seo.url,
					publisher: {
						'@type': 'Person',
						name: data.site.siteMetadata.author
					},
					url: seo.url
				};

				// Initial breadcrumb list
				const itemListElement = [
					{
						'@type': 'ListItem',
						item: {
							'@id': data.site.siteMetadata.siteUrl,
							name: 'Homepage'
						},
						position: 1
					}
				];

				if (type) {
					itemListElement.push({
						'@type': 'ListItem',
						item: {
							'@id': seo.url,
							name: seo.title
						},
						position: 2
					});
				}

				const breadcrumb = {
					'@context': 'http://schema.org',
					'@type': 'BreadcrumbList',
					description: 'Breadcrumbs list',
					name: 'Breadcrumbs',
					itemListElement
				};
				return (
					<>
						<Helmet title={seo.title} titleTemplate={seo.titleTemplate}>
							<html lang={data.site.siteMetadata.lang} />
							<meta name="description" content={seo.description} />
							<meta name="keywords" content={seo.keywords} />
							<meta name="google-site-verification" content={data.site.siteMetadata.verification.google} />
							<meta name="msvalidate.01" content={data.site.siteMetadata.verification.bing} />

							{/* Insert schema.org data conditionally (webpage/creativeWork/article) + everytime (breadcrumbs) */}
							<script type="application/ld+json">{JSON.stringify(schema)}</script>
							<script type="application/ld+json">{JSON.stringify(breadcrumb)}</script>
						</Helmet>
						<Facebook
							title={seo.title}
							description={seo.description}
							type={type === 'Article' ? 'article' : 'website'}
							pageUrl={seo.url}
							image={seo.image}
							imageAlt={seo.imageAlt}
							appID={data.site.siteMetadata.social.fbAppId}
						/>
						<Twitter username={data.site.siteMetadata.social.twitter} />
					</>
				);
			}}
		/>
	);
}

SEO.defaultProps = {
	description: null,
	date: null,
	pathname: null,
	image: null,
	imageAlt: null,
	type: null,
	keywords: []
};

SEO.propTypes = {
	title: PropTypes.string.isRequired,
	date: PropTypes.string,
	description: PropTypes.string,
	pathname: PropTypes.string,
	image: PropTypes.string,
	imageAlt: PropTypes.string,
	type: PropTypes.string,
	keywords: PropTypes.arrayOf(PropTypes.string)
};

export default SEO;
