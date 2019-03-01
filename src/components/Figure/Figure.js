import React from 'react';
import Img from 'gatsby-image';
import PropTypes from 'prop-types';

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

Figure.defaultProps = {
	caption: null,
	type: null
};

Figure.propTypes = {
	alt: PropTypes.string.isRequired,
	caption: PropTypes.string,
	type: PropTypes.string
};

export default Figure;
