'use strict';

import React from 'react';
import {Link} from 'react-router';
import Animation from 'react-addons-css-transition-group';
import AlertActions from '../../library/alerts/actions/AlertActions';
import Modal from '../../library/modal';
import DirectorRow from '../pieces/DirectorRow';
import DirectorActions from '../../actions/DirectorActions';
import DirectorStore from '../../stores/DirectorStore';

export default class DirectorListPage extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            directors: [],
			directorModalIsOpen: false,
			modalData: {}
        }
		this.onChange = this.onChange.bind(this);
		this.showAlert = this.showAlert.bind(this);
		this.handleSort = this.handleSort.bind(this);
        this.handleFilter = this.handleFilter.bind(this);
    }

	componentWillMount() {
		DirectorStore.addChangeListener(this.onChange);
	}

    componentDidMount() {
        document.title = "React Movie App | Directors";
        DirectorActions.getDirectors();
    }

    componentWillUnmount() {
		DirectorStore.removeChangeListener(this.onChange);
	}

	onChange() {
		this.setState({
			directors: DirectorStore.getDirectors()
		})
	}

	removeDirector(id) {
		DirectorActions.removeDirector(id).then(() => {
			this.showAlert('directorDeleted');
		});
	}

	showAlert(selector) {
		const alerts = {
			'directorDeleted': () => {
				AlertActions.addAlert({
					show: true,
					title: 'Director Deleted',
					message: 'A director was successfully deleted.',
					type: 'info',
					delay: 3000
				});
			}
		}

		return alerts[selector]();
	}

	openModal(data) {
		this.setState({
			modalData: data
		})
		this.toggleModal();
	}

	toggleModal() {
		this.setState({
			directorModalIsOpen: !this.state.directorModalIsOpen
		});
	}

	handleModalSubmit() {
		this.removeDirector(this.state.modalData.id);
		this.toggleModal();
	}

	handleSort(e) {
		let searchParam = e.target.value;
		let directors = this.state.directors;
		let newOrder = directors.sort(function(a, b) {
			a = a[searchParam].toLowerCase();
			b = b[searchParam].toLowerCase();
		    if(a < b) return -1;
		    if(a > b) return 1;
		    return 0;
		});
		this.setState({
			directors: newOrder
		})
	}

	handleFilter(e) {
		let searchParam = e.target.value.toLowerCase();
		let directors = DirectorStore.getDirectors();
		let filteredDirectors = directors.filter((director) => {
			if (JSON.stringify(director).toLowerCase().indexOf(searchParam) > -1) {
				return true;
			} else {
				return false;
			};
		});
		this.setState({
			directors: filteredDirectors
		});
	}

    render() {
        return (
			<div>
				<div className="row">
					<div className="small-12 columns">
						<h1>ReactJs, Hapi.js & PostgreSQL</h1>
		                <h3 className="push-bottom-2x">All Directors</h3>
					</div>
				</div>
	            <div className="row">
	                <div className="small-12 medium-6 columns">
	                    <Link key="createDirector" to="/directors/create">
							<button type="button" className="button primary small-12 medium-8 large-6">
	                        <i className="fa fa-plus"></i> Add New Director</button>
						</Link>
	                </div>
	                <div className="small-12 medium-6 columns">
						<div className="small-12 medium-8 medium-offset-4 large-6 large-offset-6">
							<div className="search-input">
								<input type="search" placeholder="Enter search terms..." onChange={this.handleFilter}/>
								<span className="fa fa-search search-icon"></span>
							</div>
						</div>
	                </div>
	            </div>
				<div className="row">
	                <div className="small-12 columns">
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
	                            {this.state.directors.map((director, i) => <DirectorRow
									key={i} {...director}
									bio={director.bio.substring(0, 70) + '...'}
									removeDirector={this.openModal.bind(this, director)}
								></DirectorRow>)}
	                        </tbody>
	                    </table>
	                </div>
					<Modal key="directorModal" name="directorModal" modalIsOpen={this.state.directorModalIsOpen} handleSubmit={this.handleModalSubmit.bind(this)} handleClose={this.toggleModal.bind(this)} title="Remove Director">Are you sure you want to delete {this.state.modalData.firstName} {this.state.modalData.lastName}?</Modal>
	            </div>
				<div className="row">
					<div className="small-12 medium-6 large-3 medium-offset-6 large-offset-9 columns text-right">
	                    <label>Sort by:
	                        <select id="orderParams" defaultValue="createdAt" onChange={this.handleSort}>
	                            <option value="firstName">First Name</option>
	                            <option value="lastName">Last Name</option>
	                            <option value="createdAt">Date Created</option>
	                            <option value="updatedAt">Last Updated</option>
	                        </select>
	                    </label>
	                </div>
				</div>
			</div>
        );
    }
}
