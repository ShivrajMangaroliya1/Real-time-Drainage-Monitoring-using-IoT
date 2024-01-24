import React from "react";
import { Field, reduxForm } from "redux-form";
// import {
//   UncontrolledDropdown,
//   DropdownToggle,
//   DropdownMenu,
//   DropdownItem,
// } from "reactstrap";

class RsForm extends React.Component {
  showInput = ({ input, meta: { touched, error }, label, dis }) => {
    if (dis == "text") {
      return (
        <div className="form-group">
          <label>{label}</label>
          <input type={dis} {...input} className="form-control" />
          <div className="text-danger">{touched ? error : null}</div>
        </div>
      );
    }
    return (
      <div>
        <label>{label}</label>
        <select className="custom-select bg-black" {...input}>
          <option className="bg-input" />
          <option value="rs2" style={{ backgroundColor: "#27293D" }}>
            RaspberryPi-2
          </option>
          <option value="rs3" style={{ backgroundColor: "#27293D" }}>
            RaspberryPi-3
          </option>
          <option value="rs4" style={{ backgroundColor: "#27293D" }}>
            RaspberryPi-4
          </option>
        </select>
        <div className="text-danger">{touched ? error : null}</div>
      </div>
      // <UncontrolledDropdown>
      //   <DropdownToggle caret data-toggle="dropdown">
      //     Dropdown button
      //   </DropdownToggle>
      //   <DropdownMenu className="dropdown-black">
      //     <DropdownItem>Action</DropdownItem>
      //     <DropdownItem>Another Action</DropdownItem>
      //     <DropdownItem>Something else here</DropdownItem>
      //   </DropdownMenu>
      // </UncontrolledDropdown>
    );
  };

  // showDropDown = ({ input, meta: { touched, error }, label, dis }) => {
  //   return (
  //     <div>
  //       <select className="custom-select">
  //         <option value="rs2" selected>
  //           RaspberryPi-2
  //         </option>
  //         <option value="rs3">RaspberryPi-3</option>
  //         <option value="rs4">RaspberryPi-4</option>
  //       </select>
  //       {touched ? error : null}
  //     </div>
  //   );
  // };
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
                name="name"
                component={this.showInput}
                label="name"
                dis="text"
              />
              <Field
                name="version"
                component={this.showInput}
                label="version"
                dis="drop"
              />
              <Field
                name="values"
                component={this.showInput}
                label="GeoLocation"
                dis="text"
              />
              <div className="text-small text-center text-danger">
                {this.props.errors.map((error, i) => (
                  <div key={i} className="text-danger">
                    {error.message}
                  </div>
                ))}
              </div>
              <button type="submit" className="btn btn-primary btn-block my-3">
                create
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const validate = (formData) => {
  console.log(formData);
  const errors = {};
  if (!formData.name) {
    errors.name = "must add name";
  }
  if (!formData.version) {
    errors.version = "must add version";
  }
  if (!formData.values) {
    errors.values = "must add geolocation";
  }
  return errors;
};

export default reduxForm({ form: "Rs", validate })(RsForm);
