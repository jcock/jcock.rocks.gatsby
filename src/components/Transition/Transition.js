import React from 'react';
import { TransitionGroup, Transition as ReactTransition } from 'react-transition-group';

import config from '../../constants/transition';

import style from './Transition.module.css';

const transitionStyles = {
	entering: {
		// position: 'absolute',
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
							id="top"
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
