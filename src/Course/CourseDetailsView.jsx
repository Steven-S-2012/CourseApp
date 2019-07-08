import React from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

import Button from '../UI/Button';
import ConfirmModal from '../UI/ConfirmModal';
import DetailsCard from '../UI/DetailsCard';
import DisplayField from '../UI/DisplayField';
import Spinner from '../UI/Spinner';
import { statusCodeToError } from '../Utils';

class CourseDetailsView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      isEditing: false,
      isSaving: false,
      isDeleting: false,
      showConfirmDeleteModal: false,
      error: '',
      course: null,
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
    this.loadCourse();
  }

  loadCourse() {
    const { id } = this.props.match.params;
    if (id === 'create') {
      this.setState({ isEditing: true, course: {} });
      return;
    }

    this.setState({ isLoading: true, error: '' });
    const onSuccess = (response) => {
      this.course = response.data;
      this.setState({ isLoading: false, course: response.data });
    };
    const onFail = (error) => {
      this.setState({
        isLoading: false,
        course: null,
        error: statusCodeToError(error.response.status),
      });
    };

    axios.get(`/api/courses/${id}`).then(onSuccess).catch(onFail);
  }

  handleEdit() {
    this.setState({ isEditing: true });
  }

  handleDeleteClick() {
    this.setState({ showConfirmDeleteModal: true });
  }

  handleCancelDelete() {
    this.setState({ showConfirmDeleteModal: false });
  }

  handleConfirmDelete() {
    const { course } = this.state;
    this.setState({ isDeleting: true });
    axios.delete(`/api/courses/${course.id}`)
      .then(() => {
        this.setState({ isDeleting: false });
        // console.log('history: ', this.props.history);
        this.props.history.push('/courses');
      });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({ isSaving: true });
    const { course } = this.state;
    const onSuccess = (response) => {
      this.course = response.data;
      this.setState({
        isEditing: false,
        isSaving: false,
        course: response.data,
      });
    };

    if (this.props.match.params.id === 'create') {
      axios.post('/api/courses', course)
        .then(onSuccess);
    } else {
      axios.put(`/api/courses/${course.id}`, course)
        .then(onSuccess);
    }
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      course: {
        ...this.state.course,
        [name]: value,
      },
    });
  }

  handleCancel() {
    const { id } = this.props.match.params;
    if (id === 'create') {
      this.props.history.push('/courses');
    } else {
      this.setState({
        isEditing: false,
        course: this.course,
      });
    }
  }

  renderDisplay() {
    const { course, isDeleting, showConfirmDeleteModal } = this.state;
    return (
      <DetailsCard>
        <DetailsCard.Header>
          <h1>{course.name}</h1>
          <DetailsCard.ButtonGroup>
            <Button primary onClick={this.handleEdit}>Edit</Button>
            {course.id > 0 && (
              <Button
                danger
                onClick={this.handleDeleteClick}
                disabled={isDeleting}
                style={{ marginLeft: 10 }}
              >
                {isDeleting ? 'Deleting...' : 'Delete'}
              </Button>
            )}
          </DetailsCard.ButtonGroup>
        </DetailsCard.Header>
        <DisplayField label="Code">{course.code}</DisplayField>
        <DisplayField label="Start">{course.start_at}</DisplayField>
        <DisplayField label="End">{course.end_at}</DisplayField>
        <DisplayField label="Introduction">{course.introduction}</DisplayField>
        <ConfirmModal
          show={showConfirmDeleteModal}
          onClose={this.handleCancelDelete}
          onConfirm={this.handleConfirmDelete}
        />
      </DetailsCard>
    );
  }

  renderForm() {
    const { course, isSaving } = this.state;
    return (
      <DetailsCard>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              placeholder="Name"
              name="name"
              className="form-control"
              value={course.name || ''}
              onChange={this.handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="code">Code:</label>
            <input
              type="text"
              id="code"
              placeholder="Code"
              name="code"
              className="form-control"
              value={course.code || ''}
              onChange={this.handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="start-at">Start at:</label>
            <input
              type="text"
              id="start-at"
              placeholder="DD/MM/YYYY"
              name="start-at"
              className="form-control"
              value={course.start_at || ''}
              onChange={this.handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="end-at">End at:</label>
            <input
              type="text"
              id="end-at"
              placeholder="DD/MM/YYYY"
              name="end-at"
              className="form-control"
              value={course.end_at || ''}
              onChange={this.handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="introduction">Introduction:</label>
            <textarea
              style={{ height: 80 }}
              id="introduction"
              placeholder="Introduction"
              name="introduction"
              className="form-control"
              value={course.introduction || ''}
              onChange={this.handleInputChange}
            />
          </div>
          <Button primary type="submit" disabled={isSaving}>Save</Button>
          <Button
            onClick={this.handleCancel}
            disabled={isSaving}
            style={{ marginLeft: 10 }}
          >
            Cancel
          </Button>
        </form>
      </DetailsCard>
    );
  }

  render() {
    const { isLoading, isEditing, course, error } = this.state;

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
          {error}
        </DetailsCard>
      );
    }

    if (course && !isEditing) {
      return this.renderDisplay();
    }

    if (course && isEditing) {
      return this.renderForm();
    }

    return null;
  }
}

export default withRouter(CourseDetailsView);
