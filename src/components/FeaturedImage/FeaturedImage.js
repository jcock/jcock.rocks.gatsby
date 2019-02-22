import React from 'react';
import Img from 'gatsby-image';

class FeaturedImage extends React.PureComponent {
	render() {
		const { fluid, alt } = this.props;

		return <Img fluid={fluid} alt={alt} fadeIn />;
	}
}

export default FeaturedImage;
