import React from 'react';
import anime from 'animejs';
import { TransitionGroup, Transition } from 'react-transition-group';

import config from '../../../constants/transition';

import style from '../Transition.module.css';

class PageTransition extends React.PureComponent {
	render() {
		const { children, location, visible } = this.props;
		const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches === true;

		const ANIMATION_DONE_EVENT = 'animation::done';
		const triggerAnimationDoneEvent = node => node.dispatchEvent(new Event(ANIMATION_DONE_EVENT));
		const addEndListener = (node, done) => node.addEventListener(ANIMATION_DONE_EVENT, done);

		// const scrollTop = document.scrollingElement.scrollTop || document.body.scrollTop || window.pageYOffset;
		const scrollTop = () => window.scrollTo(0, 0);

		const motionPreference = {
			durationIn: prefersReducedMotion ? 0 : config.page.durationIn,
			durationOut: prefersReducedMotion ? 0 : config.page.durationOut
		};

		// Hold page in place for animating out, and handle page scrolling
		const holdIt = {
			height: '100vh',
			overflow: 'hidden',
			scrollTop
		};

		// Initial state of entering page
		const kickoff = {
			opacity: 0,
			zIndex: 1
		};

		// Animation configuration
		const fade = (node, animatingIn) => ({
			targets: node,
			opacity: animatingIn ? 1 : 0,
			easing: 'linear'
		});

		const enter = node => {
			anime
				.timeline({
					duration: motionPreference.durationIn,
					delay: motionPreference.durationOut
				})
				.set(node, kickoff)
				.add(fade(node, true));
		};

		const exit = node => {
			anime
				.timeline({ duration: motionPreference.durationOut })
				.set(node, holdIt)
				.add(fade(node, false))
				.add({ complete: () => triggerAnimationDoneEvent(node) });
		};

		return (
			<TransitionGroup component={null}>
				<Transition
					appear
					addEndListener={addEndListener}
					in={visible}
					key={location.pathname}
					onEnter={node => enter(node)}
					onExit={node => exit(node)}
				>
					<div id="top" className={style.transitionContainer}>
						{children}
					</div>
				</Transition>
			</TransitionGroup>
		);
	}
}

export default PageTransition;
