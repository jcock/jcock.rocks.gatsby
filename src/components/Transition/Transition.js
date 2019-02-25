import React from 'react';
import posed, { PoseGroup } from 'react-pose';

import style from './Transition.module.css';

const timeout = 300;
const duration = 600;

class Transition extends React.PureComponent {
	render() {
		const { children, location } = this.props;

		const RoutesContainer = posed.div({
			enter: {
				delay: timeout,
				delayChildren: timeout,
				opacity: 1,
				transition: {
					duration,
					ease: `easeInOut`
				}
			},
			exit: {
				opacity: 0
			}
		});

		return (
			<div>
				<PoseGroup animateOnMount>
					<RoutesContainer className={style.transitionContainer} key={location.pathname}>
						{children}
					</RoutesContainer>
				</PoseGroup>
			</div>
		);
	}
}

export default Transition;
