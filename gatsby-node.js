const path = require(`path`);
const { createFilePath } = require(`gatsby-source-filesystem`);

exports.onCreateNode = ({ node, actions: { createNodeField }, getNode }) => {
	if (node.internal.type === 'MarkdownRemark') {
		const slug = createFilePath({ node, getNode });

		createNodeField({
			node,
			name: 'slug',
			value: slug
		});
	}
};

exports.createPages = ({ graphql, actions }) => {
	const { createPage } = actions;

	return new Promise((resolve, reject) => {
		const templates = {
			page: path.resolve(`./src/templates/page.js`),
			post: path.resolve(`./src/templates/post.js`)
		};
		resolve(
			graphql(`
				{
					pages: allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
						edges {
							node {
								id
								fileAbsolutePath
								excerpt
								fields {
									slug
								}
								frontmatter {
									title
									description
								}
							}
						}
					}
				}
			`).then(result => {
				if (result.errors) {
					/* eslint no-console: "off" */
					console.log(result.errors);
					reject(result.errors);
				}

				// Create pages.
				const pages = result.data.pages.edges;
				pages.forEach(({ node: page }, index) => {
					const type = page.fileAbsolutePath.match(/\/posts\//) ? 'post' : 'page';

					const previous = index === pages.length - 1 ? null : pages[index + 1].node;
					const next = index === 0 ? null : pages[index - 1].node;

					createPage({
						path: page.fields.slug,
						component: templates[type],
						context: {
							slug: page.fields.slug,
							previous,
							next
						}
					});
				});
			})
		);
	});
};
