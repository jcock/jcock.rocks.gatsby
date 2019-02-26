import React from 'react';
import { Link } from 'gatsby';
import posed from 'react-pose';

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

		const ListContainer = posed.ol({
			enter: { staggerChildren: 50 },
			exit: { staggerChildren: 20, staggerDirection: -1 }
		});

		const Item = posed.li({
			enter: { y: 0, opacity: 1 },
			exit: { y: 50, opacity: 0 }
		});

		return (
			<ListContainer reversed>
				{pageList.map(node => (
					<Item key={node.path}>
						<h2>
							<Link to={node.path}>{node.title}</Link>
						</h2>
						<p>{node.date}</p>
						<p dangerouslySetInnerHTML={{ __html: node.excerpt }} />
					</Item>
				))}
			</ListContainer>
		);
	}
}

export default PageList;
