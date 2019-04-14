import React, { Component } from 'react';

class UsersContent extends Component {
  createMarkup(markupString) {
    return {
      __html: markupString,
    }
  }

  render() {
    return (
        <div className="row">
        <div className="col s6">
          <div className="card horizontal">
            <div id="chat-messages" 
                 className="card-content" 
                 dangerouslySetInnerHTML={this.createMarkup(this.props.html)}>
            </div>
          </div>
      </div>
      <div className="col s6">
          <div className="card horizontal">
            <div id="chat-messages" 
                 className="card-content" 
                 dangerouslySetInnerHTML={this.createMarkup(this.props.html)}>
            </div>
          </div>
      </div>
      </div>
    );
  }
}

export default UsersContent; 
