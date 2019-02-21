import React from 'react';
import posed, { PoseGroup } from 'react-pose';

const timeout = 0;

class Transition extends React.PureComponent {
	render() {
		const { children, location } = this.props;

		const RoutesContainer = posed.div({
			entering: {
				opacity: 0
			},
			enter: {
				opacity: 1,
				filter: `blur(0px)`,
				y: 0,
				delay: timeout,
				delayChildren: timeout
			},
			exiting: {
				y: 0
			},
			exit: {
				opacity: 0,
				filter: `blur(20px)`,
				y: 30
			}
		});

		return (
			<PoseGroup>
				<RoutesContainer key={location.pathname}>{children}</RoutesContainer>
			</PoseGroup>
		);
	}
}

export default Transition;
