import React from "react";
import { connect } from "react-redux";
import L from "leaflet";
import {
  MapContainer,
  TileLayer,
  Popup,
  Marker,
  Polyline,
  Circle,
  Tooltip,
} from "react-leaflet";
import { getGeoLocation, getALLRs, getAllSensor } from "../../actions/index";
import { io, socket } from "../../socket/socketConn";
// import "leaflet/dist/leaflet.css";
import "../../style/map.css";

class MapInit extends React.Component {
  state = {
    latLng: [[], []],
    overLatLng: [],
  };

  componentDidMount() {
    this.props.getGeoLocation();
    this.props.getALLRs();
    this.props.getAllSensor();
    socket.on("fault", (fault) => {
      const ans = this.props.sensorList.filter((s, i) => {
        for (let i = 0; i < fault.sensor.length; i++) {
          // console.log(fault.sensor[i], s.id);
          if (fault.sensor[i] == s.id) {
            return true;
          }
        }
      });

      //here if ans ==1 is remaining for overflow condition
      if (ans.length == 1) {
        console.log("inner");
        console.log(ans[0].location.Coordinates);
        this.setState({ overLatLng: [...ans[0].location.Coordinates] });
      }

      if (ans.length > 1) {
        // console.log("answer", ans);
        // console.log("ansLocation", [
        //   [...ans[0].location.Coordinates],
        //   [...ans[1].location.Coordinates],
        // ]);
        this.setState((prev) => {
          return {
            latLng: [
              [...ans[0].location.Coordinates],
              [...ans[1].location.Coordinates],
            ],
          };
        });
      }
    });
  }

  componentWillUnmount() {
    socket.off("fault", () => console.log("fault listner removed"));
  }
  getIconRs() {
    return L.icon({
      iconUrl:
        "https://img.icons8.com/external-flatart-icons-flat-flatarticons/64/000000/external-map-brazilian-carnival-flatart-icons-flat-flatarticons.png",
      iconSize: [64, 64],
      iconAnchor: [24, 24],
    });
  }

  getIconSensor() {
    return L.icon({
      iconUrl: "https://img.icons8.com/ios/50/000000/marker-storm--v1.png",
      iconSize: [64, 64],
      iconAnchor: [24, 24],
    });
  }

  getIconHome() {
    return L.icon({
      iconUrl: "https://img.icons8.com/ios/50/000000/order-delivered.png",
      iconSize: [64, 64],
      iconAnchor: [24, 24],
    });
  }

  render() {
    if (this.props.center.length > 0) {
      // console.log(this.props.center);
      return (
        <MapContainer
          center={this.props.center}
          zoom={1000}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {this.props.rsList.length > 0
            ? this.props.rsList.map((rs, i) => {
                // console.log(rs);
                return (
                  <Marker
                    position={rs.location.Coordinates}
                    icon={this.getIconRs()}
                    key={i}
                  >
                    <Popup>
                      <h6 style={{ color: "ThreeDDarkShadow" }}>{rs.name}</h6>
                      <h6 style={{ color: "ThreeDDarkShadow" }}>
                        {rs.version}
                      </h6>
                    </Popup>
                  </Marker>
                );
              })
            : null}

          {this.props.sensorList.length > 0
            ? this.props.sensorList.map((sensor, i) => {
                // console.log(rs);
                return (
                  <Marker
                    position={sensor.location.Coordinates}
                    key={i}
                    // icon={this.getIconSensor()}
                  >
                    <Popup>
                      <h6 style={{ color: "ThreeDDarkShadow" }}>{sensor.id}</h6>
                      <h6 style={{ color: "ThreeDDarkShadow" }}>
                        {sensor.name}
                      </h6>
                      <h6 style={{ color: "ThreeDDarkShadow" }}>
                        {sensor.kind}
                      </h6>
                    </Popup>
                  </Marker>
                );
              })
            : null}

          <Polyline positions={this.state.latLng} color="red">
            <Tooltip>Minus(Might be blockage)</Tooltip>
          </Polyline>

          <Circle
            center={[22.300151349649123, 73.23834911547878]}
            radius={500}
          />

          <Marker position={this.props.center} icon={this.getIconHome()}>
            <Popup className="text-success">
              <h1 style={{ color: "ThreeDDarkShadow" }}>home</h1>
            </Popup>
          </Marker>
          {this.state.overLatLng.length > 0 && (
            <Circle center={this.state.overLatLng} radius={10} color="red">
              <Tooltip>overflow</Tooltip>
            </Circle>
          )}
        </MapContainer>
      );
    }
    return <div className="text-center text-primary">Loading Map....</div>;
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    center: [...state.geo],
    rsList: [...state.rs],
    sensorList: [...state.sensor],
  };
};

export default connect(mapStateToProps, {
  getGeoLocation,
  getALLRs,
  getAllSensor,
})(MapInit);
