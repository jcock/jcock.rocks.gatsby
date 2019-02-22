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
				filter: `blur(0px)`,
				opacity: 1,
				transition: { duration }
			},
			exit: {
				filter: `blur(20px)`,
				opacity: 0,
				transition: { duration: `${duration / 2}` }
			}
		});

		return (
			<PoseGroup>
				<RoutesContainer className={style.transitionContainer} key={location.pathname}>
					{children}
				</RoutesContainer>
			</PoseGroup>
		);
	}
}

export default Transition;
