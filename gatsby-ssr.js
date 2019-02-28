import React from 'react';
import Transition from './src/components/Transition';

// Wrap Pages In Transition
// eslint-disable-next-line import/prefer-default-export
export const wrapPageElement = ({ element, props }) => {
	return <Transition {...props}>{element}</Transition>;
};
