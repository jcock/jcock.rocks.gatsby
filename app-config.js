const title = `Jason Cockerham 🤘 Designer and Developer`;

const config = {
	pathPrefix: `/`,
	siteTitle: title,
	siteTitleShort: `jcock.rocks 🤘`,
	titleTemplate: `%s | ${title}`,
	siteDescription: `The portfolio of Jason Cockerham, digital designer, developer, and maker of internets.`,
	siteKeywords: `ux design, front-end development, gatsbyjs, html, css, js, react, static, jamstack`,
	siteUrl: `https://jcock.rocks`,
	author: `Jason Cockerham`,
	lang: `en`,
	themeColor: `#000`,
	backgroundColor: `#000`,

	// Analytics
	googleAnalyticsID: `UA-54478957-1`,

	// Site verification
	verification: {
		google: `CqIX8qMP-9YzT5j6O2ITwq-p0RpcxkbA3UZeEwZcRJw`,
		bing: `D5EB4D7B4B2096C374CE2AEB1D6EDB32`
	},

	// Favicons
	// Serves as starting point to generate favicons as well as the default OG image
	// Make this image at least 1500x1500
	logo: `img/favicon.png`,
	icons: [
		{
			src: `/apple-touch-icon.png`,
			sizes: `180x180`,
			type: `image/png`
		},
		{
			src: `/android-chrome-192x192.png`,
			sizes: `192x192`,
			type: `image/png`
		},
		{
			src: `/android-chrome-512x512.png`,
			sizes: `512x512`,
			type: `image/png`
		},
		{
			src: `/favicon-16x16.png`,
			sizes: `16x16`,
			type: `image/png`
		},
		{
			src: `/favicon-32x32.png`,
			sizes: `32x32`,
			type: `image/png`
		},
		{
			src: `/mstile-150x150.png`,
			sizes: `150x150`,
			type: `image/png`
		},
		{
			src: `/mstile-310x310.png`,
			sizes: `310x310`,
			type: `image/png`
		},
		{
			src: `/mstile-310x150.png`,
			sizes: `310x150`,
			type: `image/png`
		}
	],

	// Social
	social: {
		twitter: `@jcock`,
		fbAppId: `103751713080205`
	}
};

module.exports = config;
