import React, { Component } from "react";
import { Link } from "react-router-dom";

class Home extends Component {
  render() {
    return (
      <div>
        <h1>Home Page</h1>
        <Link to="/signup" className="btn btn-outline-dark mx-5">
          signup
        </Link>
        <Link to="/signin" className="btn btn-outline-success ">
          signin
        </Link>
        <Link to="/signout" className="btn btn-danger">
          SignOut
        </Link>
        <Link to="/rs" className="btn btn-warning">
          createRs
        </Link>
        <Link to="/sensor" className="btn btn-info">
          createSensor
        </Link>
        <Link to="/admin/dashboard" className="btn btn-secondary">
          dashboards
        </Link>
      </div>
    );
  }
}

export default Home;
