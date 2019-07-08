import React from 'react';
import { Link } from 'react-router-dom';

import LogoutButton from '../UI/LogoutButton';
import auth from '../Utils/auth';

export default function TopNav() {
  const isLoggedIn = auth.loggedIn();
  return (
    <nav className="navbar navbar-default navbar-fixed-top jr-top-nav">
      <div className="container">
        <div className="navbar-header">
          <button
            type="button"
            className="navbar-toggle collapsed"
            data-toggle="collapse"
            data-target="#navbar"
            aria-expanded="false"
            aria-controls="navbar"
          >
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar" />
            <span className="icon-bar" />
            <span className="icon-bar" />
          </button>
          <Link to="/" className="navbar-brand" >ReactPractice</Link>
        </div>
        <div id="navbar" className="navbar-collapse collapse">
          <ul className="nav navbar-nav">
            <li>
              <Link to="/courses">Courses</Link>
            </li>
            <li>
              <Link to="/students">Students</Link>
            </li>
            <li>
              <Link to="/lecturers">Lecturers</Link>
            </li>
            <li>
              <Link to="/pictures">Pictures</Link>
            </li>
          </ul>
          { !isLoggedIn ? (
            <ul className="nav navbar-nav navbar-right">
              <li>
                <Link to="/reigster">Register</Link>
              </li>
              <li>
                <Link to="/login">Sign In</Link>
              </li>
            </ul>
          ) : (
            <ul className="nav navbar-nav navbar-right">
              <li><LogoutButton /></li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
}
