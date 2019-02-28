import React from 'react';
import posed, { PoseGroup } from 'react-pose';

import style from './Transition.module.css';

/*
	utils/shouldUpdateScroll.js contains a variable for transitionDelay
	which sets the scrollTop delay so the initial page can transition out.
	The value for transitionDelay should be 1/2 duration
*/

const config = {
	timeout: 300,
	duration: 600,
	ease: `easeOut`
};

class PageTransition extends React.PureComponent {
	render() {
		const { children, location } = this.props;

		const RoutesContainer = posed.div({
			enter: {
				delay: config.timeout,
				delayChildren: config.timeout,
				beforeChildren: true,
				opacity: 1,
				transition: {
					duration: config.duration,
					ease: config.ease
				}
			},
			exit: {
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

export default PageTransition;
