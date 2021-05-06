import { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions/index.js";
import { getAllUser } from "../utility/user.js";
import { createToken } from "../utility/token.js";
import { appendElementHTML } from "../utility/html.js";

class Users extends Component {
  appendFriendBox = (userData) => {
    let element = document.createElement("button");
    let text = document.createTextNode(userData.username);
    element.appendChild(text);

    let order = [this.props.user.username, userData.username];
    order.sort();
    const room = `${order[0]}-${order[1]}`;
    element.id = room;
    document.getElementById("friendBox").appendChild(element);
  };

  chooseRoom = (e) => {
    e.preventDefault();
    this.props.setRoom(e.target.className);
    window.location.reload();
  }
  
  componentDidMount = async () => {
    if (this.props.user === null) {
    } else {
      const token = createToken(this.props.user);
      let resp = await getAllUser(token);
      let userList = resp.data;
      let cleanList = userList.filter((u) => {
        return u.id !== this.props.user.id;
      });

      cleanList.forEach((u) => {
        appendElementHTML(u, this.props.user, "friendBox", "button", this.chooseRoom)
      });
    }
  };

  render() {
    return (
      <div>
        <h1>Users</h1>
        <div id="friendBox"></div>
      </div>
    );
  }
}

let mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps, actions)(Users);
