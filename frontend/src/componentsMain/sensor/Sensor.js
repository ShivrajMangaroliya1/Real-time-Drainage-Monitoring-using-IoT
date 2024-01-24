import React from "react";
import { connect } from "react-redux";
import SensorForm from "../common/SensorForm";
import { createSensor } from "../../actions/index";

class Sensor extends React.Component {
  onSubmitHandler = (formData) => {
    const [latitude, longitude] = formData.values.split(",");
    console.log(latitude, longitude);

    const obj = {
      ...formData,
      values: [parseFloat(latitude), parseFloat(longitude)],
    };
    console.log(obj);
    this.props.createSensor(obj);
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
      <SensorForm {...this.props} onSubmitHandler={this.onSubmitHandler} />
    );
  }
}

const stateMapToProps = (state, ownProps) => {
  return { errors: [...state.errors] };
};

export default connect(stateMapToProps, { createSensor })(Sensor);
