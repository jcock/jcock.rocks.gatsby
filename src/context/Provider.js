import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from './createContext';

class InternalProvider extends React.PureComponent {
	// state = {
	// 	theme: 'light',
	// 	updateContext: obj => this.setState(obj)
	// }

	constructor() {
		super();
		this.state = {
			theme: 'light'
		};
		this.toggleTheme = this.toggleTheme.bind(this);
	}

	toggleTheme() {
		this.setState(prevState => ({
			theme: prevState.theme === 'light' ? 'dark' : 'light'
		}));
	}

	render() {
		const props = {
			toggleTheme: this.toggleTheme,
			...this.state
		};

		return <Provider value={props}>{this.props.children}</Provider>;
	}
}

InternalProvider.propTypes = {
	children: PropTypes.node.isRequired
};

export default InternalProvider;
