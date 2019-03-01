import React from 'react';
import { TransitionGroup, Transition as ReactTransition } from 'react-transition-group';
import anime from 'animejs';

const config = {
	timeout: 600,
	ease: `ease-in-out`
};

const animateIn = location =>
	anime({
		targets: location,
		opacity: 1,
		easing: 'easeInOutQuad'
	});

const animateOut = location =>
	anime({
		targets: location,
		opacity: 0,
		easing: 'easeInOutQuad'
	});

const getTransitionStyles = {
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
					// appear
					key={location.pathname}
					timeout={config.timeout}
					onEntering={animateOut}
					onEntered={animateIn}
					onExiting={animateOut}
				>
					{status => (
						<div
							style={{
								...getTransitionStyles[status]
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
