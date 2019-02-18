import React from 'react';

export default ({ children, href }) => (
	<a href={href} className="sr focusable">
		{children}
	</a>
);
