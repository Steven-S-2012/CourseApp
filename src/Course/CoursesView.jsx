import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import Spinner from '../UI/Spinner';
import CourseCard from './CourseCard';

export default class CoursesView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      courses: [],
    };
  }

  componentDidMount() {
    this.loadCourses();
  }

  loadCourses() {
    this.setState({ isLoading: true });
    axios.get('/api/courses').then((response) => {
      this.setState({
        isLoading: false,
        courses: response.data,
      });
    });
  }

  render() {
    return (
      <div>
        <h1 className="title">Courses List</h1>
        <Link to="/courses/create" className="btn btn-primary">Add New Course</Link>
        <div style={{ marginTop: 20 }}>
          {this.state.isLoading && <Spinner />}
          {!this.state.isLoading && (
            <div className="row">
              {this.state.courses.map(course => <CourseCard course={course} key={course.id} />)}
            </div>
          )}
        </div>
      </div>
    );
  }
}
