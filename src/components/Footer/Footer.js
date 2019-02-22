import React from 'react';
import { StaticQuery, graphql } from 'gatsby';

const footerQuery = graphql`
	query FooterQuery {
		site {
			siteMetadata {
				author
			}
		}
	}
`;

class Footer extends React.PureComponent {
	render() {
		return (
			<StaticQuery
				query={footerQuery}
				render={data => {
					return (
						<footer>
							<p>
								&copy; {new Date().getFullYear()}. {data.site.siteMetadata.author}. Built with
								{` `}
								<a href="https://www.gatsbyjs.org">Gatsby</a>
							</p>
						</footer>
					);
				}}
			/>
		);
	}
}

export default Footer;
