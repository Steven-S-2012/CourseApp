import React from 'react';

export default function DisplayField({ label, children }) {
  return (
    <div className="jr-display-field">
      <div className="jr-display-field__label">{label}</div>
      <div className="jr-display-field__content">
        {children}
      </div>
    </div>
  );
}
