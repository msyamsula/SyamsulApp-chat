import axios from "axios";
import { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as actions from "../actions/index.js";
import { socket } from "../connection/socket.js";
import { appendElementHTML } from "../utility/html.js";
import { output } from "../utility/output.js";
import { createToken, prepareHeaderConfig } from "../utility/token.js";
import "./GroupCreation.css";
// import { getAllUser } from "../utility/user.js";
// import { createToken } from "../utility/token.js";

class GroupCreation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      groupName: "",
      inviteList: {},
    };
  }

  createGroup = (e) => {
    e.preventDefault();
    let resp = this.validateGroupName()
    if (resp.status !== 200){
      console.log(resp.message);
    } else {
      let group = {
        name : this.state.groupName,
        memberIds : [this.props.user.id]
      }
      for(let [key, value] of Object.entries(this.state.inviteList)){
        if (value) group.memberIds.push(parseInt(key))
      }
      socket.emit("create_group", group, this.props.user.id)
      this.props.history.push("/chat")
    }
  };

  handleGroupName = async (e) => {
    e.preventDefault();
    await this.setState({
      groupName: e.target.value,
    });
  };

  componentDidMount = async () => {
    if (this.props.user === null) {
      this.props.history.push("/chat");
    } else {
      const token = createToken(this.props.user);
      const url = `${process.env.REACT_APP_SIGNIN_SERVER}/users`;
      let config = prepareHeaderConfig(token);

      try {
        let resp = await axios.get(url, config);
        const userList = resp.data.data;
        let cleanList = userList.filter((u) => {
          return u.username !== this.props.user.username;
        });
        cleanList.forEach((u) => {
          appendElementHTML(
            u,
            this.props.user,
            "inviteList",
            "button",
            this.invite
          );
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  invite = async (e) => {
    e.preventDefault();
    let list = this.state.inviteList;
    const id = e.target.id;
    const status = e.target.className.split(" ")[1];
    if (status === undefined) {
      e.target.className += " invited";
      list[id] = true;
    } else {
      e.target.className = e.target.className.split(" ")[0];
      list[id] = false;
    }

    await this.setState({
      inviteList: list,
    });
    console.log(this.state);
  };

  validateGroupName = ()=> {
    const name = this.state.groupName
    if (name === ""){
      return output(500, "group name empty", [])
    } else if (name.length < 6){
      return output(500, "group name is too short, at least 6")
    }

    return output(200, "success", [])
  }

  render() {
    return (
      <div>
        <h5>group name</h5>
        <input onChange={this.handleGroupName}></input>
        <div id="inviteList"></div>
        <button onClick={this.createGroup}>create</button>
        <Link to="/chat">
          <button>cancel</button>
        </Link>
      </div>
    );
  }
}

let mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps, actions)(GroupCreation);
