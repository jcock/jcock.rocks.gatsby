const config = require('./app-config');

module.exports = {
	pathPrefix: config.pathPrefix === '' ? '/' : config.pathPrefix,
	siteMetadata: {
		title: config.siteTitle,
		author: config.author,
		description: config.siteDescription,
		siteUrl: config.siteUrl,
		verification: {
			google: config.verification.google,
			bing: config.verification.bing
		},
		social: {
			twitter: config.social.twitter
		}
	},
	plugins: [
		{
			resolve: `gatsby-source-filesystem`,
			options: {
				path: `${__dirname}/content/posts`,
				name: `posts`
			}
		},
		{
			resolve: `gatsby-source-filesystem`,
			options: {
				path: `${__dirname}/src/assets`,
				name: `assets`
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
				start_url: config.pathPrefix,
				background_color: config.backgroundColor,
				theme_color: config.themeColor,
				display: `minimal-ui`,
				icon: config.logo,
				icons: config.icons
			}
		},
		`gatsby-plugin-offline`,
		`gatsby-plugin-postcss`,
		{
			resolve: `gatsby-plugin-purgecss`,
			options: {
				tailwind: true
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
		`gatsby-plugin-netlify` // Must be last in the plugins array
	]
};
