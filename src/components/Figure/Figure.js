import React from 'react';
import Img from 'gatsby-image';

import style from './Figure.module.css';

class Figure extends React.PureComponent {
	render() {
		const { fluid, alt, caption, type } = this.props;

		return (
			<figure className={type ? style[type] : style.figure}>
				<Img fluid={fluid} alt={alt} fadeIn />
				{caption && <figcaption>{caption}</figcaption>}
			</figure>
		);
	}
}

export default Figure;
