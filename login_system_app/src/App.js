import React from "react";
import { connect } from "react-redux";
import { Switch, Route, withRouter } from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/register";
class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route path="/" exact>
          <Register />
        </Route>
        <Route path="/login" exact>
          <Login />
        </Route>
      </Switch>
    );
  }
}
const mapStateToProps = () => ({});

const mapDispatchProps = {};

export default connect(mapStateToProps, mapDispatchProps)(withRouter(App));
