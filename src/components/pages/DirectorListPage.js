import React from 'react';
import { Link } from 'react-router';
import DirectorRow from '../pieces/DirectorRow';
import directors from '../../data/directors';

export default class DirectorListPage extends React.Component {
	constructor() {
		super();
	}

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
						{directors.map((director, i) =>
  						  <DirectorRow key={i} {...director} bio={director.bio.substring(0, 70) + '...'}></DirectorRow>
  					  )}
		            </tbody>
		        </table>
		    </div>
		</div>
    );
  }
}
