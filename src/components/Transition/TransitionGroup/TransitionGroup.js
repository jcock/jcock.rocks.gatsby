import React from 'react';
import anime from 'animejs';
import { TransitionGroup, Transition as ReactTransition } from 'react-transition-group';

import config from '../../../constants/transition';

import style from '../Transition.module.css';

class Transition extends React.PureComponent {
	render() {
		const { children, location, visible } = this.props;
		const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches === true;

		const ANIMATION_DONE_EVENT = 'animation::done';
		const triggerAnimationDoneEvent = node => node.dispatchEvent(new Event(ANIMATION_DONE_EVENT));
		const addEndListener = (node, done) => node.addEventListener(ANIMATION_DONE_EVENT, done, false);

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
		const fade = (page, animatingIn) => ({
			targets: page,
			opacity: animatingIn ? 1 : 0,
			easing: 'linear'
		});

		const enter = page => {
			anime
				.timeline({
					duration: motionPreference.durationIn,
					delay: motionPreference.durationOut
				})
				.set(page, kickoff)
				.add(fade(page, true));
		};

		const exit = page => {
			anime
				.timeline({ duration: motionPreference.durationOut })
				.set(page, holdIt)
				.add(fade(page, false))
				.add({ complete: () => triggerAnimationDoneEvent(page) });
		};

		return (
			<TransitionGroup component={null}>
				<ReactTransition
					appear
					addEndListener={addEndListener}
					in={visible}
					key={location.pathname}
					onEnter={enter}
					onExit={exit}
					timeout={{
						enter: motionPreference.durationIn
					}}
				>
					<div id="top" className={style.transitionContainer}>
						{children}
					</div>
				</ReactTransition>
			</TransitionGroup>
		);
	}
}

export default Transition;
