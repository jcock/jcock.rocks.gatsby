const React = require('react');

exports.onRenderBody = ({ setHeadComponents }) => {
	setHeadComponents([
		<link rel="dns-prefetch" key="dns-prefetch-google-analytics" href="https://www.google-analytics.com" />,
		<link rel="preconnect" key="preconnect-google" href="https://www.google.com" />,
		<link rel="preconnect" key="preconnect-google-marketingplatform" href="https://marketingplatform.google.com" />
	]);
};
