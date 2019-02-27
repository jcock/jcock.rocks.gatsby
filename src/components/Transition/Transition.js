import React from 'react';
import TransitionLink from 'gatsby-plugin-transition-link';
import { TimelineMax } from 'gsap';

class Transition extends React.PureComponent {
	render() {
		const length = 1;

		const fade = ({ node, direction }) => {
			const duration = direction === 'out' ? length / 2 : length;
			const opacity = direction === 'in' ? 1 : 0;
			const scrollTop = document.scrollingElement.scrollTop || document.body.scrollTop || window.pageYOffset;

			const holdPosition =
				direction === 'out'
					? {
							overflowY: 'hidden',
							height: '100vh',
							scrollTop
					  }
					: {};

			return new TimelineMax().set(node, holdPosition).fromTo(node, duration, { opacity: !opacity }, { opacity });
		};

		const { duration, children, ...props } = this.props;

		return (
			<>
				<TransitionLink
					exit={{
						length,
						trigger: ({ node }) => fade({ node, direction: 'out' })
					}}
					entry={{
						length,
						trigger: ({ node }) => fade({ node, direction: 'in' })
					}}
					{...props}
				>
					{children}
				</TransitionLink>
			</>
		);
	}
}

export default Transition;
