import React, { Component } from "react";
import { Outlet, Link } from "react-router-dom";

export class Navbar extends Component {
  render() {
    return (
      <>
        <nav
          className="navbar navbar-expand-lg bg-dark navbar-dark fs-3 "
          style={{ color: "white" }}
        >
          <div className="container-fluid">
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0 ">
                <li className="nav-item">
                  <Link className="nav-link mx-3 " aria-current="page" to="/">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link mx-3" to="/Addpolicy">
                    Add Policies
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link mx-3" to="/UserPolicy">
                    Users Policy
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link mx-3" to="/Claimsettlement">
                    Claim Settlement
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link mx-3" to="/Claimsettlement">
                    Example poc
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <Outlet />
      </>
    );
  }
}

export default Navbar;
