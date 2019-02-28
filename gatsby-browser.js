import React from 'react';
import Transition from './src/components/Transition';

import 'prismjs/themes/prism-tomorrow.css';

// Wrap Pages In Transition
// eslint-disable-next-line import/prefer-default-export
const wrapPageElement = ({ element, props }) => {
	return <Transition {...props}>{element}</Transition>;
};

const transitionDelay = 300;
const shouldUpdateScroll = ({ routerProps: { location }, getSavedScrollPosition }) => {
	if (location.action === 'PUSH') {
		window.setTimeout(() => window.scrollTo(0, 0), transitionDelay);
	} else {
		const savedPosition = getSavedScrollPosition(location);
		window.setTimeout(() => window.scrollTo(...(savedPosition || [0, 0])), transitionDelay);
	}
	return false;
};

export { wrapPageElement, shouldUpdateScroll };
