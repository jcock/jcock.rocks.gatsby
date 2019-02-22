import React from 'react';
import Transition from './src/components/Transition';

// Set up some <head> components
// eslint-disable-next-line import/prefer-default-export
// export const onRenderBody = ({ setHeadComponents }) => {
// 	setHeadComponents([
// 		<link rel="dns-prefetch" key="dns-prefetch-google-analytics" href="https://www.google-analytics.com" />,
// 		<link rel="preconnect" key="preconnect-google" href="https://www.google.com" />,
// 		<link rel="preconnect" key="preconnect-google-marketingplatform" href="https://marketingplatform.google.com" />
// 	]);
// };

// Wrap Pages In Transition
// eslint-disable-next-line import/prefer-default-export
export const wrapPageElement = ({ element, props }) => {
	return <Transition {...props}>{element}</Transition>;
};
