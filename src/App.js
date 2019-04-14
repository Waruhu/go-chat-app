import React, { Component } from 'react';
import MD5 from "crypto-js/md5";
import emojione from 'emojione';
import * as $ from "jquery"; // 🤢
import Materialize from "materialize-css";
import ChatContent from './ChatContent';
import Login from './Login';
import ChatInput from './ChatInput';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.ws = null;
    this.state = {
      newMsg: '', // Holds new messages to be sent to the server  
      chatContent: '', // A running list of chat messages displayed on the screen
      email: '', // Email address used for grabbing avatar
      username: '', // Our username
      joined: false, // True if email and username have been filled in
      userContent: '',
    }
  }

  componentWillMount() {
    this.ws = new WebSocket('ws://localhost:8000/ws');
    this.ws.addEventListener('message', e => {
      let msg = JSON.parse(e.data);
      this.setState(prevState => {
        if(msg.username!=this.state.username){
          return {
            chatContent: prevState.chatContent + `
              <div class="chip">
                <img src="${this.gravatarURL(msg.email)}">
                ${msg.username}
              </div>
              ${emojione.toImage(msg.message)} <br/>
            `,
            userContent: prevState.userContent + `
            <div class="chip">
              <img src="${this.gravatarURL(msg.email)}">
              <a>${msg.username}</a>
            </div>
            <br/>
          `,
          }
        }else{
          return {
            chatContent: prevState.chatContent + `
              <div class="chip">
                <img src="${this.gravatarURL(msg.email)}">
                ${msg.username}
              </div>
              ${emojione.toImage(msg.message)} <br/>
            `,
            
          }
        }
        
      });
        
      const el = document.getElementById('chat-messages')
      // const el2 = document.getElementById('user-list')
      el.scrollTop = el.scrollHeight; // auto scroll to bottom
      // el2.scrollTop = el2.scrollHeight; // auto scroll to bottom
    })
  }

  send() {
    if (this.state.newMsg !== '') {
      this.ws.send(
        JSON.stringify({
          email: this.state.email,
          username: this.state.username,
          message: $('<p>').html(this.state.newMsg).text(), // strip out html
        })
      );
      // reset newMsg
      this.setState({
        newMsg: '',
      });
    }
  }

  join() {
    if (!this.state.email) {
      Materialize.toast('You must enter an email', 2000);
      return;
    }
    if (!this.state.username) {
      Materialize.toast('You must choose a username', 2000);
      return;
    }
    this.setState(prevState => {
      return {
        // userContent: prevState.userContent + `
        //     <div class="chip">
        //       <img src="${this.gravatarURL(this.state.email)}">
        //       <a>${this.state.username}</a>
        //     </div>
        //     <br/>
        //   `,
        email: $('<p>').html(prevState.email).text(),
        username: $('<p>').html(prevState.username).text(),
        joined: true,
      }
    });
  }

  gravatarURL(email) {
    const hash = MD5(email).toString();
    return `http://www.gravatar.com/avatar/${hash}`
  }

  updateEmail(e) {
    this.setState({
      email: e.target.value,
    })
  }

  updateUsername(e) {
    this.setState({
      username: e.target.value,
    })
  }

  updateMsg(e) {
    this.setState({
      newMsg: e.target.value,
    })
  }

  render() {
    let userInput;
    if (this.state.joined) {
      userInput = <ChatInput 
                    value={this.state.newMsg}
                    sendMessage={() => this.send()}
                    updateMsg={e => this.updateMsg(e)}/>
    } else {
      userInput = <Login
                    updateEmail={e => this.updateEmail(e)}
                    updateUsername={e => this.updateUsername(e)}
                    handleLogin={() => this.join()}
                    username={this.state.username} 
                    email={this.state.email}/>
    }
    return (
      <div>
        <header>
          <nav className="nav-wrapper">
            <a href="/" className="brand-logo right">
              Web Socket
            </a>
            <a href="/" className="brand-logo left">
              Hello {this.state.username}
            </a>
          </nav>
        </header>
        <main id="app">
          <ChatContent 
              chatContent={this.state.chatContent}
              userContent={this.state.userContent}
            />
          
          {userInput}
        </main>
        <footer className="page-footer">
        </footer>
      </div>
    );
  }
}

export default App;
