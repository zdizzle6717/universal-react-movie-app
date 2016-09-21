import React from 'react';
import { Link } from 'react-router';
import { createStore } from 'redux';
import NotFoundPage from '../pages/NotFoundPage';
import directorService from '../../services/directorService';

export default class DirectorEditPage extends React.Component {
    constructor() {
        super();

        this.state = {
            director: {},
            newDirector: false
        }

        this.getDirector = this.getDirector.bind(this);
    }

    componentWillMount() {
	    let routeId = this.props.params.directorId;
	    let director = {};
	    this.getDirector(routeId)
	        .then(function(response) {
	                this.setState({
	                    director: response
	                });
	            }.bind(this))
	        .catch(function(response) {
	            this.setState({
	                newDirector: true
	            });
	        }.bind(this));
	}

	componentDidMount() {
	    document.title = "React Movie App | Director Edit";
	}

	getDirector(id) {
	    return directorService.get(id);
	}

	handleInputChange(name, e) {
	    let newObj = this.state.director;
	    newObj[name] = e.target.value;
	    this.setState({
	        director: newObj
	    });
	}

	render() {
		return (
			<div className="row">
				<h1>ReactJs, Hapi.js & PostgreSQL</h1>
				<h3 className="push-bottom-2x">Dynamic Movie App:
					<strong className="animate"> {this.state.newDirector ? 'Add New Director' : `Edit Director (ID: ${this.state.director.id})`}</strong>
				</h3>

				<form name="directorForm" novalidate>
					<div className="row">
						<div className="medium-6 columns">
							<label className="required">First Name
								<input type="text" value={this.state.director.firstName} onChange={this.handleInputChange.bind(this, 'firstName')} placeholder="" required />
							</label>
						</div>
						<div className="medium-6 columns">
							<label className="required">Last Name
								<input type="text" value={this.state.director.lastName} onChange={this.handleInputChange.bind(this, 'lastName')} placeholder="" required />
							</label>
						</div>
					</div>
					<div className="row">
						<div className="medium-12 columns">
							<label className="required">Bio
								<textarea placeholder="" value={this.state.director.bio} onChange={this.handleInputChange.bind(this, 'bio')} rows="2" required></textarea>
							</label>
						</div>
					</div>
					<div className="row text-right">
						<div className="medium-12 columns">
							<div className="button animate" type="button">{this.state.newDirector ? 'Add New Director' : 'Update Director'}</div>
						</div>
					</div>
				</form>
			</div>
		);
	}
}
