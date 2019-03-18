import React from 'react';

import { ReactComponent as JCock } from '../../assets/svg/jcock.svg';

import style from './Brand.module.css';

class Brand extends React.PureComponent {
	render() {
		return <JCock className={style.brand} role="img" aria-label="JCOCK" />;
	}
}

export default Brand;
