import React from 'react';
import { Link } from 'gatsby';

export default ({ prevLocation, prevTitle, nextLocation, nextTitle }) => (
	<ul>
		{prevTitle && (
			<li>
				<Link to={prevLocation} rel="prev">
					← {prevTitle}
				</Link>
			</li>
		)}
		{nextTitle && (
			<li>
				<Link to={nextLocation} rel="next">
					{nextTitle} →
				</Link>
			</li>
		)}
	</ul>
);
