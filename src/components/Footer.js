import React from "react";
import pehcharmLogo from "../images/pehcharm-logo.png";

function Footer() {
  return (
    <>
      <div className="container">
        <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
          <div className="col-md-4 d-flex align-items-center">
            <a
              href="/"
              className="mb-3 me-2 mb-md-0 text-body-secondary text-decoration-none lh-1"
            >
              <img
                style={{ height: "50px" }}
                src={pehcharmLogo}
                alt="pehcharm-logo"
              />
            </a>
            <span className="mb-3 mb-md-0 text-body-secondary">
              © 2024 Pehcharm, Inc
            </span>
          </div>
        </footer>
      </div>
    </>
  );
}

export default Footer;
