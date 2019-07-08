import React from 'react';

class MarqueePage extends React.Component {
  constructor() {
    super();
    this.duration = 3500;
    this.cloneNode = null;
    this.length = 0;
    this.itemHeight = 0;
    this.state = {
      currentIndex: 0,
      currentTranslateY: 0,
      noAnimate: false,
      data: [
        'On 1 of the pages',
        'On 2 of the pages',
        'On 3 of the pages',
      ],
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

  init() {
    if (this.cloneNode) {
      this.marqueePage.removeChild(this.cloneNode);
    }
    this.cloneNode = null;
    const firstItem = this.marqueePage.firstChild;
    const lastItem = this.marqueePage.lastChild;
    this.length = this.marqueePage.children.length;
    this.itemHeight = this.props.itemHeight || firstItem.offsetHeight || lastItem.offsetHeight;
    // console.log(this.itemHeight);
    if (this.props.direction === 'up') {
      this.cloneNode = firstItem.cloneNode(true);
      this.marqueePage.appendChild(this.cloneNode, firstItem);
    } else {
      this.cloneNode = lastItem.cloneNode(true);
      this.marqueePage.insertBefore(this.clondNode, lastItem);
    }
  }

  start() {
    const direction = this.props.direction;
    if (direction === 'down') this.initDirection(false);
    this.timer = setInterval(() => {
      if (direction === 'up') {
        const index = this.state.currentIndex + 1;
        this.setState({
          noAnimate: false,
          currentIndex: index,
          currentTranslateY: -(this.length) * this.itemHeight,
        });
        // console.log("start",this.state.noAnimate);
      // }
      } else {
        const index = this.state.currentIndex - 1;
        this.setState({
          currentIndex: index,
          currentTranslateY: 0,
        });
      }
      if (this.state.currentIndex === this.length) {
        setTimeout(() => { this.initDirection(true); }, this.duration);
      }
      // if (this.state.currentIndex === this.length) {
      //   setTimeout(() => { this.initDirection(true); }, this.duration);
      // } else if (this.state.currentIndex === -1) {
      //   this.initDirection(false);
      // } else {
      //   this.setState({
      //     noAnimate: false,
      //   });
      //   console.log("reset",this.state.noAnimate);
      // }
      // console.log("out",this.state.noAnimate);
    }, this.duration);
  }

  destory() {
    if (this.timer) clearInterval(this.timer);
  }

  initDirection(direction) {
    if (direction) {
      this.setState({
        noAnimate: true,
        currentIndex: 0,
        currentTranslateY: 0,
      });
    } else {
      this.setState({
        noAnimate: true,
        currentIndex: this.length - 1,
        currentTranslateY: -(this.length) * this.itemHeight,
      });
    }
  }

  render() {
    const data = this.state.data;
    const childDom = data.map(item => (<li key={data.indexOf(item)}>{item}</li>));
    return (
      <div className="marqueeContainer">
        <div
          ref={(marqueePage) => { this.marqueePage = marqueePage; }}
          style={{ transform: `translate3d(0,${this.state.currentTranslateY}px,0)`,
            transition: `transform ${this.state.noAnimate ? 0 : this.duration}ms linear` }}
        >
          <ul>
            {childDom}
          </ul>
        </div>
      </div>
    );
  }
}

MarqueePage.defaultProps = {
  direction: 'up',
  interval: 2000,
};


export default MarqueePage;

