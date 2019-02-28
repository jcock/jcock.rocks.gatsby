import React from 'react';
import { Transition, animated } from 'react-spring/renderprops';

const timeout = 300;
const duration = 600;
const ease = `easeInOut`;

class PageTransition extends React.PureComponent {
	render() {
		const { children, location } = this.props;

		return (
			<Transition
				native
				items={location.pathname}
				from={{ opacity: 0 }}
				enter={{ opacity: 1 }}
				leave={{ opacity: 0 }}
				unique
			>
				{() => props => <animated.div style={props}>{children}</animated.div>}
			</Transition>
		);
	}
}

export default PageTransition;
