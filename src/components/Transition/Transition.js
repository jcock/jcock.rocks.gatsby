import React from 'react';
import PropTypes from 'prop-types';
import posed, { PoseGroup } from 'react-pose';

import config from '../../constants/transition';

import style from './Transition.module.css';

class Transition extends React.PureComponent {
	render() {
		const { children, location } = this.props;
		const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches === true;
		const scrollTop = () => window.scrollTo(0, 0);

		const motionPreference = {
			durationIn: prefersReducedMotion ? 0 : config.page.durationIn,
			durationOut: prefersReducedMotion ? 0 : config.page.durationOut
		};

		const RouteContainer = posed.div({
			enter: {
				delay: motionPreference.durationOut,
				beforeChildren: true,
				opacity: 1,
				transition: {
					duration: motionPreference.durationIn,
					ease: config.page.ease
				}
			},
			exit: {
				opacity: 0,
				transition: {
					duration: motionPreference.durationOut,
					ease: config.page.ease
				}
			}
		});

		return (
			<PoseGroup animateOnMount>
				<RouteContainer key={location.pathname} className={style.transitionContainer} onPoseComplete={scrollTop}>
					{children}
				</RouteContainer>
			</PoseGroup>
		);
	}
}

Transition.propTypes = {
	children: PropTypes.node.isRequired,
	location: PropTypes.object.isRequired // eslint-disable-line react/forbid-prop-types
};

export default Transition;
