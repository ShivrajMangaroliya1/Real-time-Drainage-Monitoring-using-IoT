import React, { Component } from "react";
import history from "./history/history";
import { Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { socket } from "./socket/socketConn";

//UI Stuff 3rd parties
import "assets/scss/black-dashboard-react.scss";
import "assets/demo/demo.css";
import "assets/css/nucleo-icons.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "react-notification-alert/dist/animate.css";
import Notify from "react-notification-alert";

import ThemeContextWrapper from "./components/ThemeWrapper/ThemeWrapper";
import BackgroundColorWrapper from "./components/BackgroundColorWrapper/BackgroundColorWrapper";

//pages
import Landing from "./pages/Landing";
import Home from "./pages/Home";
import SignUpPage from "./pages/SignUpPage";
import SignInPage from "./pages/SignInPage";
import SignOut from "./componentsMain/auth/SignOut";
import RsPage from "./pages/RsPage";
import SensorPage from "./pages/SensorPage";
import RsShowPage from "./pages/RsShowPage";
import SensorShowPage from "./pages/SensorShowPage";
import { getCurrentUser } from "./actions/index";
// import DashBoard from "./pages/DashBoard";
import DashboardLayout from "./layouts/Admin/Admin";
import DashBoard from "./pages/DashBoard";
import Map from "./pages/Map";
import Issue from "./pages/Issue";
import FaultDeletePage from "./pages/FaultDeletePage";

class App extends Component {
  state = {
    options: {
      place: "tr",
      message: (
        <div>
          <div>
            <b>new blockage detected</b>
            <button className="btn btn-secondary"> More Details</button>
          </div>
        </div>
      ),
      type: "danger",
      icon: "now-ui-icons ui-1_bell-53",
      autoDismiss: 1,
    },
  };

  myFunc = () => {
    this.refs.notify.notificationAlert(this.state.options);
  };
  componentDidMount() {
    this.props.getCurrentUser();
    socket.on("fault", (fault) => {
      this.myFunc();
    });
    // socket.emit("chartData", "giveData");
    // socket.on("chartDataReturn", (data) => {
    //   console.log(data);
    // });
  }

  componentWillUnmount() {
    socket.off("fault", () => {
      console.log("fault listener remove");
    });
  }

  render() {
    // console.log(history);
    return (
      <ThemeContextWrapper>
        <BackgroundColorWrapper>
          <Router history={history}>
            <Switch>
              <Route path="/" exact component={Landing} />
              <Route path="/signup" exact component={SignUpPage} />
              <Route path="/signin" exact component={SignInPage} />
              <Route path="/signout" exact component={SignOut} />
              <Route path="/rs" exact component={RsPage} />
              <Route path="/sensor" exact component={SensorPage} />
              <Route path="/rs-success" exact component={RsShowPage} />
              <Route path="/sensor-success" exact component={SensorShowPage} />
              <Route
                path="/admin/dashboard"
                exact
                component={() => <DashboardLayout com={<DashBoard />} />}
              />
              <Route
                path="/admin/map"
                exact
                component={() => <DashboardLayout com={<Map />} />}
              />
              <Route
                path="/admin/issue"
                exact
                component={() => <DashboardLayout com={<Issue />} />}
              />
              <Route
                path="/admin/issue/:id"
                exact
                component={() => <DashboardLayout com={<FaultDeletePage />} />}
              />
            </Switch>
          </Router>
          <Notify
            ref="notify"
            zIndex={9999}
            onClick={() => console.log("hey")}
          />
        </BackgroundColorWrapper>
      </ThemeContextWrapper>
    );
  }
}

export default connect(null, { getCurrentUser })(App);
