import React from 'react';
import posed, { PoseGroup } from 'react-pose';

import style from './Transition.module.css';

const config = {
	timeout: 300,
	duration: 600,
	ease: `easeInOut`
};

class PageTransition extends React.PureComponent {
	render() {
		const { children, location } = this.props;

		const RoutesContainer = posed.div({
			enter: {
				delay: config.timeout,
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
