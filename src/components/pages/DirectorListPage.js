import React from 'react';
import { Link } from 'react-router';

export default class DirectorListPage extends React.Component {

	componetDidMount() {
		document.title = "React Movie App | Directors";
	}

  render() {
    return (
		<div className="row">
		    <h1>ReactJs, Hapi.js, & PostgreSQL</h1>
		    <h3 className="push-bottom-2x">Dynamic Movie App: <strong>All Directors</strong></h3>
		    <div className="row">
		        <div className="small-12 medium-4 large-4 columns">
		            <button type="button" className="button small-12 large-6"><i className="fa fa-plus"></i> Add New Director</button>
		        </div>
		        <div className="small-12 medium-4 large-4 columns medium-offset-4 large-offset-4">
		            <input type="search" placeholder="Enter search terms..." />
		        </div>
		    </div>
		    <div className="small-12">
		        <table className="stack hover text-center">
		            <thead>
		                <tr>
		                    <th className="text-center" width="200">FirstName</th>
		                    <th className="text-center" width="150">LastName</th>
		                    <th className="text-center">Bio</th>
		                    <th className="text-center" width="150">View/Edit</th>
		                </tr>
		            </thead>
		            <tbody>
		                <tr className="animate">
		                    <td>firstName</td>
		                    <td>lastName</td>
		                    <td>bio</td>
		                    <td className="text-center">
		                        <div className="action-buttons">
		                            <a className="action"><i className="fa fa-search"></i></a>
		                            <a className="action"><i className="fa fa-pencil-square-o"></i></a>
		                            <a className="action"><i className="fa fa-times"></i></a>
		                        </div>
		                    </td>
		                </tr>
		            </tbody>
		        </table>
		    </div>
		</div>
    );
  }
}
