import React from 'react';
import posed, { PoseGroup } from 'react-pose';

import style from './Transition.module.css';

const timeout = 300;
const duration = 600;
const ease = `easeInOut`;

class Transition extends React.PureComponent {
	render() {
		const { children, location } = this.props;

		const RoutesContainer = posed.div({
			enter: {
				delay: timeout,
				beforeChildren: true,
				// filter: `blur(0px)`,
				opacity: 1,
				transition: {
					duration,
					ease
				}
			},
			exit: {
				// filter: `blur(4px)`,
				opacity: 0
			}
		});

		return (
			<PoseGroup animateOnMount>
				<RoutesContainer className={style.transitionContainer} key={location.pathname}>
					{children}
				</RoutesContainer>
			</PoseGroup>
		);
	}
}

export default Transition;
