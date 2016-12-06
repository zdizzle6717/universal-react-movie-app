'use strict';

import React from 'react';
import classNames from 'classnames';
import Animation from 'react-addons-css-transition-group';

export default class Modal extends React.Component {
	// TODO: Get the animation to work, try making modals an array

	constructor(props, context) {
		super(props, context);
	}

    render() {
		return (
			<Animation transitionName="fade" className="modal-animation-wrapper" transitionAppear={true} transitionAppearTimeout={500} transitionEnter={true} transitionEnterTimeout={500} transitionLeave={true} transitionLeaveTimeout={500}>
				{
					this.props.modalIsOpen &&
					<div className="modal-container" key={this.props.name}>
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
						<div className="modal-backdrop" onClick={this.props.handleClose}></div>
					</div>
				}
			</Animation>
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
