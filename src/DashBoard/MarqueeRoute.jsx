import React from 'react';

const MarqueeRoute = props => (
  <div id="marqueetest" direction="up">
    <ul id="demotest">
      {props.children}
    </ul>
  </div>
);

export default MarqueeRoute;
