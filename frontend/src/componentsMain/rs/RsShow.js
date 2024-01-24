import React from "react";
import { connect } from "react-redux";
import { removeRs } from "../../actions/index";
import { ReactComponent as Logo } from "../../svg/setup_success.svg";
import { Link } from "react-router-dom";

class RsShow extends React.Component {
  componentWillUnmount() {
    this.props.removeRs();
  }
  render() {
    if (this.props.rsCreated.name) {
      console.log(
        new Date(this.props.rsCreated.deployedDate).toLocaleTimeString()
      );
      //   console.log(this.props.rsCreated.deployedDate.toLocaleDateString());

      return (
        <div className="container">
          <div className="row d-flex align-items-center justify-content-between">
            <div className="d-none d-md-block">
              <Logo />
            </div>
            <div className="card h-50 col" style={{ marginLeft: 100 }}>
              <div
                className="card-header text-center"
                style={{ backgroundColor: "#5E63F7" }}
              >
                Your RaspberryPi
              </div>
              <div className="card-body text-center text-warning">
                <div className="card-title">Details </div>
                <div className="card-text">
                  <b>Id:</b>
                  {this.props.rsCreated.id},(copy this)
                </div>
                <div className="card-text">
                  <b>Name</b>:{this.props.rsCreated.name}
                </div>
                <div className="card-text">
                  <b>version</b>
                  {this.props.rsCreated.version}
                </div>
                <div className="card-text">
                  <b>Coordinates</b>
                  {this.props.rsCreated.location.Coordinates[0]},
                  {this.props.rsCreated.location.Coordinates[1]}
                </div>
                <div className="card-text">
                  no of sensor connected to this rs{" "}
                  {this.props.rsCreated.sensorId.length}
                </div>
                <div className="card-text">
                  <b>deployedAt:</b>
                  {new Date(
                    this.props.rsCreated.deployedDate
                  ).toLocaleDateString()}
                  ,
                  {new Date(
                    this.props.rsCreated.deployedDate
                  ).toLocaleTimeString()}
                </div>
              </div>
              <Link to={"/sensor"} className="btn btn-info" style={{}}>
                Attach Sensor
              </Link>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div>
        <h1>RsShow</h1>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { rsCreated: { ...state.rs } };
};

export default connect(mapStateToProps, { removeRs })(RsShow);
