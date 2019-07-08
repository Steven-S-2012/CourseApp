import React from 'react';

import OperateList from './OperateList';
import './post.css';

export default class UserPost extends React.Component {
  constructor() {
    super();
    this.state = {
      id: null,
      title: '',
      digest: '',
      headingImg: '',
      content: '',
      publishedAt: new Date(),
      publishedBy: '',

      items: [
        {
          id: 1,
          title: 'AAA',
          digest: 'aaa',
          headingImg: '//tva1.sinaimg.cn/crop.0.0.512.512.50/66359977jw8emypyoi4cuj20e80e8dh1.jpg',
          content: 'On one of the pages',
          publishedAt: new Date(),
          publishedBy: 'AAA.AAA',
        },
        {
          id: 2,
          title: 'BBB',
          digest: 'bbb',
          headingImg: '//tva1.sinaimg.cn/crop.0.0.512.512.50/66359977jw8emypyoi4cuj20e80e8dh1.jpg',
          content: 'On one of the passges',
          publishedAt: new Date(),
          publishedBy: 'BBB.BBB',
        },
      ],
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDetailChange = this.handleDetailChange.bind(this);
    this.handleDeleteItem = this.handleDeleteItem.bind(this);
    this.handleModifyItem = this.handleModifyItem.bind(this);
  }

  handleDetailChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { title, publishedBy, digest, headingImg, content, id } = this.state;
    const newPostItem = {
      title,
      digest,
      headingImg,
      content,
      publishedBy,
      publishedAt: new Date(),
      id,
    };

    if (!this.state.id) {
      newPostItem.id = this.state.items.length + 1;
      this.state.items.push(newPostItem);
      this.setState({ items: this.state.items });
    } else {
      const number = this.state.id - 1;
      this.setState(this.state.items[number] = newPostItem);
    }


    this.setState({
      title: '',
      digest: '',
      headingImg: '',
      content: '',
      publishedAt: new Date(),
      publishedBy: '',
      id: null,
    });
  }

  handleDeleteItem(item) {
    // checkBox will return a boolean value to decide delete or not.
    const checkBox = confirm('Are you sure to delete this post?');
    if (checkBox) {
      const newItems = this.state.items.filter(x => x.id !== item.id);
      for (let i = item.id; i <= newItems.length; i += 1) {
        newItems[i - 1].id = i;
      }
      this.setState({ items: newItems });
      window.alert('Post was deleted!');
    } else window.alert('You did not deleted anything!');
  }

  handleModifyItem(item) {
    this.setState({
      title: item.title,
      digest: item.digest,
      headingImg: item.headingImg,
      content: item.content,
      publishedBy: item.publishedBy,
      id: item.id,
    });
  }

  // use another component (OperateList)to handle render work.
  renderList() {
    return (
      <div>
        {this.state.items.map((item) => {
          return (
            <OperateList
              key={item.id}
              item={item}
              onDelete={this.handleDeleteItem}
              onModify={this.handleModifyItem}
            /> // assign the handle function to the varibles passed to new component
          );
        })}
      </div>
    );
  }

  renderForm() {
    return (
      <form id="post-form"onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input type="text" id="title" className="form-control" name="title" value={this.state.title} onChange={this.handleDetailChange} />
        </div>
        <div className="form-group">
          <label htmlFor="publishedBy">Your Name:</label>
          <input type="text" id="publishedBy" className="form-control" name="publishedBy" value={this.state.publishedBy} onChange={this.handleDetailChange} />
        </div>
        <div className="form-group">
          <label htmlFor="digest">Key Words:</label>
          <input type="text" id="digest" className="form-control" name="digest" value={this.state.digest} onChange={this.handleDetailChange} />
        </div>
        <div className="form-group">
          <label htmlFor="headingImg">Image's Website:</label>
          <input type="text" id="headingImg" className="form-control" name="headingImg" value={this.state.headingImg} onChange={this.handleDetailChange} />
        </div>
        <div className="form-group">
          <label htmlFor="content">Type Your Words:</label>
          <textarea type="text" cols="30" rows="10" id="content" className="form-control" name="content" value={this.state.content} onChange={this.handleDetailChange}>Your Words</textarea>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    );
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="col-sm-12 col-md-4" id="postform">
          {this.renderForm()}
        </div>
        <div className="col-sm-12 col-md-8">
          {this.renderList()}
        </div>
      </div>
    );
  }
}
