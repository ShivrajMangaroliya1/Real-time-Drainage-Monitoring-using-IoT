import React from "react";
import { connect } from "react-redux";
import { removeSensor } from "../../actions/index";
import { ReactComponent as Logo } from "../../svg/setup_success.svg";
import { Link } from "react-router-dom";

class SensorShow extends React.Component {
  componentWillUnmount() {
    this.props.removeSensor();
  }
  render() {
    if (this.props.sensorCreated.name) {
      //   console.log(
      //     new Date(this.props.rsCreated.deployedDate).toLocaleTimeString()
      //   );
      //   console.log(this.props.rsCreated.deployedDate.toLocaleDateString());

      return (
        <div className="container">
          <div className="row align-items-center justify-content-between">
            <div className="d-none d-md-block">
              <Logo />
            </div>
            <div className="card h-50 col" style={{ marginLeft: 100 }}>
              <div
                className="card-header text-center"
                style={{ backgroundColor: "#5E63F7" }}
              >
                Your Sensor
              </div>
              <div className="card-body text-center text-warning">
                <div className="card-title">Details </div>
                <div className="card-text">
                  <b>Id:</b>
                  {this.props.sensorCreated.id},
                </div>
                <div className="card-text">
                  <b>Name</b>:{this.props.sensorCreated.name}
                </div>
                <div className="card-text">
                  <b>Type</b>
                  {this.props.sensorCreated.kind}
                </div>
                <div className="card-text">
                  <b>Coordinates</b>
                  {this.props.sensorCreated.location.Coordinates[0]},
                  {this.props.sensorCreated.location.Coordinates[1]}
                </div>
                <div className="card-text">
                  <b>deployedAt:</b>
                  {new Date(
                    this.props.sensorCreated.deployedDate
                  ).toLocaleDateString()}
                  ,
                  {new Date(
                    this.props.sensorCreated.deployedDate
                  ).toLocaleTimeString()}
                </div>
              </div>
              <Link to="/sensor" className="btn btn-info">
                attach sensor
              </Link>
              <Link to="/admin/dashboard" className="btn btn-success">
                Dashboard
              </Link>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div>
        <h1>SenserShow</h1>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { sensorCreated: { ...state.sensorEx } };
};

export default connect(mapStateToProps, { removeSensor })(SensorShow);
