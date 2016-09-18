import React from 'react';
import { Link } from 'react-router';
import NotFoundPage from '../pages/NotFoundPage';
import directors from '../../data/directors';

export default class DirectorEditPage extends React.Component {
	constructor() {
		super();
	}

	componentDidMount() {
  	  document.title = "React Movie App | Director Edit";
    }

  render() {
	  let newDirector = false;
	  let routeId = this.props.params.directorId;
	  let director = directors.filter((director) => director.id == routeId)[0];
	  if (!director) {
		  director = {};
		  newDirector = true;
	  }
    return (
		<div className="row">
		    <h1>ReactJs, Hapi.js & PostgreSQL</h1>
		    <h3 className="push-bottom-2x">Dynamic Movie App:
		        <strong className="animate">Add New Director</strong>
		        <strong className="animate">Edit Director (ID: {director.id})</strong>
		    </h3>

		    <form name="directorForm" novalidate>
		        <div className="row">
		            <div className="medium-6 columns">
		                <label className="required">First Name
		                    <input type="text" value={director.firstName} placeholder="" required />
		                </label>
		            </div>
		            <div className="medium-6 columns">
		                <label className="required">Last Name
		                    <input type="text" value={director.lastName} placeholder="" required />
		                </label>
		            </div>
		        </div>
		        <div className="row">
		            <div className="medium-12 columns">
		                <label className="required">Bio
		                    <textarea placeholder="" value={director.bio} rows="2" required></textarea>
		                </label>
		            </div>
		        </div>
		        <div className="row text-right">
		            <div className="medium-12 columns">
		                <div className="button animate" type="button">Add New Director</div>
		                <div className="button animate" type="button">Update Director</div>
		            </div>
		        </div>
		    </form>
		</div>
    );
  }
}
