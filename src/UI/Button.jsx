import React from 'react';
import classnames from 'classnames';

export default function Button({ children, primary, danger, className, buttonType = 'button', ...rest }) {
  let buttonStyle = 'btn-default';
  if (primary) buttonStyle = 'btn-primary';
  if (danger) buttonStyle = 'btn-danger';

  return (
    <button className={classnames('btn', buttonStyle, className)} type={buttonType} {...rest}>
      {children}
    </button>
  );
}
