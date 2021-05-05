import { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions/index.js";
import { getAllUser } from "../utility/user.js";
import { createToken } from "../utility/token.js";

class Friends extends Component {
  appendFriendBox = (userData) => {
    let element = document.createElement("button");
    let text = document.createTextNode(userData.username);
    element.appendChild(text);

    let order = [this.props.user.username, userData.username];
    order.sort();
    const room = `${order[0]}-${order[1]}`;
    element.onclick = (e) => {
      e.preventDefault();
      this.props.setRoom(e.target.id);
      window.location.reload();
    };
    element.id = room;
    document.getElementById("friendBox").appendChild(element);
  };

  componentDidMount = async () => {
    let element = document.createElement("button");
    let text = document.createTextNode("global");
    element.appendChild(text);
    element.onclick = (e) => {
      e.preventDefault();
      this.props.setRoom("global");
      window.location.reload()
    };
    document.getElementById("friendBox").appendChild(element)
    if (this.props.user === null) {
    } else {
      const token = createToken(this.props.user);
      let resp = await getAllUser(token);
      let userList = resp.data;
      let cleanList = userList.filter((u) => {
        return u.id !== this.props.user.id;
      });

      cleanList.forEach((u) => {
        this.appendFriendBox(u);
      });
    }
  };

  render() {
    return <div id="friendBox"></div>;
  }
}

let mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps, actions)(Friends);
