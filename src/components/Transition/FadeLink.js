import React from 'react';
import { TimelineMax } from 'gsap';
import TransitionLink from 'gatsby-plugin-transition-link';

import config from '../../constants/transition';

const fade = ({ node, direction }) => {
	const duration = config.fade.timeout;
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

export default function Fade({ exit, entry, fade: removedProp, duration, ...props }) {
	return (
		<TransitionLink
			exit={{
				length: config.fade.timeout,
				trigger: ({ node }) => fade({ node, direction: 'out' })
			}}
			entry={{
				length: config.fade.timeout,
				trigger: ({ node }) => fade({ node, direction: 'in' })
			}}
			{...props}
		>
			{props.children}
		</TransitionLink>
	);
}
