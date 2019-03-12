import wrapPageElementWithTransition from './src/utils/wrapPageElement';
import transitionShouldUpdateScroll from './src/utils/shouldUpdateScroll';

import 'prismjs/themes/prism-tomorrow.css';

// Wrap Pages In Transition
export const wrapPageElement = wrapPageElementWithTransition;

// Update scroll position during transition
export const shouldUpdateScroll = transitionShouldUpdateScroll;
// export const shouldUpdateScroll = () => false;
