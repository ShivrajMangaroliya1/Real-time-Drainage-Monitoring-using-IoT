import React from "react";
// import {connect} from "react-redux";
import MapInit from "../componentsMain/map/MapInit";
import { Card, CardHeader, CardBody, Row, Col } from "reactstrap";
import { connect } from "react-redux";
import { getCurrentUser, clearError } from "../actions/index";

class Map extends React.Component {
  componentDidMount() {
    this.props.getCurrentUser();
  }
  componentWillUnmount() {
    this.props.clearError();
  }
  render() {
    if (!this.props.currentUser.username) {
      return (
        <h3 className="content text-primary text-center">
          please signin first
        </h3>
      );
    }
    return (
      <React.Fragment>
        <div className="content">
          <Row>
            <Col md="12">
              <Card className="card-plain">
                <CardHeader>Locations</CardHeader>
                <CardBody>
                  <div
                    id="map"
                    className="map"
                    style={{ position: "relative", overflow: "hidden" }}
                  >
                    <MapInit />
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { currentUser: { ...state.currentUser } };
};

export default connect(mapStateToProps, { getCurrentUser, clearError })(Map);
// export default connect(null)(Map)
