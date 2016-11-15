import React from 'react';
import { Link, browserHistory } from 'react-router';
import AlertActions from '../../library/alerts/actions/AlertActions';
import { Form, Input, TextArea, Select } from '../../library/validations'
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
		this.showAlert = this.showAlert.bind(this);
    }

    componentWillMount() {
		DirectorStore.addChangeListener(this.onChange);
	}

	componentDidMount() {
        document.title = "React Movie App | Edit Director";
		if (this.props.params.directorId) {
			DirectorActions.getDirector(this.props.params.directorId).catch(() => {
				this.showAlert('directorNotFound');
				browserHistory.push('/directors');
			});
		} else {
			this.setState({
				newDirector: true
			});
		}
    }

    componentWillUnmount() {
		DirectorStore.removeChangeListener(this.onChange);
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
				this.showAlert('directorCreated');
				browserHistory.push('/directors/edit/' + this.state.director.id);
			});
		} else {
			DirectorActions.updateDirector(this.state.director.id, this.state.director).then(() => {
				this.showAlert('directorUpdated');
				browserHistory.push('/directors');
			});
		}
	}

	showAlert(selector) {
		const alerts = {
			'directorNotFound': () => {
				AlertActions.addAlert({
					show: true,
					title: 'Director Not Found',
					message: 'A director with that ID was not found.',
					type: 'error',
					delay: 3000
				});
			},
			'directorCreated': () => {
				AlertActions.addAlert({
					show: true,
					title: 'Director Created',
					message: 'A new director was successfully created.',
					type: 'success',
					delay: 3000
				});
			},
			'directorUpdated': () => {
				AlertActions.addAlert({
					show: true,
					title: 'Director Updated',
					message: `${this.state.director.firstName} ${this.state.director.lastName} was updated successfully.`,
					type: 'success',
					delay: 3000
				});
			}
		}

		return alerts[selector]();
	}

	render() {
		return (
			<div className="row">
				<h1>ReactJs, Hapi.js & PostgreSQL</h1>
				<h3 className="push-bottom-2x">Dynamic Movie App:
					<strong className="animate"> {this.state.newDirector ? 'Add New Director' : `Edit Director (ID: ${this.state.director.id})`}</strong>
				</h3>

				<Form name="directorForm" submitText={this.state.newDirector ? 'Add New Director' : 'Update Director'} handleSubmit={this.handleSubmit}>
					<div className="row">
						<div className="medium-6 columns">
							<label className="required">First Name
								<Input type="text" name="firstName" value={this.state.director.firstName} handleInputChange={this.handleInputChange} validate="name" required={true}/>
							</label>
						</div>
						<div className="medium-6 columns">
							<label className="required">Last Name
								<Input type="text" name="lastName" value={this.state.director.lastName} handleInputChange={this.handleInputChange} validate="name" required={true}/>
							</label>
						</div>
					</div>
					<div className="row">
						<div className="medium-12 columns">
							<label className="required">Bio
								<TextArea placeholder="" name="bio" value={this.state.director.bio} handleInputChange={this.handleInputChange} rows="2" required={true}/>
							</label>
						</div>
					</div>
				</Form>
			</div>
		);
	}
}
