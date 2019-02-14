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
				description
				keywords
				lang
				logo
				siteUrl
				social {
					twitter
					fbAppId
				}
				title
				titleTemplate
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

function SEO({ title, date, description, language, pathname, image, imageAlt, article, keywords }) {
	return (
		<StaticQuery
			query={seoQuery}
			render={data => {
				const seo = {
					url: `${data.site.siteMetadata.siteUrl}${pathname}`,
					image: `${data.site.siteMetadata.siteUrl}${image || data.favicon.childImageSharp.fixed.src}`,
					imageAlt: `${imageAlt || description}`,
					keywords: keywords.concat(data.site.siteMetadata.keywords),
					lang: language || data.site.siteMetadata.lang,
					metaDescription: description || data.site.siteMetadata.description
				};

				// schema.org in JSONLD format
				// https://developers.google.com/search/docs/guides/intro-structured-data
				// You can fill out the 'author', 'creator' with more data or another type (e.g. 'Organization')

				const schemaOrgWebPage = {
					'@context': 'http://schema.org',
					'@type': 'WebPage',
					url: seo.url,
					headline: title,
					inLanguage: seo.lang,
					description: seo.metaDescription,
					name: title,
					author: {
						'@type': 'Person',
						name: data.site.siteMetadata.author
					},
					copyrightHolder: {
						'@type': 'Person',
						name: data.site.siteMetadata.author
					},
					copyrightYear: '2019',
					creator: {
						'@type': 'Person',
						name: data.site.siteMetadata.author
					},
					publisher: {
						'@type': 'Person',
						name: data.site.siteMetadata.author
					},
					datePublished: '2019-01-18T10:30:00+01:00',
					dateModified: data.site.buildTime,
					image: {
						'@type': 'ImageObject',
						url: `${data.site.siteMetadata.siteUrl}${image || data.favicon.childImageSharp.fixed.src}`
					}
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

				let schemaArticle = null;

				if (article) {
					schemaArticle = {
						'@context': 'http://schema.org',
						'@type': 'Article',
						author: {
							'@type': 'Person',
							name: data.site.siteMetadata.author
						},
						copyrightHolder: {
							'@type': 'Person',
							name: data.site.siteMetadata.author
						},
						copyrightYear: '2019',
						creator: {
							'@type': 'Person',
							name: data.site.siteMetadata.author
						},
						publisher: {
							'@type': 'Organization',
							name: data.site.siteMetadata.author,
							logo: {
								'@type': 'ImageObject',
								url: `${data.site.siteMetadata.siteUrl}${data.favicon.childImageSharp.fixed.src}`
							}
						},
						datePublished: date,
						description: seo.metaDescription,
						headline: title,
						inLanguage: seo.lang,
						url: seo.url,
						name: seo.title,
						image: {
							'@type': 'ImageObject',
							url: seo.image
						},
						mainEntityOfPage: seo.url
					};
					// Push current blogpost into breadcrumb list
					itemListElement.push({
						'@type': 'ListItem',
						item: {
							'@id': seo.url,
							name: title
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
						<Helmet title={title} titleTemplate={data.site.siteMetadata.titleTemplate}>
							<html lang={seo.lang} />
							<meta name="description" content={seo.metaDescription} />
							<meta name="google-site-verification" content={data.site.siteMetadata.verification.google} />
							<meta name="msvalidate.01" content={data.site.siteMetadata.verification.bing} />
							<meta name="keywords" content={seo.keywords} />

							{/* Insert schema.org data conditionally (webpage/article) + everytime (breadcrumbs) */}
							{!article && <script type="application/ld+json">{JSON.stringify(schemaOrgWebPage)}</script>}
							{article && <script type="application/ld+json">{JSON.stringify(schemaArticle)}</script>}
							<script type="application/ld+json">{JSON.stringify(breadcrumb)}</script>
						</Helmet>
						<Facebook
							title={title}
							description={seo.metaDescription}
							type={article ? 'article' : 'website'}
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
	language: null,
	pathname: null,
	image: null,
	imageAlt: null,
	article: false,
	keywords: []
};

SEO.propTypes = {
	title: PropTypes.string.isRequired,
	description: PropTypes.string,
	language: PropTypes.string,
	pathname: PropTypes.string,
	image: PropTypes.string,
	imageAlt: PropTypes.string,
	article: PropTypes.bool,
	keywords: PropTypes.arrayOf(PropTypes.string)
};

export default SEO;
