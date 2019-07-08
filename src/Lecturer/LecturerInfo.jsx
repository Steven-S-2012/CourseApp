import React from 'react';
import { Link } from 'react-router-dom';

import Gravatar from '../UI/Gravatar';

export default function LecturerInfo({ lecturer, ...rest }) {
  return (
    <div className="list-group-item" {...rest}>
      <div className="jr-person-item">
        <Gravatar email={lecturer.email} size={50} />
        <div style={{ flex: 1 }}>
          <div className="jr-person-item__text">
            <div style={{ flex: 1 }}>
              <span className="jr-person-item__name">
                {lecturer.first_name} {lecturer.last_name}
              </span>
              <span className="jr-person-item__email">
                <i className="fa fa-envelope-o">{lecturer.email}</i>
              </span>
            </div>
            <Link to={`/lecturers/${lecturer.id}`}>Detail</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
