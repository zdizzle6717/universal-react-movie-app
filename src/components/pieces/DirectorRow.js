import React from 'react';
import { Link } from 'react-router';
import AccessControl from '../../library/authentication/components/AccessControl';

export default class DirectorRow extends React.Component {
	render() {
		return (
			<tr className="animate">
				<td>{this.props.firstName}</td>
				<td>{this.props.lastName}</td>
				<td>{this.props.bio}</td>
				<td className="text-center">
					<div className="action-buttons">
						<Link key="director" to={`/directors/view/${this.props.id}`} className="action"><i className="fa fa-search"></i></Link>
						<AccessControl access={['directorAdmin', 'siteAdmin']}>
							<Link key="directorEdit" to={`/directors/edit/${this.props.id}`} className="action"><i className="fa fa-pencil-square-o"></i></Link>
						</AccessControl>
						<AccessControl access={['directorAdmin', 'siteAdmin']}>
							<a className="action"><i className="fa fa-times" onClick={this.props.removeDirector}></i></a>
						</AccessControl>
					</div>
				</td>
			</tr>
		)
	}
}
