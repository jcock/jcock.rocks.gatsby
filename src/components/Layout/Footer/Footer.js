import React from 'react';
import { StaticQuery, graphql } from 'gatsby';

import ScrollTopLink from '../../Navigation/ScrollTopLink';

import style from './Footer.module.css';

const footerQuery = graphql`
	query FooterQuery {
		site {
			siteMetadata {
				author {
					name
				}
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
							<ScrollTopLink to="#top" />
							<p>
								&copy; {new Date().getFullYear()}. {data.site.siteMetadata.author.name}. Built with
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
