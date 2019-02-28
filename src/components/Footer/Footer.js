import React from 'react';
import { StaticQuery, graphql } from 'gatsby';

import style from './Footer.module.css';

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
						<footer className={style.footer}>
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
