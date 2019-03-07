import React from 'react';
import { TransitionGroup, Transition as ReactTransition } from 'react-transition-group';

import config from '../../constants/transition';

import style from './Transition.module.css';

const transitionStyles = {
	entering: {
		position: 'absolute',
		opacity: 0
	},
	entered: {
		transition: `opacity ${config.page2.timeout}ms ${config.page2.ease}`,
		opacity: 1
	},
	exiting: {
		transition: `all ${config.page2.timeout}ms ${config.page2.ease}`,
		opacity: 0
	}
};

class Transition extends React.PureComponent {
	render() {
		const { children, location } = this.props;

		const scrollTop = () => window.scrollTo(0, 0);

		return (
			<TransitionGroup component={null}>
				<ReactTransition
					appear
					key={location.pathname}
					timeout={{
						enter: config.page2.timeout,
						exit: config.page2.timeout
					}}
					onExited={scrollTop}
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
