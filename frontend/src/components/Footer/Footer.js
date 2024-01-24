import React from "react";

// reactstrap components
import { Container, Nav, NavItem, NavLink } from "reactstrap";

function Footer() {
  return (
    <footer className="footer">
      <Container fluid>
        <div className="copyright">
          © {new Date().getFullYear()} Get better{" "}
          <a href="" target="_blank">
            DrainageMonitoring
          </a>{" "}
          with us.
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
