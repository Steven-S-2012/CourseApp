import React from 'react';

export default class OperateList extends React.Component {
  constructor() {
    super();
    this.handleDeleteItem = this.handleDeleteItem.bind(this);
    this.handleModifyItem = this.handleModifyItem.bind(this);
  }

  // All handle functions are passed from UserPost, when they have been called, 
  // it call back to the real handle function.
  handleModifyItem() {
    const { onModify, item } = this.props;
    onModify(item);
  }

  handleDeleteItem() {
    const { onDelete, item } = this.props;
    onDelete(item);
  }

  render() {
    const { item } = this.props;
    return (
      <li className="post-page_block">
        <div className="post-container">
          <div className="post-tablebody">
            <div className="post-title"><h1>{item.title}</h1></div>
            <div className="post-header">
              <div className="post-img">
                <img src={item.headingImg} alt="pic" id="post-img" />
              </div>
              <div className="post-header_info">
                <div className="post-user"><span className="post-label">Published By: </span>{item.publishedBy}</div>
                <div className="post-time"><span className="post-label">Published At: </span> {item.publishedAt.toLocaleString()}</div>
                <div className="post-keyword"><span className="post-label">Key Words: </span>{item.digest}</div>
              </div>
              <div><span className="post-label">No: </span>{item.id}</div>
            </div>
            <div className="post-body">
              <div>{item.content}</div>
            </div>
            <div className="post-bottom">
              <a href="javascript:scroll(0,0)" rel="<Back to top>">
                <i className="fa fa-arrow-circle-o-up fa-3x" aria-hidden="true" id="post-totop" />
              </a>
              <span className="post-btn"><button className="btn btn-primary"onClick={this.handleDeleteItem}>Delete</button></span>
              <span className="post-btn"><button className="btn btn-primary"onClick={this.handleModifyItem}>Modify</button></span>
            </div>
          </div>
        </div>
      </li>
    );
  }
}
