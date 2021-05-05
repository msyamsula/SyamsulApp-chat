import { Component } from "react";
import { connect } from "react-redux";
import { socket } from "../connection/socket.js";
import * as actions from "../actions/index.js";
import Friends from "./Friends.js";

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myMessage: "",
    };
  }

  appendChatBox = (text) => {
    let node = document.createElement("div");
    let textNode = document.createTextNode(text);
    node.appendChild(textNode);
    document.getElementById("chatBox").appendChild(node);
  };

  componentDidMount = async () => {
    if (this.props.room === null) {
    } else {
      socket.emit("init", this.props.room);
      socket.once("initReply", (data) => {
        console.log(data);
        data.forEach((d) => {
          this.appendChatBox(d.text);
        });
      });
      socket.on(this.props.room, async (msg) => {
        this.appendChatBox(msg);
      });
    }
  };

  handleMyMessage = async (e) => {
    e.preventDefault();
    await this.setState({
      myMessage: e.target.value,
    });
  };

  send = async (e) => {
    e.preventDefault();
    const msg = {
      room: this.props.room,
      text: this.state.myMessage
    };
    this.appendChatBox(this.state.myMessage);
    socket.emit("messaging", msg);
    await this.setState({
      myMessage: "",
    });
  };

  destroy = (e) => {
    e.preventDefault();
    localStorage.removeItem("persist:root");
    window.location.href = process.env.REACT_APP_SIGNIN_CLIENT;
  };

  render() {
    if (this.props.user === null) {
      return <div>forbidden</div>;
    } else {
      return (
        <div className="Chat">
          <Friends></Friends>
          <div id="chatBox"></div>
          <input
            id={"chatInput"}
            value={this.state.myMessage}
            onChange={this.handleMyMessage}
          ></input>
          <button onClick={this.send}>send</button>
          <button onClick={this.destroy}>home</button>
        </div>
      );
    }
  }
}

let mapStateToProps = (state) => {
  return {
    user: state.user,
    room: state.room
  };
};

export default connect(mapStateToProps, actions)(Chat);
