import React from 'react';
import anime from 'animejs';
import { TransitionGroup, Transition as ReactTransition } from 'react-transition-group';

import config from '../../constants/transition';

import style from './Transition.module.css';

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

		const animate = (page, animatingIn) => ({
			targets: page,
			duration: animatingIn ? config.page.durationIn : config.page.durationOut,
			delay: animatingIn ? config.page.durationOut : 0,
			opacity: animatingIn ? [0, 1] : [1, 0],
			easing: 'linear',
			complete: !animatingIn && (() => triggerAnimationDoneEvent(page))
		});

		const enter = page => {
			anime
				.timeline()
				.set(page, { zIndex: 1 })
				.add(animate(page, true));
		};

		const exit = page => {
			anime
				.timeline()
				.set(page, holdIt)
				.add(animate(page, false));
		};

		return (
			<TransitionGroup component={null}>
				<ReactTransition
					appear
					addEndListener={addEndListener}
					mountOnEnter
					unmountOnExit
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
