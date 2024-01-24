import React from "react";
import { connect } from "react-redux";
import SignInForm from "../common/SignInForm";
import { SignInAction } from "../../actions/index";

class SignIn extends React.Component {
  onSubmitHandler = (formData) => {
    this.props.SignInAction(formData);
  };

  render() {
    // if (this.props.errors.length > 0) {
    //   return this.props.errors.map((error, i) => {
    //     <div className="aleat" key={i}>
    //       {error.msg}
    //     </div>;
    //   });
    // }
    return (
      <SignInForm {...this.props} onSubmitHandler={this.onSubmitHandler} />
    );
  }
}

const stateMapToProps = (state, ownProps) => {
  return { errors: [...state.errors] };
};

export default connect(stateMapToProps, { SignInAction })(SignIn);
