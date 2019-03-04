import React from 'react';
import TransitionLink, { TransitionPortal } from 'gatsby-plugin-transition-link';
import { TimelineMax } from 'gsap';

import config from '../../constants/transition';

class GlitchLink extends React.PureComponent {
	constructor(props) {
		super(props);

		this.svg = React.createRef();
	}

	render() {
		const turbulence = ({ node, props: { length: seconds }, direction }) => {
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

			const wait = seconds / 6;
			const half = (seconds - wait) / 2;

			return new TimelineMax()
				.set(node, { filter: 'url(#noise)' }, holdPosition)
				.fromTo(
					this.svg,
					half,
					{
						attr: {
							baseFrequency: '0 0.000001'
						}
					},
					{
						attr: {
							baseFrequency: '0 0.2'
						}
					}
				)
				.fromTo(node, wait, { opacity: !opacity }, { opacity }, `+=${wait}`);
		};

		const length = this.props.duration || config.glitch.timeout;
		const { exit: removedExit, entry: removedEntry, ...props } = this.props;
		return (
			<>
				<TransitionLink
					exit={{
						length,
						trigger: ({ exit, node }) => turbulence({ props: exit, node, direction: 'out' })
					}}
					entry={{
						delay: length / 2,
						length: config.fade.timeout,
						trigger: ({ exit, node }) => turbulence({ props: exit, node, direction: 'in' })
					}}
					{...props}
				>
					{this.props.children}
				</TransitionLink>

				<TransitionPortal>
					<svg viewBox="0 0 180 100">
						<filter id="noise" x="0%" y="0%" width="100%" height="100%">
							<feTurbulence
								ref={n => (this.svg = n)}
								type="fractalNoise"
								baseFrequency="0 0.000001"
								result="NOISE"
								numOctaves="2"
							/>
							<feDisplacementMap in="SourceGraphic" in2="NOISE" scale="30" xChannelSelector="R" yChannelSelector="R" />
						</filter>
					</svg>
				</TransitionPortal>
			</>
		);
	}
}

export default GlitchLink;
