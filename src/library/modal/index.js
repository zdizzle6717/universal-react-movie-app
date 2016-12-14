'use strict';

import React from 'react';
import classNames from 'classnames';
import Animation from 'react-addons-css-transition-group';

export default class Modal extends React.Component {
	constructor(props, context) {
		super(props, context);
	}

    render() {
		let containerClasses = classNames({
			'modal-container': true,
			'show': this.props.modalIsOpen
		})
		let backdropClasses = classNames({
			'modal-backdrop': true,
			'show': this.props.modalIsOpen
		})
		return (
			<div className={containerClasses} key={this.props.name}>
				<Animation transitionName="slide-z" className="modal-animation-wrapper" transitionAppear={true} transitionAppearTimeout={500} transitionEnter={true} transitionEnterTimeout={500} transitionLeave={true} transitionLeaveTimeout={500}>
					{
						this.props.modalIsOpen &&
					<div className="modal">
						<div className="modal-content">
							<div className="panel">
								<div className="panel-title primary">
									{this.props.title}
								</div>
								<div className="panel-content">
									{this.props.children}
								</div>
								<div className="panel-footer text-right">
									<button type="button collapse" className="button alert" onClick={this.props.handleClose}>Cancel</button>
									<button type="button collapse" className="button success" onClick={this.props.handleSubmit}>Submit</button>
								</div>
							</div>
						</div>
					</div>
				}
				</Animation>
				<div className={backdropClasses} onClick={this.props.handleClose}></div>
			</div>
	    );
    }
}

Modal.propTypes = {
	name: React.PropTypes.string.isRequired,
	title: React.PropTypes.string.isRequired,
	handleClose: React.PropTypes.func.isRequired,
	handleSubmit: React.PropTypes.func.isRequired,
	modalIsOpen: React.PropTypes.bool.isRequired
}
