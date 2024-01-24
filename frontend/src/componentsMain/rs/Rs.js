import React from "react";
import { connect } from "react-redux";
import RsForm from "../common/RsForm";
import { getGeoLocation, createRs } from "../../actions/index";

class Rs extends React.Component {
  // componentDidMount() {
  //   this.props.getGeoLocation();
  // }

  onSubmitHandler = (formData) => {
    // const values = [this.props.geo[0], this.props.geo[1]];
    // console.log({ ...formData, values });
    // this.props.createRs({ ...formData, values });
    const [latitude, longitude] = formData.values.split(",");
    console.log(latitude, longitude);
    const obj = {
      ...formData,
      values: [parseFloat(latitude), parseFloat(longitude)],
    };
    console.log(obj);
    this.props.createRs(obj);
  };

  render() {
    // if (this.props.errors.length > 0) {
    //   return this.props.errors.map((error, i) => {
    //     <div className="aleat" key={i}>
    //       {error.msg}
    //     </div>;
    //   });
    // }
    return <RsForm {...this.props} onSubmitHandler={this.onSubmitHandler} />;
  }
}

const stateMapToProps = (state, ownProps) => {
  // return { errors: [...state.errors], geo: [...state.geo] };
  return { errors: [...state.errors] };
};

export default connect(stateMapToProps, { getGeoLocation, createRs })(Rs);
