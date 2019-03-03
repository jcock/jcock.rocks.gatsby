import React from 'react';
import { TransitionGroup, Transition as ReactTransition } from 'react-transition-group';

import config from '../../constants/transition';
import animations from './Animations';

import style from './Transition.module.css';

/*
	utils/shouldUpdateScroll.js contains a variable for transitionDelay
	which sets the scrollTop delay so the initial page can transition out.
	The value for transitionDelay should be 1/2 duration
*/

class Transition extends React.PureComponent {
	render() {
		const { children, location } = this.props;

		return (
			<TransitionGroup component={null}>
				<ReactTransition
					appear
					key={location.pathname}
					onEntering={el => animations.animateOut(el)}
					onEntered={el => animations.animateIn(el)}
					onExiting={el => animations.animateOut(el)}
					timeout={{
						enter: config.timeout,
						exit: config.timeout
					}}
				>
					<div id="top" className={style.transitionContainer}>
						{children}
					</div>
				</ReactTransition>
			</TransitionGroup>
		);
	}
}

export default Transition;
