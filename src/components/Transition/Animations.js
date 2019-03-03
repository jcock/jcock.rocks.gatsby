import anime from 'animejs';

export default {
	animateIn(el) {
		anime({
			targets: el,
			opacity: 1,
			translateX: 0,
			easing: 'easeInOutQuad'
		});
	},

	animateOut(el) {
		anime({
			targets: el,
			opacity: 0,
			translateX: 250,
			easing: 'easeInOutQuad'
		});
	}
};
