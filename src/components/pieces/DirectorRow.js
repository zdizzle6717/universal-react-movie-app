import React from 'react';
import { Link } from 'react-router';

export default class DirectorRow extends React.Component {
	render() {
		return (
			<tr className="animate">
				<td>{this.props.firstName}</td>
				<td>{this.props.lastName}</td>
				<td>{this.props.bio}</td>
				<td className="text-center">
					<div className="action-buttons">
						<Link key="director" to={`/directors/${this.props.id}`} className="action"><i className="fa fa-search"></i></Link>
						<Link key="directorEdit" to={`/directors/edit/${this.props.id}`} className="action"><i className="fa fa-pencil-square-o"></i></Link>
						<a className="action"><i className="fa fa-times"></i></a>
					</div>
				</td>
			</tr>
		)
	}
}
