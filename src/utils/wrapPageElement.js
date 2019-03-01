import React from 'react';
import Transition from '../components/Transition/TransitionGroup';

const wrapPageElement = ({ element, props }) => {
	return <Transition {...props}>{element}</Transition>;
};

export default wrapPageElement;
