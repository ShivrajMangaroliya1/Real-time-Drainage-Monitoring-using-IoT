import React from "react";
import { connect } from "react-redux";
import SignIn from "../componentsMain/auth/SignIn";
import { clearError } from "../actions/index";

class SignInPage extends React.Component {
  // componentDidMount() {
  //   this.props.CleaningCurrentUser();
  // }

  componentWillUnmount() {
    this.props.clearError();
  }

  // comp
  render() {
    // console.log(this.props.errors);
    // if (this.props.currentUser.err) {
    //   return this.props.currentUser.err.map((err, i) => {
    //     return <div key={i}>{err.msg}</div>;
    //   });
    // }
    return (
      <div className="image">
        <div className="container">
          <div className="overlay position-overlay"></div>
          <div className="color text-center">
            <div className="color pt-5 h1">Let's Get Started Now</div>
            <p className="color h5">Log in to account for monitoring</p>
          </div>

          <SignIn />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { currentUser: { ...state.currentUser } };
};

export default connect(mapStateToProps, { clearError })(SignInPage);
