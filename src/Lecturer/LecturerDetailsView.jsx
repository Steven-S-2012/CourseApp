import React from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

import Button from '../UI/Button';
import ConfirmModal from '../UI/ConfirmModal';
import DetailsCard from '../UI/DetailsCard';
import DisplayField from '../UI/DisplayField';
import Spinner from '../UI/Spinner';
import Gravatar from '../UI/Gravatar';
import { statusCodeToError } from '../Utils';

class LecturerDetailsView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      isEditing: false,
      isSaving: false,
      isDeleting: false,
      showConfirmDeleteModal: false,
      error: '',
      lecturer: null,
    };
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
    this.handleCancelDelete = this.handleCancelDelete.bind(this);
    this.handleConfirmDelete = this.handleConfirmDelete.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  componentDidMount() {
    this.loadLecturer();
  }

  loadLecturer() {
    const { id } = this.props.match.params;
    if (id === 'create') {
      this.setState({ lecturer: { title: 'Mr' }, isEditing: true });
      return;
    }
    this.setState({ isLoading: true, error: '' });
    const onSuccess = (response) => {
      this.lecturer = response.data;
      this.setState({
        lecturer: response.data,
        isLoading: false,
      });
    };
    const onFail = (error) => {
      this.setState({
        lecturer: null,
        isLoading: false,
        error: statusCodeToError(error.response.status),
      });
    };
    axios.get(`/api/lecturers/${id}`).then(onSuccess).catch(onFail);
  }

  handleEdit() {
    this.setState({ isEditing: true });
  }

  handleCancelDelete() {
    this.setState({ showConfirmDeleteModal: false });
  }

  handleConfirmDelete() {
    const { lecturer } = this.state;
    this.setState({ isDeleting: true });
    axios.delete(`/api/lecturers/${lecturer.id}`)
      .then(() => {
        this.props.history.push('/lecturers');
      });
  }

  handleSubmit(event) {
    event.preventDefault();

    this.setState({ isSaving: true });
    const { lecturer } = this.state;
    const onSuccess = (response) => {
      this.lecturer = response.data;
      this.setState({
        isSaving: false,
        isEditing: false,
        lecturer: response.data,
      });
    };

    if (this.props.match.params === 'create') {
      axios.post('/api/lecturers', lecturer)
        .then(onSuccess);
    } else {
      axios.put(`/api/lecturers/${lecturer.id}`, lecturer)
        .then(onSuccess);
    }
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      lecturer: { ...this.state.lecturer, [name]: value },
    });
  }

  handleCancel() {
    const { id } = this.props.match.params;
    if (id === 'create') {
      this.props.history.push('/lecturers');
    } else {
      this.setState({
        isEditing: false,
        lecturer: this.lecturer,
      });
    }
  }

  renderDisplay() {
    const { lecturer, isDeleting, showConfirmDeleteModal } = this.state;
    return (
      <DetailsCard>
        <DetailsCard.Header>
          <Gravatar email={lecturer.email} />
          <DetailsCard.ButtonGroup>
            <Button primary onClick={this.handleEdit}>Edit</Button>
            {lecturer.id > 0 && (
              <Button
                danger
                onClick={this.handleDeleteClick}
                disabled={isDeleting}
                sytle={{ marginleft: 10 }}
              >
                {isDeleting ? 'Deleting...' : 'Delete'}
              </Button>
            )}
          </DetailsCard.ButtonGroup>
        </DetailsCard.Header>
        <DisplayField label="Name">{lecturer.first_name} {lecturer.last_name}</DisplayField>
        <DisplayField label="Email">{lecturer.email}</DisplayField>
        <ConfirmModal
          show={showConfirmDeleteModal}
          onClose={this.handleCancelDelete}
          onConfirm={this.handleConfirmDelete}
        />
      </DetailsCard>
    );
  }

  renderForm() {
    const { lecturer, isSaving } = this.state;
    return (
      <DetailsCard>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="first-name">First Name</label>
            <input
              type="text"
              className="form-control"
              name="first_name"
              id="first-name"
              placeholder="First Name"
              value={lecturer.first_name || ''}
              onChange={this.handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="last-name">Last Name</label>
            <input
              type="text"
              className="form-control"
              name="last_name"
              id="last-name"
              placeholder="Last Name"
              value={lecturer.last_name || ''}
              onChange={this.handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="title">Last name</label>
            <select
              name="title"
              id="title"
              className="form-control"
              value={lecturer.title}
              onChange={this.handleInputChange}
            >
              <option value="Mr">Mr</option>
              <option value="Miss">Miss</option>
              <option value="Mrs">Mrs</option>
              <option value="Ms">Ms</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className="form-control"
              name="email"
              id="email"
              placeholder="Email"
              value={lecturer.email || ''}
              onChange={this.handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="introduction">Introduction</label>
            <textarea
              name="introduction"
              id="introduction"
              className="form-control"
              placeholder="Introduction"
              value={lecturer.introduction || ''}
              onChange={this.handleInputChange}
            />
          </div>
          <Button primary type="submit" disabled={isSaving}>Save</Button>
          <Button
            onClick={this.handleCancel}
            disabled={isSaving}
            style={{ marginleft: 10 }}
          >
            Cancel
          </Button>
        </form>
      </DetailsCard>
    );
  }

  render() {
    const { isLoading, isEditing, lecturer, error } = this.state;
    if (isLoading) {
      return (
        <DetailsCard>
          <Spinner />
        </DetailsCard>
      );
    }

    if (!isLoading && error) {
      return (
        <DetailsCard>
          <div>{error}</div>
        </DetailsCard>
      );
    }

    if (lecturer && !isLoading) return this.renderDisplay();

    if (lecturer && isEditing) return this.renderForm();

    return null;
  }
}

export default withRouter(LecturerDetailsView);
