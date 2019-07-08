import React from 'react';

const GoogleMapFrame = props => (
  <div className={props.className}>
    <iframe
      style={{ width: '100%', height: '100%', border: 0 }}
      title="map"
      src={props.url}
      frameBorder={0}
      allowFullScreen
    />
  </div>
);

export default GoogleMapFrame;
