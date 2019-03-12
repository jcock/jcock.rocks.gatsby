import React from 'react';
import { TransitionGroup, Transition as PageTransition } from 'react-transition-group';

import config from '../../../constants/transition';

import style from '../Transition.module.css';

const transitionStyles = {
	entering: {
		position: 'absolute',
		opacity: 0
	},
	entered: {
		transition: `opacity ${config.page.durationIn}ms var(--easePrimary)`,
		opacity: 1
	},
	exiting: {
		transition: `all ${config.page.durationOut}ms var(--easePrimary)`,
		opacity: 0
	}
};

class Transition extends React.PureComponent {
	render() {
		const { children, location } = this.props;

		return (
			<TransitionGroup component={null}>
				<PageTransition
					appear
					key={location.pathname}
					timeout={{
						enter: config.page.durationIn,
						exit: config.page.durationOut
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
				</PageTransition>
			</TransitionGroup>
		);
	}
}

export default Transition;
