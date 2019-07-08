import React from 'react';
// import PropTypes from 'prop-types';

class MarqueeSingle extends React.Component {
  constructor() {
    super();
    this.duration = 1000;
    this.cloneNode = null;
    this.length = 0;
    this.itemHeight = 0;
    this.state = {
      currentIndex: 0,
      currenTranslateY: 0,
      noAnimate: false,
    };
  }
  componentDidMount() {
    this.destory();
    this.init();
    this.start();
  }
  componentWillReceiveProps() {
    this.destory();
    this.init();
    this.start();
  }
  destory() {
    if (this.timer) clearInterval(this.timer);
  }

  init() {
    if (this.cloneNode) {
      this.marquee.removeChild(this.cloneNode);
    }
    this.cloneNode = null;
    const firstItem = this.marquee.firstChild;
    if (!firstItem) { return; }
    const lastItem = this.marquee.lastChild;
    this.length = this.marquee.children.length;
    this.itemHeight = this.props.itemHeight || firstItem.offsetHeight;
    if (this.props.direction === 'up') {
      this.cloneNode = firstItem.cloneNode(true);
      this.marquee.appendChild(this.cloneNode);
    } else {
      this.cloneNode = lastItem.cloneNode(true);
      this.marquee.insertBefore(this.cloneNode, firstItem);
    }
  }
  start() {
    if (this.props.direction === 'down') { this.go(false); }
    this.timer = setInterval(() => {
      if (this.props.direction === 'up') {
        const index = this.state.currentIndex + 1;
        this.setState({
          currentIndex: index,
          currenTranslateY: -index * this.itemHeight,
        });
      } else {
        const index = this.state.currentIndex - 1;
        this.setState({
          currentIndex: index,
          currenTranslateY: -(index + 1) * this.itemHeight,
        });
      }
      if (this.state.currentIndex === this.length) {
        setTimeout(() => {
          this.go(true);
        }, this.duration);
      } else if (this.state.currentIndex === -1) {
        setTimeout(() => {
          this.go(false);
        }, this.duration);
      } else {
        this.setState({
          noAnimate: false,
        });
      }
    }, this.duration + this.props.interval);
  }

  go(toFirst) {
    if (toFirst) {
      this.setState({
        noAnimate: true,
        currentIndex: 0,
        currenTranslateY: 0,
      });
    } else {
      this.setState({
        noAnimate: true,
        currentIndex: this.length - 1,
        currenTranslateY: -(this.length) * this.itemHeight,
      });
    }
  }

  render() {
    const childDom = React.Children.map(this.props.children, child => child);
    return (
      <div className="marquee_box">
        <ul ref={(marquee) => { this.marquee = marquee; }} style={{ transform: `translate3d(0,${this.state.currenTranslateY}px,0)`, transition: `transform ${this.state.noAnimate ? 0 : this.duration}ms` }}>
          {childDom}
        </ul>
      </div>);
  }
}

MarqueeSingle.defaultProps = {
  direction: 'up',
  interval: 2000,
};

// MarqueeSingle.propTypes = {
//   interval: PropTypes.number,
//   direction: PropTypes.string,
//   itemHeight: PropTypes.number,
// };

export default MarqueeSingle;
