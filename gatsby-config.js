const config = require('./site-config');

module.exports = {
	pathPrefix: config.pathPrefix === '' ? '/' : config.pathPrefix,
	siteMetadata: {
		...config
	},
	plugins: [
		{
			resolve: `gatsby-source-filesystem`,
			options: {
				path: `${__dirname}/src/assets`,
				name: `assets`
			}
		},
		{
			resolve: `gatsby-source-filesystem`,
			options: {
				path: `${__dirname}/content`,
				name: `pages`
			}
		},
		{
			resolve: `gatsby-plugin-canonical-urls`,
			options: {
				siteUrl: config.siteUrl
			}
		},
		{
			resolve: 'gatsby-plugin-feed',
			options: {
				query: `
					{
						site {
							siteMetadata {
								site_url: siteUrl
								title: siteTitle
								description: siteDescription
							}
						}
					}
				`,
				feeds: [
					{
						serialize: ({ query: { site, allMarkdownRemark } }) =>
							allMarkdownRemark.edges.map(edge =>
								Object.assign({}, edge.node.frontmatter, {
									date: edge.node.frontmatter.date,
									title: edge.node.frontmatter.title,
									description: edge.node.frontmatter.description,
									url: site.siteMetadata.site_url + edge.node.fields.slug,
									guid: site.siteMetadata.site_url + edge.node.fields.slug,
									custom_elements: [
										{ 'content:encoded': edge.node.html },
										{ author: `${config.author.contacts.email} (${config.author.name})` }
									]
								})
							),
						query: `
							{
								allMarkdownRemark(
									limit: 1000,
									sort: { order: DESC, fields: [frontmatter___date] },
									filter: { frontmatter: { dataType: { eq: "Article" } } }
								) {
									edges {
										node {
											excerpt
											html
											fields {
												slug
											}
											frontmatter {
												title
												date
												description
												dataType
												tags
											}
										}
									}
								}
							}
						`,
						output: '/rss.xml'
					}
				]
			}
		},
		{
			resolve: `gatsby-plugin-google-analytics`,
			options: {
				trackingId: config.googleAnalyticsID
			}
		},
		{
			resolve: `gatsby-plugin-manifest`,
			options: {
				name: config.siteTitle,
				short_name: config.siteTitleShort,
				description: config.siteDescription,
				dir: `auto`,
				start_url: config.pathPrefix,
				background_color: config.backgroundColor,
				theme_color: config.themeColor,
				display: `standalone`,
				icon: `${__dirname}/src/assets/${config.logo}`,
				icons: config.icons
			}
		},
		`gatsby-plugin-offline`,
		`gatsby-plugin-postcss`,
		{
			resolve: `gatsby-plugin-purgecss`,
			options: {
				printRejected: true,
				ignore: ['prismjs/']
			}
		},
		{
			resolve: `gatsby-transformer-remark`,
			options: {
				plugins: [
					{
						resolve: `gatsby-remark-images`,
						options: {
							withWebp: true,
							maxWidth: 2048
						}
					},
					`gatsby-remark-responsive-iframe`,
					`gatsby-remark-prismjs`,
					`gatsby-remark-copy-linked-files`,
					`gatsby-remark-smartypants`
				]
			}
		},
		`gatsby-plugin-react-helmet`,
		`gatsby-transformer-sharp`,
		`gatsby-plugin-sharp`,
		`gatsby-plugin-sitemap`,
		`gatsby-plugin-svgr`,
		{
			resolve: `gatsby-plugin-netlify`, // Must be last in the plugins array
			options: {
				allPageHeaders: [
					'Link: href=https://www.google-analytics.com; rel=dns-prefetch',
					'Link: href=https://www.google.com; rel=preconnect',
					'Link: href=https://marketingplatform.google.com; rel=preconnect'
				]
			}
		}
	]
};
