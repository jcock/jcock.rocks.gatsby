import React from 'react';
import anime from 'animejs';
import { TransitionGroup, Transition as ReactTransition } from 'react-transition-group';

import config from '../../../constants/transition';

import style from '../Transition.module.css';

class Transition extends React.PureComponent {
	render() {
		const { children, location, visible } = this.props;
		const ANIMATION_DONE_EVENT = 'animation::done';
		const triggerAnimationDoneEvent = node => node.dispatchEvent(new Event(ANIMATION_DONE_EVENT));
		const addEndListener = (node, done) => node.addEventListener(ANIMATION_DONE_EVENT, done, false);

		// const scrollTop = document.scrollingElement.scrollTop || document.body.scrollTop || window.pageYOffset;
		const scrollTop = () => window.scrollTo(0, 0);

		const holdIt = {
			height: '100vh',
			overflow: 'hidden',
			scrollTop
		};

		const kickoff = {
			opacity: 0,
			zIndex: 1
		};

		const fade = (page, animatingIn) => ({
			targets: page,
			opacity: animatingIn ? 1 : 0,
			easing: 'linear'
		});

		const enter = page => {
			anime
				.timeline({
					duration: config.page.durationIn,
					delay: config.page.durationOut
				})
				.set(page, kickoff)
				.add(fade(page, true));
		};

		const exit = page => {
			anime
				.timeline({ duration: config.page.durationOut })
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
						enter: config.page.durationIn
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
