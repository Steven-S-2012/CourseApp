import React from 'react';

function DetailsCard({ children, style }) {
  return (
    <div className="jr-details-card" style={style}>
      {children}
    </div>
  );
}

DetailsCard.Header = function DetailsCardHeader({ children, style }) {
  return (
    <div className="jr-details-card__header" style={style}>
      {children}
    </div>
  );
};

DetailsCard.ButtonGroup = function DetailsCardButtonGroup({ children }) {
  return (
    <div style={{ flex: 1 }}>
      <div className="jr-details-card__button-group">
        {children}
      </div>
    </div>
  );
};

export default DetailsCard;
