import React from 'react';
import PropTypes from 'prop-types';

let io;
const listeners = [];

function getIO(rootMargin = '-50px') {
	if (typeof io === 'undefined' && typeof window !== 'undefined' && window.IntersectionObserver) {
		io = new window.IntersectionObserver(
			entries => {
				entries.forEach(entry => {
					listeners.forEach(l => {
						if (l[0] === entry.target) {
							// Edge doesn't currently support isIntersecting, so also test for an intersectionRatio > 0
							if (entry.isIntersecting || entry.intersectionRatio > 0) {
								// io.unobserve(l[0]);
								l[1](true);
							} else if (!entry.isIntersecting || entry.intersectionRatio <= 0) {
								l[1](false);
							}
						}
					});
				});
			},
			{ rootMargin }
		);
	}

	return io;
}

const listenToIntersections = (el, cb, rm) => {
	// eslint-disable-next-line no-shadow
	const io = getIO(rm);
	io.observe(el);
	listeners.push([el, cb]);
	return io;
};

class IO extends React.PureComponent {
	constructor() {
		super();

		// Always not visible while server rendering.
		this.state = {
			isVisible: false,
			hasBeenVisible: false
		};
	}

	async componentDidMount() {
		// Default values
		let isVisible = true;
		let hasBeenVisible = true;

		// Check if browser (now) supports IntersectionObserver
		if (typeof window !== 'undefined' && window.IntersectionObserver) {
			isVisible = false;
			hasBeenVisible = false;
		}

		this.setState(
			{
				isVisible,
				hasBeenVisible
			},
			this.listenToIntersections
		);
	}

	listenToIntersections = () => {
    this.io = listenToIntersections(
      this.ref,
      isVisible => {
        this.setState(state => {
          let newState = {};

          if (!state.hasBeenVisible && isVisible) {
            newState = { hasBeenVisible: true };
          }

          return { isVisible, ...newState };
        });
      },
      this.props.rootMargin
    );
  };

  handleRef = ref => {
    if (ref) {
      this.ref = ref;
    }
  };

	componentWillUnmount() {
		this.io.disconnect();
	}

	render() {
		const { isVisible, hasBeenVisible } = this.state;

		return <div ref={this.handleRef}>{this.props.children({ isVisible, hasBeenVisible })}</div>;
	}
}

IO.propTypes = {
	children: PropTypes.func.isRequired,
	rootMargin: PropTypes.string,
};

export default IO;
