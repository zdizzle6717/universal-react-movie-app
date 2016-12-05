'use strict';

import React from 'react';
import classNames from 'classnames';

export default class Loader extends React.Component {
	constructor(props, context) {
		super(props, context);

	}

    render() {
		let loaderClasses = classNames({
			'loader-container': true,
			'show': this.props.loading
		});

	    return (
			<div className={loaderClasses}>
				<div className="loader">
					<div></div>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
				</div>
			</div>
	    );
    }
}
