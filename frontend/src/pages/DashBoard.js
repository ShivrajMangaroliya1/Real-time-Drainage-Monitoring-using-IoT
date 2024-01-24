import React from "react";
// import MapInit from "../componentsMain/map/MapInit";
// import Admin from "../layouts/Admin/Admin.js";
import classNames from "classnames";
import { connect } from "react-redux";
import {
  getAllFault,
  getCurrentUser,
  clearError,
  getAllSensor,
  getALLRs,
} from "../actions/index";
import { Link } from "react-router-dom";
// import { socket } from "../socket/socketConn";
import {
  Button,
  ButtonGroup,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
} from "reactstrap";
import ChartLine from "../componentsMain/chart/ChartLine";
import { socket } from "socket/socketConn";

class DashBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bigChartData: "data1",
    };
  }
  componentDidMount() {
    this.props.getCurrentUser();
    this.props.getALLRs();
    this.props.getAllSensor();
    this.props.getAllFault(1);
    socket.on("fault", (data) => {
      this.props.getAllFault(1);
    });
    socket.on("rs", (data) => {
      //remaining on server side bcoz of circular dependency between(index.js,route of rs) server
      this.props.getALLRs();
    });
    socket.on("sensor", (data) => {
      //remaining on server side bcoz of circular dependency between(index.js,route of sensor) server
      this.props.getAllSensor();
    });
  }

  componentWillUnmount() {
    this.props.clearError();
    socket.off("fault", () => console.log("fault listener removed"));
    socket.off("rs", () => console.log("rs listener removed"));
    socket.off("sensor", () => console.log("sensor listener removed"));
    // socket.off("chartDataReturn", () => console.log("clear"));
  }
  setBgChartData = (name) => {
    this.setState({ bigChartData: name });
  };
  render() {
    if (this.props.currentUser.username) {
      return (
        <React.Fragment>
          <div className="content">
            <Row>
              <Col lg="3">
                <Card>
                  <CardBody>
                    <div className="d-flex justify-content-around align-items-center">
                      <div className="text-center">
                        <h4 className="card-category">AREA COVERED</h4>
                        <h1 className="display-3">763,215</h1>
                      </div>
                      <i
                        className="tim-icons icon-delivery-fast text-primary"
                        style={{ fontSize: "3rem" }}
                      />
                    </div>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="3">
                <Card>
                  <CardBody>
                    <div className="d-flex justify-content-around align-items-center">
                      <div className="text-center">
                        <h4 className="card-category">TOTAL PROCESSOR</h4>
                        <h1 className="display-3">
                          {this.props.rs && (this.props.rs.length || "Loading")}
                        </h1>
                      </div>
                      <i
                        className="tim-icons icon-planet text-warning"
                        style={{ fontSize: "2.5rem" }}
                      />
                    </div>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="3">
                <Card>
                  <CardBody>
                    <div className="d-flex justify-content-around align-items-center">
                      <div className="text-center">
                        <h4 className="card-category">TOTAL SENSOR</h4>
                        <h1 className="display-3">
                          {this.props.sensor &&
                            (this.props.sensor.length || "Loading")}
                        </h1>
                      </div>
                      <i
                        className="tim-icons icon-spaceship text-success"
                        style={{ fontSize: "2.5rem" }}
                      />
                    </div>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="3">
                <Card>
                  <CardBody>
                    <div className="d-flex justify-content-around align-items-center">
                      <div className="text-center">
                        <h4 className="card-category">Issues Discovered</h4>
                        <h1 className="display-3">
                          {this.props.fault.allFault &&
                            (this.props.fault.total || "Loading")}
                        </h1>
                      </div>
                      <i
                        className="tim-icons icon-alert-circle-exc text-danger"
                        style={{ fontSize: "2.5rem" }}
                      />
                    </div>
                  </CardBody>
                </Card>
              </Col>
            </Row>
            <Row>
              <Col xs="12">
                <Card className="card-chart">
                  <CardHeader>
                    <Row>
                      <Col className="text-left" sm="6">
                        <h5 className="card-category">Issues</h5>
                        <CardTitle tag="h2">Performance</CardTitle>
                      </Col>
                      <Col sm="6">
                        <ButtonGroup
                          className="btn-group-toggle float-right"
                          data-toggle="buttons"
                        >
                          <Button
                            tag="label"
                            className={classNames("btn-simple", {
                              active: this.state.bigChartData === "data1",
                            })}
                            color="info"
                            id="0"
                            size="sm"
                            onClick={() => this.setBgChartData("data1")}
                          >
                            <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                              Monthly
                            </span>
                            <span className="d-block d-sm-none">
                              <i className="tim-icons icon-single-02" />
                            </span>
                          </Button>
                        </ButtonGroup>
                      </Col>
                    </Row>
                  </CardHeader>
                  <CardBody>
                    <div className="chart-area">
                      {/*<Line
                      data={chartExample1[this.state.bigChartData]}
                      options={chartExample1.options}
                    />*/}
                      <ChartLine />
                    </div>
                  </CardBody>
                </Card>
              </Col>
            </Row>

            <Row>
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">Detected Issues</CardTitle>
                </CardHeader>
                <CardBody>
                  <Table className="tablesorter" responsive>
                    <thead className="text-primary">
                      <tr>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Situation</th>
                        <th className="text-center">solved</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.props.fault.allFault &&
                        this.props.fault.allFault.map((item, i) => {
                          // console.log(item);
                          return (
                            <React.Fragment key={i}>
                              <tr>
                                <td>{new Date(item.date).toDateString()}</td>
                                <td>
                                  {new Date(item.date).toLocaleTimeString()}
                                </td>
                                <td>{item.situation}</td>
                                <td className="text-center">{item.solved}</td>
                              </tr>
                            </React.Fragment>
                          );
                        })}
                    </tbody>
                  </Table>
                  <Link to="/admin/issue">
                    <Button className="btn" color="primary">
                      See More
                    </Button>
                  </Link>
                </CardBody>
              </Card>
            </Row>
          </div>
        </React.Fragment>
      );
    }
    return (
      <div className="content text-center text-primary">Please Signup</div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  // console.log(ownProps);
  return {
    fault: { ...state.fault },
    currentUser: { ...state.currentUser },
    rs: [...state.rs],
    sensor: [...state.sensor],
  };
};

export default connect(mapStateToProps, {
  getAllFault,
  getCurrentUser,
  clearError,
  getAllSensor,
  getALLRs,
})(DashBoard);
