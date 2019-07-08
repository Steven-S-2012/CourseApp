import React from 'react';

class MarqueeScroll extends React.Component {
  constructor() {
    super();
    this.duration = 55;
    this.cloneNode = null;
    this.itemHeight = 0;
    this.state = {
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
      this.marqueeScroll.removeChild(this.cloneNode);
    }
    this.cloneNode = null;
    this.firstItem = this.marqueeScroll.firstChild;
    this.length = this.marqueeScroll.children.length;
    this.itemHeight = this.props.itemHeight || this.firstItem.offsetHeight;
    this.cloneNode = this.firstItem.cloneNode(true);
    this.marqueeScroll.appendChild(this.cloneNode, this.firstItem);
  }

  // marquee() {
  //   if (this.marqueeScroll.scrollTop - this.firstItem.offsetHeight >= 0) {
  //     this.marqueeScroll.scrollTop = 0;
  //   } else {
  //     (this.marqueeScroll.scrollTop) += 1;
  //   }
  // }

  start() {
    this.timer = setInterval(() => {
      if (document.getElementById('marqueeContainer').scrollTop - this.firstItem.offsetHeight >= 0) {
        document.getElementById('marqueeContainer').scrollTop = 0;
      } else {
        document.getElementById('marqueeContainer').scrollTop += 1;
      }
    }, this.duration);
  }

  destory() {
    if (this.timer) clearInterval(this.timer);
  }

  render() {
    const data = this.state.data;
    const childDom = data.map(item => (<li key={data.indexOf(item)}>{item}</li>));
    return (
      <div className="marqueeContainer" id="marqueeContainer">
        <div
          ref={(marqueeScroll) => { this.marqueeScroll = marqueeScroll; }}
          className="demo"
          id="demo"
        >
          <ul>
            {childDom}
          </ul>
        </div>
      </div>
    );
  }
}

export default MarqueeScroll;
