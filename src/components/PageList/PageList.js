import React from 'react';
import { Link } from 'gatsby';

class PageList extends React.PureComponent {
	getPageList() {
		const pageList = [];
		this.props.postEdges.forEach(postEdge => {
			pageList.push({
				path: postEdge.node.fields.slug,
				title: postEdge.node.frontmatter.title || postEdge.node.fields.slug,
				date: postEdge.node.frontmatter.date,
				excerpt: postEdge.node.excerpt
			});
		});
		return pageList;
	}

	render() {
		const pageList = this.getPageList();
		return (
			<ol reversed>
				{pageList.map(node => (
					<li key={node.path}>
						<h2>
							<Link to={node.path}>{node.title}</Link>
						</h2>
						<p>{node.date}</p>
						<p dangerouslySetInnerHTML={{ __html: node.excerpt }} />
					</li>
				))}
			</ol>
		);
	}
}

export default PageList;
