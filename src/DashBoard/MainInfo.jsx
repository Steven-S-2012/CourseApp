import React from 'react';

import MarqueeSingle from './MarqueeSingle';
import MarqueePage from './MarqueePage';
import MarqueeScroll from './MarqueeScroll';
import MarqueeRoute from './MarqueeRoute';
import GoogleMaps from '../UI/GoogleMaps';


class MainInfo extends React.Component {
  constructor() {
    super();
    this.state = {
      routeData: [
        'Alibaba is an multinational technology company that specializes in Internet-related services and products. ',
        'Facebook is an multinational technology company that specializes in Internet-related services and products.',
        'Amazon is an multinational technology company that specializes in Internet-related services and products.',
        'Apple is an multinational technology company that specializes in Internet-related services and products.',
        'Google is an multinational technology company that specializes in Internet-related services and products.',
      ],
    };
  }

  render() {
    const { routeData } = this.state;
    return (
      <div className={this.props.className || 'col-sm-8'}>
        <MarqueeSingle interval={3000} direction="up">
          <li>First Page</li>
          <li>Second Page</li>
          <li>Third Page</li>
          <li>Fourth Page</li>
          <li>Fifth Page</li>
        </MarqueeSingle>
        <br />
        <br />
        <MarqueePage interval={1000} direction="up" />
        <br />
        <br />
        <MarqueeScroll />
        <br />
        <MarqueeRoute>
          {routeData.map(item => (<li key={routeData.indexOf(item)}><a src="#">{item}</a></li>))}
        </MarqueeRoute>
        <div style={{ margin: '20px 0 20px 0' }}>
          <GoogleMaps
            isMarkerShown
            googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCCZJ2VVhVZfEa5l8UDTCE5eRXXRDixgHw&v=3.exp&libraries=geometry,drawing,places"
            loadingElement={<div style={{ height: '100%' }} />}
            containerElement={<div style={{ height: '400px' }} />}
            mapElement={<div style={{ height: '100%' }} />}
          />
        </div>
      </div>
    );
  }
}

export default MainInfo;
