import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import Spinner from '../UI/Spinner';
import LecturersInfo from './LecturerInfo';

export default class LecturersView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      lecturers: [],
    };
  }

  componentDidMount() {
    this.loadStudents();
  }

  loadStudents() {
    this.setState({ isLoading: true });
    axios.get('/api/lecturers').then((response) => {
      this.setState({
        isLoading: false,
        lecturers: response.data,
      });
    });
  }

  render() {
    return (
      <div>
        <h1 className="title">Lecturers List</h1>
        <Link to="/lecturers/create" className="btn btn-primary">Add New lecturer</Link>
        <div style={{ marginTop: 20 }}>
          {this.state.isLoading && <Spinner />}
          {!this.state.isLoading && (
            <ul className="list-group">
              {this.state.lecturers.map(lecturer => (
                <LecturersInfo lecturer={lecturer} key={lecturer.id} />
              ))}
            </ul>
          )}
        </div>
      </div>
    );
  }
}
