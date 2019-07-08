import React from 'react';

import HeadPage from './HeadPage';
import lazyLoading from '../../Utils/scroll';

// lazyloading picture wall
class Pictures extends React.Component {
  componentDidMount() {
    lazyLoading();
  }

  render() {
    return (
      <div className="exp-list-box" id="expListBox">
        <ul className="exp-list" id="expList">
          <HeadPage />
        </ul>
      </div>
    );
  }
}

export default Pictures;
