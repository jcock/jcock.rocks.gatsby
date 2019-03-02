import React from 'react';
import { TransitionGroup, Transition as ReactTransition } from 'react-transition-group';

import config from '../../constants/transition';

import style from './Transition.module.css';

/*
	utils/shouldUpdateScroll.js contains a variable for transitionDelay
	which sets the scrollTop delay so the initial page can transition out.
	The value for transitionDelay should be 1/2 duration
*/

const transitionStyles = {
	entering: {
		position: 'absolute',
		opacity: 0
	},
	entered: {
		transition: `opacity ${config.timeout}ms ${config.ease}`,
		opacity: 1
	},
	exiting: {
		transition: `all ${config.timeout}ms ${config.ease}`,
		opacity: 0
	}
};

class Transition extends React.PureComponent {
	render() {
		const { children, location } = this.props;

		return (
			<TransitionGroup component={null}>
				<ReactTransition
					appear
					key={location.pathname}
					timeout={{
						enter: config.timeout,
						exit: config.timeout
					}}
				>
					{status => (
						<div
							className={style.transitionContainer}
							style={{
								...transitionStyles[status]
							}}
						>
							{children}
						</div>
					)}
				</ReactTransition>
			</TransitionGroup>
		);
	}
}

export default Transition;
