import React from "react";
import { Field, reduxForm } from "redux-form";

class SensorForm extends React.Component {
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
          <option
            value="distance sensor"
            style={{ backgroundColor: "#27293D" }}
          >
            Distance Sensor
          </option>
          <option value="gas sensor" style={{ backgroundColor: "#27293D" }}>
            Gas Sensor
          </option>
          <option
            value="waterflow sensor"
            style={{ backgroundColor: "#27293D" }}
          >
            WaterFlow Sensor
          </option>
        </select>
        <div className="text-danger">{touched ? error : null}</div>
      </div>
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
        style={{ minHeight: "70vh", overflowY: "hidden" }}
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
                name="kind"
                component={this.showInput}
                label="type"
                dis="drop"
              />
              <Field
                name="values"
                component={this.showInput}
                label="GeoLocation"
                dis="text"
              />
              <Field
                name="rsId"
                component={this.showInput}
                label="RsId"
                dis="text"
              />

              <div className="text-small text-center text-danger">
                {this.props.errors.map((error, i) => (
                  <div key={i} className="text-danger">
                    {error.msg}
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
    errors.name = "must add sensor name";
  }
  if (!formData.kind) {
    errors.kind = "must add type of sensor";
  }
  if (!formData.values) {
    errors.values = "must add Geolocation of senose";
  }
  if (!formData.rsId) {
    errors.rsId = "must add your raspberrypi id";
  }
  return errors;
};

export default reduxForm({ form: "Senser", validate })(SensorForm);
