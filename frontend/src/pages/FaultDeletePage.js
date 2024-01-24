import React from "react";
import { connect } from "react-redux";
import FaultDelete from "../componentsMain/fault/FaultDelete";
import { getCurrentUser, clearError } from "../actions/index";

class FaultDeletePage extends React.Component {
  componentDidMount() {
    this.props.getCurrentUser();
  }
  componentWillUnmount() {
    this.props.clearError();
  }
  render() {
    if (!this.props.currentUser.username) {
      return (
        <h3 className="text-center content text-primary">
          Please Sign in first
        </h3>
      );
    }
    return (
      <React.Fragment>
        <FaultDelete />
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { currentUser: { ...state.currentUser } };
};
export default connect(mapStateToProps, { getCurrentUser, clearError })(
  FaultDeletePage
);
