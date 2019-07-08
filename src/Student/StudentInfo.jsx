import React from 'react';
import { Link } from 'react-router-dom';

import Gravatar from '../UI/Gravatar';

export default function StudentInfo({ student, ...rest }) {
  return (
    <div className="list-group-item" {...rest}>
      <div className="jr-person-item">
        <Gravatar email={student.email} size={50} />
        <div style={{ flex: 1 }}>
          <div className="jr-person-item__text">
            <div style={{ flex: 1 }}>
              <span className="jr-person-item__name">{student.first_name} {student.last_name}</span>
              <span className="jr-person-item__email">
                <i className="fa fa-envelope-o" /> {student.email}
              </span>
            </div>
            <Link to={`/students/${student.id}`} className="btn btn-primary">Details</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
