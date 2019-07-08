import React from 'react';
import { Link } from 'react-router-dom';

import { truncateWords } from '../Utils';

export default function CourseCard({ course }) {
  return (
    <div className="col-sm-6 col-md-3">
      <div className="thumbnail jr-course-card">
        <div className="caption">
          <h4 className="jr-course-card__name">{truncateWords(course.name, 20)}</h4>
          <p className="jr-course-card__code">{truncateWords(course.code, 30)}</p>
          <p className="jr-course-card__introduction">{truncateWords(course.introduction, 60)}</p>
          <p>
            <Link to={`/courses/${course.id}`} className="btn btn-default">
              Details
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
