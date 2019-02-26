import React from 'react';
import posed from 'react-pose';

import style from './Transition.module.css';

const tDuration = 600;
const tEase = `easeInOut`;

class Loading extends React.PureComponent {
	render() {
		const LoadingBar = posed.div({
			// enter: {
			// 	scaleX: 1,
			// 	transition: {
			// 		scaleX: {
			// 			type: 'keyframes',
			// 			values: [0, 1, 0]
			// 		},
			// 		transformOrigin: {
			// 			type: 'keyframes',
			// 			values: [0, 0, `100%`]
			// 		}
			// 	}
			// },
			exit: {
				scaleX: 0,
				transformOrigin: `100%`,
				transition: {
					duration: tDuration,
					ease: tEase,
					scaleX: {
						type: 'keyframes',
						values: [0, 1, 0]
					}
				}
			}
		});

		return <LoadingBar initialPose={this.init} className={style.loadingBar} />;
	}
}

export default Loading;
