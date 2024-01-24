import React from "react";
import Navbar from "../components/Navbars/Navbar";
import { ReactComponent as Logo } from "../svg/3.svg";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div style={{ backgroundColor: "white", minHeight: "100vh" }}>
      <Navbar />
      <div className="container">
        <div className="mt-5 row">
          <div
            className="col-lg-6 d-flex flex-column align-items-start justify-content-center"
            style={{ marginTop: -55 }}
          >
            <h1 className="text-dark">
              Be Smart With Making{" "}
              <span className="text-info display-3">Drainage Monitoring</span>{" "}
              Smart{" "}
            </h1>
            <p className="text-dark">
              Take avantage of core technology in monitoring at drainage level !
            </p>
            <p className="text-dark lead">
              Get{" "}
              <span className="text-info" style={{ fontSize: 18 }}>
                24x7
              </span>{" "}
              monitoring with us!!
            </p>
            <Link to="/signup" className="  align-self-start mt-4">
              <button className="btn btn-info">Get Started Now!</button>
            </Link>
          </div>
          <div className="hero-svg col-lg-6" style={{ overflowX: "hidden" }}>
            <Logo style={{ height: "500", width: "550", marginLeft: 30 }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
