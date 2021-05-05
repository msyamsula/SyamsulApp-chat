import { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import * as actions from "../actions/index.js"
import { getTokenFromURL } from "../utility/token";

class App extends Component {

  componentDidMount = async () => {
    const token = getTokenFromURL(window.location.href)
    console.log(token);
    if (token === undefined){
        
    } else {
        await this.props.setCurrentUser(token)
    }
    this.props.history.push("/chat")
  };

  render() {
    return <div>Loading, Please Wait</div>;
  }
}

export default withRouter(connect(null, actions)(App));
