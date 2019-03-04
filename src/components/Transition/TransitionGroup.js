import React from 'react';
import { TransitionGroup, Transition as ReactTransition } from 'react-transition-group';

import config from '../../constants/transition';
import animations from './Animations';

import style from './Transition.module.css';

class Transition extends React.PureComponent {
	render() {
		const { children, location } = this.props;
		return (
			<TransitionGroup component={null}>
				<ReactTransition
					appear
					key={location.pathname}
					onEnter={el => animations.animateIn(el)}
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
