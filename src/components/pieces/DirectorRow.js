import React from 'react';

export default class DirectorRow extends React.Component {
	render() {
		return (
			<tr className="animate">
				<td>{this.props.firstName}</td>
				<td>{this.props.lastName}</td>
				<td>{this.props.bio}</td>
				<td className="text-center">
					<div className="action-buttons">
						<a className="action"><i className="fa fa-search"></i></a>
						<a className="action"><i className="fa fa-pencil-square-o"></i></a>
						<a className="action"><i className="fa fa-times"></i></a>
					</div>
				</td>
			</tr>
		)
	}
}
