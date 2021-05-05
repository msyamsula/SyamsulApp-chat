import { React, Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./index.css";
import "materialize-css/dist/css/materialize.min.css";
import { connect } from "react-redux";
import * as actions from "./actions/index.js";
import Entrypoint from "./Entrypoint/Entrypoint";
import Chat from "./Chat/Chat";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/chat" component={Chat}></Route>
          <Route path="/entrypoint" component={Entrypoint}></Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default connect(null, actions)(App);
