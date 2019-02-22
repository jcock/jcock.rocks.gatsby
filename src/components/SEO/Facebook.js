import React from 'react';
import Helmet from 'react-helmet';

class Facebook extends React.PureComponent {
	render() {
		const {
			title = null,
			description = null,
			type = null,
			pageUrl = null,
			image = null,
			imageAlt = null,
			appID = null
		} = this.props;

		return (
			<Helmet>
				{title && <meta property="og:title" content={title} />}
				{description && <meta property="og:description" content={description} />}
				{type && <meta property="og:type" content={type} />}
				{pageUrl && <meta property="og:url" content={pageUrl} />}
				{image && <meta property="og:image" content={image} />}
				{imageAlt && <meta property="og:image:alt" content={imageAlt} />}
				{appID && <meta property="fb:app_id" content={appID} />}
			</Helmet>
		);
	}
}

export default Facebook;
