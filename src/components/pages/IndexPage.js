import React from 'react';
import MovieRow from '../pieces/MovieRow';
import movies from '../../data/movies';

export default class IndexPage extends React.Component {
	constructor() {
		super();
	}

  componentDidMount() {
	  document.title = "React Movie App | Home";
  }

  render() {
    return (
		<div className="row">
		    <h1>ReactJs, Hapi.js, PostgreSQL</h1>
		    <h5 className="push-bottom-4x text-justify">This <strong>S</strong>ingle <strong>P</strong>age <strong>A</strong>pplication demonstrates the rapid speed of a ReactJs frontend and a <strong>REST</strong>ful API.
		    The site is hosted on an <strong>A</strong>mazon <strong>W</strong>eb <strong>S</strong>ervices EC2 server running <strong>nginx</strong> on an Ubuntu 16.0.4 OS. This particular stack utilizes <strong>hapi.js</strong> with a <strong>postgreSQL</strong> database
		     for an effectively scaleable, team-compatible <strong>API</strong>.  The front-end is rendered on the server side allowing for unique meta data respective to each page and excellent SEO.</h5>
	 <h3 className="push-bottom-2x">Dynamic Movie App</h3>
		    <div className="row">
		        <div className="small-12 medium-4 large-4 columns">
		            <button type="button" className="button small-12 large-6"><i className="fa fa-plus"></i> Add New Movie</button>
		        </div>
		        <div className="small-12 medium-4 large-4 columns medium-offset-4 large-offset-4 text-right">
		            <button type="button" className="button small-12 large-6"><i className="fa fa-plus"></i> Add New Director</button>
		        </div>
		    </div>
		    <div className="small-12">
		        <p>
		            This app demonstrates a basic one-many relation of data, in this case: Movies to Directors.  The same type of relational data is present in all data centric applications,
		            though usually with a bit more layers.  This is just one piece of a bigger picture.  It makes for a great boiler plate and covers the more complex features of large-scale applications including SEO,
					e-mail confirmation, file upload, authentication, and authorization.  I hope this helps to convey the versatility, effeciency, and application of the technologies and the benefits of their use in a development and production environment.
		        </p>
		    </div>
		    <div className="small-12">
		        <table className="stack hover text-center">
		            <thead>
		                <tr>
		                    <th className="text-center" width="200">Title</th>
		                    <th className="text-center" width="150">Year</th>
		                    <th className="text-center">Synopsis</th>
		                    <th className="text-center" width="250">Directed By</th>
		                    <th className="text-center" width="150">View/Edit</th>
		                </tr>
		            </thead>
		            <tbody>
						{movies.map((movie, i) =>
  						  <MovieRow key={i} {...movie} synopsis={movie.synopsis.substring(0, 70) + '...'} fullName={movie.Director.firstName + ' ' + movie.Director.lastName}></MovieRow>
  					  )}
		            </tbody>
		        </table>
		    </div>
		</div>
    );
  }
}
