import config from '../constants/transition';

const shouldUpdateScroll = ({ routerProps: { location }, getSavedScrollPosition }) => {
	if (location.action === 'PUSH') {
		window.setTimeout(() => window.scrollTo(0, 0), config.timeout);
	} else {
		const savedPosition = getSavedScrollPosition(location);
		window.setTimeout(() => window.scrollTo(...(savedPosition || [0, 0])), config.timeout);
	}
	return false;
};

export default shouldUpdateScroll;
