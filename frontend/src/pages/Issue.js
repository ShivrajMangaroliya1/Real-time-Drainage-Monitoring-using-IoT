import React from "react";
import { connect } from "react-redux";
import {
  getAllFault,
  getCurrentUser,
  clearError,
  deletedFault,
  changePage,
} from "../actions/index";
import { io, socket } from "../socket/socketConn";
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
  Button,
} from "reactstrap";

class Issue extends React.Component {
  componentDidMount() {
    this.props.getCurrentUser();
    this.props.getAllFault(1);
    socket.on("fault", (data) => {
      this.props.getAllFault(1);
    });
  }

  // componentDidUpdate() {
  //   this.props.getAllFault(1);
  // }
  componentWillUnmount() {
    this.props.clearError();
    socket.off("fault", () => console.log("fault removed"));
  }

  successHandler = (id) => {
    console.log(id);
    this.props.deletedFault(id);
  };

  falsePositiveHandler = (id) => {
    console.log(id);
    this.props.deletedFault(id);
  };

  render() {
    // console.log(this.props);
    if (!this.props.currentUser.username) {
      return (
        <h3 className="text-center content text-primary">
          please Signin First
        </h3>
      );
    }

    if (this.props.fault.allFault) {
      return (
        <React.Fragment>
          <div className="content">
            <Row>
              <Col md="12">
                <Card>
                  <CardHeader>
                    <CardTitle tag="h4">Issues</CardTitle>
                  </CardHeader>
                  <CardBody>
                    <Table className="tablesorter" responsive>
                      <thead className="text-primary">
                        <tr>
                          <th>Date</th>
                          <th>Time</th>
                          <th>Sensors</th>
                          <th>Rs</th>
                          <th>Measures</th>
                          <th>Situation</th>
                          <th>solved</th>
                          <th className="text-center">action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.props.fault.allFault.map((item, i) => {
                          return (
                            <React.Fragment key={i}>
                              <tr>
                                <td>{new Date(item.date).toDateString()}</td>
                                <td>
                                  {new Date(item.date).toLocaleTimeString()}
                                </td>
                                <td>
                                  {item.sensor.map((sensor, i) => {
                                    return <p key={i}>{sensor.name}</p>;
                                  })}
                                </td>
                                <td>{item.rs.name}</td>
                                <td>
                                  {item.data.map((data, i) => {
                                    return <p key={i}>{data}</p>;
                                  })}
                                </td>
                                <td>{item.situation}</td>
                                <td>{item.solved}</td>
                                <td className="text-center">
                                  <i
                                    className="tim-icons icon-trash-simple text-danger ml-3"
                                    onClick={() =>
                                      // this.falsePositiveHandler(item._id)
                                      this.props.changePage(
                                        `/admin/issue/${item._id}`
                                      )
                                    }
                                    style={{ cursor: "pointer" }}
                                  />
                                </td>
                              </tr>
                            </React.Fragment>
                          );
                        })}
                      </tbody>
                    </Table>
                  </CardBody>
                </Card>
                {this.props.fault.pagination.prev && (
                  <Button
                    onClick={() =>
                      this.props.getAllFault(
                        this.props.fault.pagination.prev.page
                      )
                    }
                    color="primary"
                  >
                    prev
                  </Button>
                )}
                {this.props.fault.pagination.next && (
                  <Button
                    onClick={() =>
                      this.props.getAllFault(
                        this.props.fault.pagination.next.page
                      )
                    }
                    color="primary"
                  >
                    Next
                  </Button>
                )}
              </Col>
            </Row>
          </div>
        </React.Fragment>
      );
    }
    return <div>Loading</div>;
  }
}

const mapStateToProps = (state, ownProps) => {
  // return {
  //   faultList: [...state.fault.allFault],
  //   total: state.fault.total,
  //   pagination: { ...state.fault.pagination },
  // };
  return { fault: { ...state.fault }, currentUser: { ...state.currentUser } };
};

export default connect(mapStateToProps, {
  getAllFault,
  getCurrentUser,
  clearError,
  deletedFault,
  changePage,
})(Issue);
