import React from 'react';

export default class IndexPage extends React.Component {

  componetDidMount() {
	  document.title = "React Movie App | Home";
  }

  render() {
    return (
		<div className="row">
		    <h1>ReactJs, Hapi.js, PostgreSQL</h1>
		    <h5 className="push-bottom-4x text-justify">This <strong>S</strong>ingle <strong>P</strong>age <strong>A</strong>pplication demonstrates the efficiency of working with an AngularJS frontend and a <strong>REST</strong>ful API.
		    The site is hosted on an <strong>A</strong>mazon <strong>W</strong>eb <strong>S</strong>ervices EC2 server running <strong>nginx</strong> on an Ubuntu 14.0.4 OS. This particular stack utilizes <strong>hapi.js</strong> with a <strong>postgreSQL</strong> database
		     for an effectively scaleable <strong>API</strong>.  The front-end is built with <strong>AngularJS</strong> 1.x granting the benefit of a quick frontend User Interface and a smooth User Experience. In retrospect, I would like to
		 research different options for an ORM to combine with HapiJS.  Looking forward, I can see a variety of benefits from Angular2 or ReactJS for a more scaleable frontend.</h5>
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
		            This app demonstrates a basic relation of data, in this case: Movies to Directors.  The same type of relational data is present in all data centric applications,
		            and usually with much more complexity.  This is just one piece of a bigger picture, although building the puzzle requires first understanding the individual elements of it's design.
		            I hope this helps to convey the versatility, effeciency, and application of the technologies and the benefits of their use in a development and production environment.
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
		                <tr className="animate">
		                    <td>title</td>
		                    <td>year</td>
		                    <td>synopsis</td>
		                    <td>director</td>
		                    <td className="text-center">
		                        <div className="action-buttons">
		                            <a className="action"><i className="fa fa-search"></i></a>
		                            <a className="action"><i className="fa fa-pencil-square-o"></i></a>
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
