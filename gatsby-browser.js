import updateScroll from './src/utils/shouldUpdateScroll';
import wrapPageElementWithTransition from './src/utils/wrapPageElement';

import 'prismjs/themes/prism-tomorrow.css';

// Wrap Pages In Transition
export const wrapPageElement = wrapPageElementWithTransition;

// Delay scroll location updates for page transitions
export const shouldUpdateScroll = updateScroll;
