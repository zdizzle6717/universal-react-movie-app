import React from 'react';
import { Link, browserHistory } from 'react-router';
import NotFoundPage from '../pages/NotFoundPage';
import DirectorActions from '../../actions/DirectorActions';
import DirectorStore from '../../stores/DirectorStore';

export default class DirectorEditPage extends React.Component {
    constructor() {
        super();

        this.state = {
            director: {},
            newDirector: false
        }

		this.onChange = this.onChange.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillMount() {
		DirectorStore.addChangeListener(this.onChange);
	}

	componentDidMount() {
        document.title = "React Movie App | Edit Director";
		if (this.props.params.directorId) {
			DirectorActions.getDirector(this.props.params.directorId);
		} else {
			this.setState({
				newDirector: true
			});
		}
    }

    componentWillUnmount() {
		DirectorStore.removeChangeListener(this.onChange);
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.params.directorId) {
			DirectorActions.getDirector(nextProps.params.directorId)
		}
    }

	onChange() {
		this.setState({
			director: DirectorStore.getDirector(this.props.params.directorId)
		})
	}

	handleInputChange(e) {
		let director = this.state.director;
		director[e.target.name] = e.target.value;
		this.setState({
			director: director
		})
	}

	handleSubmit(e) {
		e.preventDefault();
		if (this.state.newDirector) {
			DirectorActions.createDirector(this.state.director).then(() => {
				browserHistory.push('/directors/edit/' + this.state.director.id);
			});
		} else {
			DirectorActions.updateDirector(this.state.director.id, this.state.director).then(() => {
				browserHistory.push('/directors');
			});
		}
	}

	render() {
		return (
			<div className="row">
				<h1>ReactJs, Hapi.js & PostgreSQL</h1>
				<h3 className="push-bottom-2x">Dynamic Movie App:
					<strong className="animate"> {this.state.newDirector ? 'Add New Director' : `Edit Director (ID: ${this.state.director.id})`}</strong>
				</h3>

				<form name="directorForm" noValidate>
					<div className="row">
						<div className="medium-6 columns">
							<label className="required">First Name
								<input type="text" name="firstName" value={this.state.director.firstName} onChange={this.handleInputChange} placeholder="" required />
							</label>
						</div>
						<div className="medium-6 columns">
							<label className="required">Last Name
								<input type="text" name="lastName" value={this.state.director.lastName} onChange={this.handleInputChange} placeholder="" required />
							</label>
						</div>
					</div>
					<div className="row">
						<div className="medium-12 columns">
							<label className="required">Bio
								<textarea placeholder="" name="bio" value={this.state.director.bio} onChange={this.handleInputChange} rows="2" required></textarea>
							</label>
						</div>
					</div>
					<div className="row text-right">
						<div className="medium-12 columns">
							<div className="button animate" type="button" onClick={this.handleSubmit}>{this.state.newDirector ? 'Add New Director' : 'Update Director'}</div>
						</div>
					</div>
				</form>
			</div>
		);
	}
}
