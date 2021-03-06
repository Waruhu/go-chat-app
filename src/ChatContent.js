import React, { Component } from 'react';

class ChatContent extends Component {
  createMarkup(markupString) {
    return {
      __html: markupString,
    }
  }

  render() {
    return (
      <div className="row">
        <div className="col s2">
        <h5>User List</h5>
          <div className="card horizontal">
            <div id="chat-messages" 
                 className="card-content" 
                 dangerouslySetInnerHTML={this.createMarkup(this.props.userContent)}>
            </div>
          </div>
      </div>
      <div className="col s10">
      <h5>Room</h5>
          <div className="card horizontal">
            <div id="chat-messages" 
                 className="card-content" 
                 dangerouslySetInnerHTML={this.createMarkup(this.props.chatContent)}>
            </div>
          </div>
      </div>
      </div>
    );
  }
}

export default ChatContent; 
