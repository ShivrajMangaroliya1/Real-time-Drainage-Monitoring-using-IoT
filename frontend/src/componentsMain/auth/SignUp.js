import React from "react";
import { connect } from "react-redux";
import SignUpForm from "../common/SignUpForm";
import { SignUpAction } from "../../actions/index";

class SignUp extends React.Component {
  onSubmitHandler = (formdata) => {
    this.props.SignUpAction(formdata);
  };
  render() {
    return (
      <SignUpForm {...this.props} onSubmitHandler={this.onSubmitHandler} />
    );
  }
}

const stateMapToProps = (state, ownProps) => {
  return { errors: [...state.errors] };
};

export default connect(stateMapToProps, { SignUpAction })(SignUp);
