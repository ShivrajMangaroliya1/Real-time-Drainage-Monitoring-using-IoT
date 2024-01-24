import React from "react";
import { connect } from "react-redux";
import Modal from "../common/Modal";
import history from "../../history/history";
import { SignOutAction} from "../../actions/index";

class SignOut extends React.Component {
  afterSuccess = () => {
    history.push("/");
  };

  deleteMain = () => {
    this.props.SignOutAction();
  };

  render() {
    return (
      <Modal
        afterSuccess={this.afterSuccess}
        deleteMain={this.deleteMain}
        currentUser={this.props.currentUser}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { currentUser: state.currentUser };
};

export default connect(mapStateToProps, { SignOutAction })(SignOut);
