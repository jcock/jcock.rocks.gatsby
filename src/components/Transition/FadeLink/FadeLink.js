import React from 'react';
import { TimelineMax } from 'gsap';
import TransitionLink from 'gatsby-plugin-transition-link';

import config from '../../../constants/transition';

const fade = ({ node, direction }) => {
	const delay = direction === 'out' ? 0 : config.fade.durationOut;
	const duration = direction === 'out' ? config.fade.durationOut : config.fade.durationIn;
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

	return new TimelineMax()
		.set(node, holdPosition)
		.fromTo(node, duration, { opacity: !opacity }, { opacity })
		.delay(delay);
};

export default function Fade({ exit, entry, fade: removedProp, duration, ...props }) {
	return (
		<TransitionLink
			exit={{
				length: config.fade.durationOut,
				trigger: ({ node }) => fade({ node, direction: 'out' })
			}}
			entry={{
				length: config.fade.durationIn,
				trigger: ({ node }) => fade({ node, direction: 'in' })
			}}
			{...props}
		>
			{props.children}
		</TransitionLink>
	);
}
