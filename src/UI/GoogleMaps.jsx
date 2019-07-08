import React from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';

const GoogleMaps = withScriptjs(withGoogleMap((props) => {
  const { position } = props;
  return (
    <GoogleMap
      defaultZoom={8}
      defaultCenter={position || { lat: -33.870, lng: 151.209 }}
    >
      {props.isMarkerShown && <Marker position={position || { lat: -33.870, lng: 151.209 }} />}
    </GoogleMap>
  );
}));

export default GoogleMaps;
