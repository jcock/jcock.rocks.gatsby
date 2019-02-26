const config = require('./app-config');

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
			// react-axe prints a11y warnings to your browser’s console.
			resolve: 'gatsby-plugin-react-axe',
			options: {
				showInProduction: false
			}
		},
		{
			resolve: `gatsby-transformer-remark`,
			options: {
				plugins: [
					{
						resolve: `gatsby-remark-images`,
						options: {
							withWebp: true
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
		`gatsby-plugin-netlify-cache`,
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
