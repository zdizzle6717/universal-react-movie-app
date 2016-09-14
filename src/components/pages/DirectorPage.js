import React from 'react';
import { Link } from 'react-router';
import NotFoundPage from '../pages/NotFoundPage';
import directors from '../../data/directors';

export default class DirectorPage extends React.Component {
	constructor() {
		super();
	}

	componetDidMount() {
  	  document.title = "React Movie App | Director";
    }

  render() {
	  let routeId = this.props.params.directorId;
	  let director = directors.filter((director) => director.id == routeId)[0];
	  if (!director) {
		  return <NotFoundPage/>;
	  }
    return (
		<div className="row">
		    <h1>ReactJs, Hapi.js & PostgreSQL</h1>
		    <h3 className="push-bottom-2x">Dynamic Movie App: <strong>{director.firstName} {director.lastName}</strong></h3>
		    <h5>ID: {director.id}</h5>
		    <label><u>Bio</u></label>
		    <p className="text-justify">
		        {director.bio}
		    </p>
		</div>
    );
  }
}
