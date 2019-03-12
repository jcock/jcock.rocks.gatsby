import config from '../constants/transition';

const shouldUpdateScroll = ({ routerProps: { location }, getSavedScrollPosition }) => {
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

export default shouldUpdateScroll;
