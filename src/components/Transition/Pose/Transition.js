import React from 'react';
import PropTypes from 'prop-types';
import posed, { PoseGroup } from 'react-pose';

import style from '../Transition.module.css';

class Transition extends React.PureComponent {
	render() {
		const { children, location } = this.props;
		const scrollTop = () => window.scrollTo(0, 0);

		const config = {
			delay: 400,
			duration: 400,
			ease: `easeInOut`
		};

		const RouteContainer = posed.div({
			enter: {
				delay: config.delay,
				beforeChildren: true,
				opacity: 1,
				transition: {
					duration: config.duration,
					ease: config.ease
				}
			},
			exit: {
				opacity: 0,
				transition: {
					duration: config.duration,
					ease: config.ease
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
