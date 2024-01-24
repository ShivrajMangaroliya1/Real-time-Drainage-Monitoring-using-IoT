import React from "react";
import { Field, reduxForm } from "redux-form";
import { Link } from "react-router-dom";

class SignUpForm extends React.Component {
  showInput = ({ input, meta: { touched, invalid, error }, label, dis }) => {
    console.log(input);
    return (
      <div className="form-group">
        <label>{label}</label>
        <input type={dis} {...input} className="form-control" />
        {touched ? error : null}
      </div>
    );
  };
  render() {
    return (
      <div
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "70vh" }}
      >
        <div className="card margin rounded w-50">
          <div className="card-body">
            <form
              onSubmit={this.props.handleSubmit(this.props.onSubmitHandler)}
            >
              <Field
                name="username"
                component={this.showInput}
                label="username"
                dis="text"
              />
              <Field
                name="password"
                component={this.showInput}
                label="password"
                dis="password"
              />
              <button type="submit" className="btn btn-info btn-block my-3">
                Signup
              </button>
              <div className="text-small text-center text-danger">
                {this.props.errors.map((error, i) => (
                  <div key={i}>{error.message}</div>
                ))}
              </div>
              <p className="text-center text-small">
                Already have account? <Link to="/signin">signin</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const validate = (formData) => {
  const errors = {};
  if (!formData.username) {
    errors.username = "must enter username";
  }
  if (!formData.password) {
    errors.password = "must enter password";
  }
  return errors;
};

export default reduxForm({ form: "singup", validate })(SignUpForm);
