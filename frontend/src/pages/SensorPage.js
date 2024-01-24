import React from "react";
import { connect } from "react-redux";
import Sensor from "../componentsMain/sensor/Sensor";
import { getCurrentUser, clearError } from "../actions/index";

class SensorPage extends React.Component {
  componentDidMount() {
    this.props.getCurrentUser();
  }

  componentWillUnmount() {
    this.props.clearError();
  }

  // comp
  render() {
    if (!this.props.currentUser.username) {
      return (
        <h3 className="text-center content text-primary">
          please signIN first
        </h3>
      );
    }
    return (
      <div className="image">
        <div className="container">
          <div className="overlay position-overlay"></div>
          <div className="color text-center">
            <div className="color pt-5 h1">Let's Get Started Now</div>
          </div>
          <Sensor />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { currentUser: { ...state.currentUser } };
};

export default connect(mapStateToProps, { getCurrentUser, clearError })(
  SensorPage
);
