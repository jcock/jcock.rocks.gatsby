const React = require('react');

exports.onRenderBody = ({ setHeadComponents }) => {
	setHeadComponents([
		<link rel="dns-prefetch" key="dns-prefetch-google-analytics" href="https://www.google-analytics.com" />,
		<link rel="dns-prefetch" key="dns-prefetch-google" href="https://www.google.com" />,
		<link rel="dns-prefetch" key="dns-prefetch-google-marketingplatform" href="https://marketingplatform.google.com" />
	]);
};
