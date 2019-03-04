import anime from 'animejs';

import config from '../../constants/transition';

let currentAnimation;

export default {
	animateIn(el) {
		if (currentAnimation) currentAnimation.pause();
		currentAnimation = anime.timeline().add({
			targets: el,
			translateX: [-1000, 0],
			opacity: [0, 1],
			duration: `${config.timeout}ms`,
			elasticity: 100
		});
		// anime({
		// 	targets: el,
		// 	opacity: ['0', '1'],
		// 	easing: 'easeInOutQuad',
		// 	duration: `${config.timeout}ms`
		// });
	},

	animateOut(el) {
		if (currentAnimation) currentAnimation.pause();
		currentAnimation = anime.timeline().add({
			targets: el,
			duration: `${config.timeout}ms`,
			opacity: 0,
			translateY: -30,
			easing: 'easeInOutSine'
		});
		// anime({
		// 	targets: el,
		// 	opacity: ['1', '0'],
		// 	easing: 'easeInOutQuad',
		// 	duration: `${config.timeout}ms`
		// });
	}
};
