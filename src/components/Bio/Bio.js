import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';

import style from './Bio.module.css';

const bioQuery = graphql`
	query BioQuery {
		avatar: file(relativePath: { regex: "/profile-pic.jpg/" }) {
			childImageSharp {
				fixed(width: 50, height: 50) {
					...GatsbyImageSharpFixed_withWebp_tracedSVG
				}
			}
		}
		site {
			siteMetadata {
				author {
					name
					bio
				}
				social {
					twitter
				}
			}
		}
	}
`;

class Bio extends React.PureComponent {
	render() {
		return (
			<StaticQuery
				query={bioQuery}
				render={data => {
					const { author, social } = data.site.siteMetadata;
					return (
						<div className={style.bio}>
							<Img className={style.avatar} fixed={data.avatar.childImageSharp.fixed} alt={author.name} fadeIn />
							<p>
								Written by <strong>{author.name}</strong>.{` `}
								{author.bio} {` `}
								<a href={`https://twitter.com/${social.twitter}`}>Follow me on Twitter</a>.
							</p>
						</div>
					);
				}}
			/>
		);
	}
}

export default Bio;
