import React from "react";
import { Field, reduxForm } from "redux-form";

class FaultDeleteForm extends React.Component {
  showInput = ({ input, meta: { touched, invalid, error }, label, d }) => {
    if (d == "id") {
      return (
        <div className="form-group">
          <label>{label}</label>
          <input
            type="text"
            value={this.props.idPath}
            disabled
            className="form-control"
          />
          {touched ? error : null}
        </div>
      );
    }
    return (
      <div className="form-group">
        <label>{label}</label>
        <textarea type="text" {...input} className="form-control" rows="50" />
        {touched ? error : null}
      </div>
    );
  };
  render() {
    console.log(this.props.idPath);
    return (
      <div
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "100vh" }}
      >
        <div className="card margin rounded w-50 ml-5">
          <div className="card-body">
            <form
              onSubmit={this.props.handleSubmit(this.props.onSubmitHandler)}
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-around",
              }}
            >
              <Field name="id" component={this.showInput} label="id" d="id" />
              <Field
                name="action"
                component={this.showInput}
                label="action"
                d="action"
              />
              <button type="submit" className="btn btn-info btn-block my-3">
                Delete
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const validate = (formData) => {
  const errors = {};
  // if (!formData.id) {
  //   errors.id = "must enter id";
  // }
  if (!formData) {
    errors.action = "must enter action";
  }
  return errors;
};

export default reduxForm({ form: "faultdelete", validate })(FaultDeleteForm);
