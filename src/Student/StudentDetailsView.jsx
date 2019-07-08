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

class StudentDetailsView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      isEditing: false,
      isSaving: false,
      isDeleting: false,
      showConfirmDeleteEmodal: false,
      error: '',
      student: null,
    };

    this.handleEdit = this.handleEdit.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
    this.handleCancelDelete = this.handleCancelDelete.bind(this);
    this.handleConfirmDelete = this.handleConfirmDelete.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidMount() {
    this.loadStudent();
  }

  loadStudent() {
    const { id } = this.props.match.params;
    if (id === 'create') {
      this.setState({ isEditing: true, student: {} });
      return;
    }

    this.setState({ isLoading: true, error: '' });
    const onSuccess = (response) => {
      this.student = response.data;
      this.setState({
        isLoading: false,
        student: response.data,
      });
    };
    const onFail = (error) => {
      this.setState({
        student: null,
        isLoading: false,
        error: statusCodeToError(error.response.status),
      });
    };

    axios.get(`/api/students/${id}`).then(onSuccess).catch(onFail);
  }

  handleEdit() {
    this.setState({ isEditing: true });
  }

  handleDeleteClick() {
    this.setState({ showConfirmDeleteEmodal: true });
  }

  handleCancelDelete() {
    this.setState({ showConfirmDeleteEmodal: false });
  }

  handleConfirmDelete() {
    const { student } = this.state;

    this.setState({ isDeleting: true });
    axios.delete(`/api/students/${student.id}`)
      .then(() => {
        this.props.history.push('/students');
      });
  }

  handleSubmit(event) {
    event.preventDefault();

    this.setState({ isSaving: true });
    const { student } = this.state;
    const onSuccess = (response) => {
      this.student = response.data;
      this.setState({
        isSaving: false,
        isEditing: false,
        student: response.data,
      });
    };

    if (this.props.match.params.id === 'create') {
      axios.post('/api/students', student).then(onSuccess);
    } else {
      axios.put(`/api/students/${student.id}`, student).then(onSuccess);
    }
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      student: {
        ...this.state.student,
        [name]: value,
      },
    });
  }

  handleCancel() {
    const { id } = this.props.match.params;
    if (id === 'create') {
      this.props.history.push('/students');
    } else {
      this.setState({
        isEditing: false,
        student: this.student,
      });
    }
  }

  renderDisplay() {
    const { student, isDeleting, showConfirmDeleteEmodal } = this.state;
    return (
      <DetailsCard>
        <DetailsCard.Header>
          <Gravatar email={student.email} />
          <DetailsCard.ButtonGroup>
            <Button primary onClick={this.handleEdit}>Edit</Button>
            {student.id > 0 && (
              <Button
                danger
                style={{ marginleft: 10 }}
                disabled={isDeleting}
                onClick={this.handleDeleteClick}
              >
                {isDeleting ? 'Deleting...' : 'Delete'}
              </Button>
            )}
          </DetailsCard.ButtonGroup>
        </DetailsCard.Header>
        <DisplayField label="Name">{`${student.first_name}` `${student.last_name}`}</DisplayField>
        <DisplayField label="Email">{student.email}</DisplayField>
        <DisplayField label="Courses enrolled" />
        <ConfirmModal
          show={showConfirmDeleteEmodal}
          onClose={this.handleCancelDelete}
          onConfirm={this.handleConfirmDelete}
        />
      </DetailsCard>
    );
  }

  renderForm() {
    const { isSaving, student } = this.state;
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
              value={student.first_name || ''}
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
              value={student.last_name || ''}
              onChange={this.handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className="form-control"
              name="email"
              id="email"
              placeholder="Email"
              value={student.email || ''}
              onChange={this.handleInputChange}
            />
          </div>
          <Button primary type="submit" disabled={isSaving}>Save</Button>
          <Button
            disabled={isSaving}
            onClick={this.handleCancel}
            style={{ marginleft: 10 }}
          >
            Cancel
          </Button>
        </form>
      </DetailsCard>
    );
  }

  render() {
    const { isLoading, isEditing, error, student } = this.state;
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

    if (!isEditing && student) return this.renderDisplay();

    if (isEditing && student) return this.renderForm();

    return null;
  }
}

export default withRouter(StudentDetailsView);
