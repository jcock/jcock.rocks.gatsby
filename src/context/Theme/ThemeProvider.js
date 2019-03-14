import React from 'react';
import { ThemeContext } from './theme-context';

const supportsDarkMode = () => window.matchMedia('(prefers-color-scheme: dark)').matches === true;

class ThemeProvider extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			dark: false
		};

		this.toggleTheme = () => {
			const dark = !this.state.dark; // eslint-disable-line react/no-access-state-in-setstate
			localStorage.setItem('dark', JSON.stringify(dark));
			this.setState({ dark });
		};
	}

	componentDidMount() {
		// Getting dark mode value from localStorage!
		const lsDark = JSON.parse(localStorage.getItem('dark'));
		if (lsDark) {
			this.setState({ dark: lsDark });
		} else if (supportsDarkMode()) {
			this.setState({ dark: true });
		}
	}

	render() {
		const { children } = this.props;
		const { dark } = this.state;
		return (
			<ThemeContext.Provider
				value={{
					dark,
					toggleTheme: this.toggleTheme
				}}
			>
				{children}
			</ThemeContext.Provider>
		);
	}
}

export default ThemeProvider;
