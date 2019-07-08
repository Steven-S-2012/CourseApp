import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import Spinner from '../UI/Spinner';
import StudentInfo from './StudentInfo';

export default class StudentsView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      students: [],
    };
  }

  componentDidMount() {
    this.loadStudents();
  }

  loadStudents() {
    this.setState({ isLoading: true });
    axios.get('/api/students').then((response) => {
      this.setState({
        isLoading: false,
        students: response.data,
      });
    });
  }

  render() {
    return (
      <div>
        <h1 className="title">Students List</h1>
        <Link to="/students/create" className="btn btn-primary">Add New Student</Link>
        <div style={{ marginTop: 20 }}>
          {this.state.isLoading && <Spinner />}
          {!this.state.isLoading && (
            <ul className="list-group">
              {this.state.students.map(student => (
                <StudentInfo student={student} key={student.id} />
              ))}
            </ul>
          )}
        </div>
      </div>
    );
  }
}
