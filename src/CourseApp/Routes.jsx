import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Pictures from '../PictureWall/ScrollDisplayPic/Pictures';
import CoursesView from '../Course/CoursesView';
import CourseDetailsView from '../Course/CourseDetailsView';
import LecturersView from '../Lecturer/LecturersView';
import LecturerDetailsView from '../Lecturer/LecturerDetailsView';
import StudentsView from '../Student/StudentsView';
import StudentDetailsView from '../Student/StudentDetailsView';
import DashBoard from '../DashBoard/DashBoard';
import Login from './Login';
import Registration from './Registration';
import EnsureLogin from './EnsureLogin';

export default () => (
  <Switch>
    <Route exact path="/" component={DashBoard} />
    <Route exact path="/login" component={Login} />
    <Route exact path="/register" component={Registration} />
    <Route exact path="/courses" component={CoursesView} />
    <Route exact path="/pictures" component={Pictures} />
    <EnsureLogin>
      <Route exact path="/courses/:id" component={CourseDetailsView} />
      <Route exact path="/lecturers" component={LecturersView} />
      <Route exact path="/lecturers/:id" component={LecturerDetailsView} />
      <Route exact path="/students" component={StudentsView} />
      <Route exact path="/students/:id" component={StudentDetailsView} />
    </EnsureLogin>
  </Switch>
);
