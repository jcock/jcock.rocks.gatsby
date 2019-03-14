import wrapRootElementWithContext from './src/utils/wrapRootElement';
import wrapPageElementWithTransition from './src/utils/wrapPageElement';
import transitionShouldUpdateScroll from './src/utils/shouldUpdateScroll';

import 'prismjs/themes/prism-tomorrow.css';

// Wrap Root to provide React Context
export const wrapRootElement = wrapRootElementWithContext;

// Wrap Pages In Transition
export const wrapPageElement = wrapPageElementWithTransition;

// Update scroll position during transition
export const shouldUpdateScroll = transitionShouldUpdateScroll;
// export const shouldUpdateScroll = () => false;
