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
			// position: 'relative',
			// zIndex: 100,
			// width: '100%',
			height: '100vh',
			overflow: 'hidden',
			scrollTop
		};

		const animate = (container, animatingIn) => ({
			targets: container,
			duration: animatingIn ? config.anifade.durationIn : config.anifade.durationOut,
			delay: animatingIn ? config.anifade.durationOut : 0,
			opacity: animatingIn ? { value: [0, 1], easing: 'linear' } : { value: [1, 0], easing: 'linear' },
			// scale: animatingIn ? [0.5, 1] : [1, 0.5],
			easing: 'spring(1, 150, 10)',
			complete: !animatingIn && (() => triggerAnimationDoneEvent(container))
		});

		const enter = container => {
			anime
				.timeline()
				.add(animate(container, true))
				.set({ zIndex: 100 });
		};

		const exit = container => {
			anime
				.timeline()
				.set(container, holdIt)
				.add(animate(container, false));
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
						enter: config.anifade.durationIn
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
