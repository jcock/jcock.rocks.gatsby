import wrapPageElementWithTransition from './src/utils/wrapPageElement';
import config from './src/constants/transition';

import 'prismjs/themes/prism-tomorrow.css';

// Wrap Pages In Transition
export const wrapPageElement = wrapPageElementWithTransition;

// Handle page scrolling on transition
export const shouldUpdateScroll = ({ routerProps: { location }, getSavedScrollPosition }) => {
	if (location.hash) {
		// If the link is a hash, gtfo.
		return false;
	}
	if (location.action === 'PUSH') {
		window.setTimeout(() => window.scrollTo(0, 0), config.page.durationOut);
	} else {
		const savedPosition = getSavedScrollPosition(location);
		window.setTimeout(() => window.scrollTo(...(savedPosition || [0, 0])), config.page.durationOut);
	}
	return false;
};

// export const shouldUpdateScroll = () => false;
