import React from 'react';
import Transition from '../components/Transition/Pose/Transition';

const wrapPageElement = ({ element, props }) => {
	return <Transition {...props}>{element}</Transition>;
};

export default wrapPageElement;
