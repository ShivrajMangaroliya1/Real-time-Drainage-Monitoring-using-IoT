import React from "react";
import { connect } from "react-redux";
import SignUp from "../componentsMain/auth/SignUp";
// import { CleaningCurrentUser } from "../actions/index";
import "../style/SignUpPage.css";

class SignUpPage extends React.Component {
  // componentDidMount() {
  //   this.props.CleaningCurrentUser();
  // }
  render() {
    // console.log(this.props.errors);
    if (this.props.currentUser.err) {
      return this.props.currentUser.err.map((err) => {
        return <div key={err.message}>{err.message}</div>;
      });
    }
    return (
      <div className="image">
        <div className="container">
          <div className="overlay position-overlay"></div>
          <div className="color text-center">
            <div className="color pt-5 h1">Let's Get Started Now</div>
            <p className="color h5">Create An account for monitoring</p>
          </div>
          <SignUp />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { currentUser: { ...state.currentUser } };
};

export default connect(mapStateToProps)(SignUpPage);
