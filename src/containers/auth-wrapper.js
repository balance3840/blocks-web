import React, { Fragment } from "react";
import { Link, useLocation } from "react-router-dom";

export function AuthWrapper({ children }) {
  const location = useLocation();
  const path = location.pathname;
  return (
    <Fragment>
      <nav
        className="sidenav navbar navbar-vertical  fixed-left  navbar-expand-xs navbar-light bg-white"
        id="sidenav-main"
      >
        <div
          className="scroll-wrapper scrollbar-inner"
          style={{ position: "relative" }}
        >
          <div
            className="scrollbar-inner scroll-content scroll-scrolly_visible"
            style={{
              height: "auto",
              marginBottom: "0px",
              marginRight: "0px",
              maxHeight: "441px",
            }}
          >
            {/* Brand */}
            <div className="sidenav-header  align-items-center">
              <a className="navbar-brand" href="javascript:void(0)">
                <img
                  src="/assets/img/brand/blue.png"
                  className="navbar-brand-img"
                  alt="..."
                />
              </a>
            </div>
            <div className="navbar-inner">
              {/* Collapse */}
              <div
                className="collapse navbar-collapse"
                id="sidenav-collapse-main"
              >
                {/* Nav items */}
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <Link
                      to={"/dashboard"}
                      className={`nav-link ${
                        path === "/" || path.includes("/dashboard")
                          ? "active"
                          : ""
                      }`}
                    >
                      <i className="ni ni-tv-2 text-primary" />
                      <span className="nav-link-text">Dashboard</span>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      to={"/groups"}
                      className={`nav-link ${
                        path.includes("/groups") ? "active" : ""
                      }`}
                    >
                      <i className="fa fa-users text-primary" />
                      <span className="nav-link-text">Grupos</span>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      to={"/tasks"}
                      className={`nav-link ${
                        path.includes("/tasks") ? "active" : ""
                      }`}
                    >
                      <i className="fa fa-tasks text-primary" />
                      <span className="nav-link-text">Tareas</span>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="profile.html">
                      <i className="ni ni-single-02 text-yellow" />
                      <span className="nav-link-text">Profile</span>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="tables.html">
                      <i className="ni ni-bullet-list-67 text-default" />
                      <span className="nav-link-text">Tables</span>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="login.html">
                      <i className="ni ni-key-25 text-info" />
                      <span className="nav-link-text">Login</span>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="register.html">
                      <i className="ni ni-circle-08 text-pink" />
                      <span className="nav-link-text">Register</span>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="upgrade.html">
                      <i className="ni ni-send text-dark" />
                      <span className="nav-link-text">Upgrade</span>
                    </a>
                  </li>
                </ul>
                {/* Divider */}
                <hr className="my-3" />
                {/* Heading */}
                <h6 className="navbar-heading p-0 text-muted">
                  <span className="docs-normal">Documentation</span>
                </h6>
                {/* Navigation */}
                <ul className="navbar-nav mb-md-3">
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      href="../docs/getting-started/overview.html"
                      target="_blank"
                    >
                      <i className="ni ni-spaceship" />
                      <span className="nav-link-text">Getting started</span>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      href="../docs/foundation/colors.html"
                      target="_blank"
                    >
                      <i className="ni ni-palette" />
                      <span className="nav-link-text">Foundation</span>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      href="../docs/components/alerts.html"
                      target="_blank"
                    >
                      <i className="ni ni-ui-04" />
                      <span className="nav-link-text">Components</span>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      href="../docs/plugins/charts.html"
                      target="_blank"
                    >
                      <i className="ni ni-chart-pie-35" />
                      <span className="nav-link-text">Plugins</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="scroll-element scroll-x scroll-scrolly_visible">
            <div className="scroll-element_outer">
              <div className="scroll-element_size" />
              <div className="scroll-element_track" />
              <div className="scroll-bar" style={{ width: "0px" }} />
            </div>
          </div>
          <div className="scroll-element scroll-y scroll-scrolly_visible">
            <div className="scroll-element_outer">
              <div className="scroll-element_size" />
              <div className="scroll-element_track" />
              <div
                className="scroll-bar"
                style={{ height: "262px", top: "0px" }}
              />
            </div>
          </div>
        </div>
      </nav>
      <div className="main-content" id="panel">
        {/* Topnav */}
        <nav className="navbar navbar-top navbar-expand navbar-dark bg-primary border-bottom">
          <div className="container-fluid">
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              {/* Search form */}
              <form
                className="navbar-search navbar-search-light form-inline mr-sm-3"
                id="navbar-search-main"
              >
                <div className="form-group mb-0">
                  <div className="input-group input-group-alternative input-group-merge">
                    <div className="input-group-prepend">
                      <span className="input-group-text">
                        <i className="fas fa-search" />
                      </span>
                    </div>
                    <input
                      className="form-control"
                      placeholder="Search"
                      type="text"
                    />
                  </div>
                </div>
                <button
                  type="button"
                  className="close"
                  data-action="search-close"
                  data-target="#navbar-search-main"
                  aria-label="Close"
                >
                  <span aria-hidden="true">×</span>
                </button>
              </form>
              {/* Navbar links */}
              <ul className="navbar-nav align-items-center  ml-md-auto ">
                <li className="nav-item d-xl-none">
                  {/* Sidenav toggler */}
                  <div
                    className="pr-3 sidenav-toggler sidenav-toggler-dark active"
                    data-action="sidenav-pin"
                    data-target="#sidenav-main"
                  >
                    <div className="sidenav-toggler-inner">
                      <i className="sidenav-toggler-line" />
                      <i className="sidenav-toggler-line" />
                      <i className="sidenav-toggler-line" />
                    </div>
                  </div>
                </li>
                <li className="nav-item d-sm-none">
                  <a
                    className="nav-link"
                    href="#"
                    data-action="search-show"
                    data-target="#navbar-search-main"
                  >
                    <i className="ni ni-zoom-split-in" />
                  </a>
                </li>
                <li className="nav-item dropdown">
                  <a
                    className="nav-link"
                    href="#"
                    role="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <i className="ni ni-bell-55" />
                  </a>
                  <div className="dropdown-menu dropdown-menu-xl  dropdown-menu-right  py-0 overflow-hidden">
                    {/* Dropdown header */}
                    <div className="px-3 py-3">
                      <h6 className="text-sm text-muted m-0">
                        You have
                        <strong className="text-primary">13</strong>{" "}
                        notifications.
                      </h6>
                    </div>
                    {/* List group */}
                    <div className="list-group list-group-flush">
                      <a
                        href="#!"
                        className="list-group-item list-group-item-action"
                      >
                        <div className="row align-items-center">
                          <div className="col-auto">
                            {/* Avatar */}
                            <img
                              alt="Image placeholder"
                              src="/assets/img/theme/team-1.jpg"
                              className="avatar rounded-circle"
                            />
                          </div>
                          <div className="col ml--2">
                            <div className="d-flex justify-content-between align-items-center">
                              <div>
                                <h4 className="mb-0 text-sm">John Snow</h4>
                              </div>
                              <div className="text-right text-muted">
                                <small>2 hrs ago</small>
                              </div>
                            </div>
                            <p className="text-sm mb-0">
                              Let's meet at Starbucks at 11:30. Wdyt?
                            </p>
                          </div>
                        </div>
                      </a>
                      <a
                        href="#!"
                        className="list-group-item list-group-item-action"
                      >
                        <div className="row align-items-center">
                          <div className="col-auto">
                            {/* Avatar */}
                            <img
                              alt="Image placeholder"
                              src="/assets/img/theme/team-2.jpg"
                              className="avatar rounded-circle"
                            />
                          </div>
                          <div className="col ml--2">
                            <div className="d-flex justify-content-between align-items-center">
                              <div>
                                <h4 className="mb-0 text-sm">John Snow</h4>
                              </div>
                              <div className="text-right text-muted">
                                <small>3 hrs ago</small>
                              </div>
                            </div>
                            <p className="text-sm mb-0">
                              A new issue has been reported for Argon.
                            </p>
                          </div>
                        </div>
                      </a>
                      <a
                        href="#!"
                        className="list-group-item list-group-item-action"
                      >
                        <div className="row align-items-center">
                          <div className="col-auto">
                            {/* Avatar */}
                            <img
                              alt="Image placeholder"
                              src="/assets/img/theme/team-3.jpg"
                              className="avatar rounded-circle"
                            />
                          </div>
                          <div className="col ml--2">
                            <div className="d-flex justify-content-between align-items-center">
                              <div>
                                <h4 className="mb-0 text-sm">John Snow</h4>
                              </div>
                              <div className="text-right text-muted">
                                <small>5 hrs ago</small>
                              </div>
                            </div>
                            <p className="text-sm mb-0">
                              Your posts have been liked a lot.
                            </p>
                          </div>
                        </div>
                      </a>
                      <a
                        href="#!"
                        className="list-group-item list-group-item-action"
                      >
                        <div className="row align-items-center">
                          <div className="col-auto">
                            {/* Avatar */}
                            <img
                              alt="Image placeholder"
                              src="/assets/img/theme/team-4.jpg"
                              className="avatar rounded-circle"
                            />
                          </div>
                          <div className="col ml--2">
                            <div className="d-flex justify-content-between align-items-center">
                              <div>
                                <h4 className="mb-0 text-sm">John Snow</h4>
                              </div>
                              <div className="text-right text-muted">
                                <small>2 hrs ago</small>
                              </div>
                            </div>
                            <p className="text-sm mb-0">
                              Let's meet at Starbucks at 11:30. Wdyt?
                            </p>
                          </div>
                        </div>
                      </a>
                      <a
                        href="#!"
                        className="list-group-item list-group-item-action"
                      >
                        <div className="row align-items-center">
                          <div className="col-auto">
                            {/* Avatar */}
                            <img
                              alt="Image placeholder"
                              src="/assets/img/theme/team-5.jpg"
                              className="avatar rounded-circle"
                            />
                          </div>
                          <div className="col ml--2">
                            <div className="d-flex justify-content-between align-items-center">
                              <div>
                                <h4 className="mb-0 text-sm">John Snow</h4>
                              </div>
                              <div className="text-right text-muted">
                                <small>3 hrs ago</small>
                              </div>
                            </div>
                            <p className="text-sm mb-0">
                              A new issue has been reported for Argon.
                            </p>
                          </div>
                        </div>
                      </a>
                    </div>
                    {/* View all */}
                    <a
                      href="#!"
                      className="dropdown-item text-center text-primary font-weight-bold py-3"
                    >
                      View all
                    </a>
                  </div>
                </li>
                <li className="nav-item dropdown">
                  <a
                    className="nav-link"
                    href="#"
                    role="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <i className="ni ni-ungroup" />
                  </a>
                  <div className="dropdown-menu dropdown-menu-lg dropdown-menu-dark bg-default  dropdown-menu-right ">
                    <div className="row shortcuts px-4">
                      <a href="#!" className="col-4 shortcut-item">
                        <span className="shortcut-media avatar rounded-circle bg-gradient-red">
                          <i className="ni ni-calendar-grid-58" />
                        </span>
                        <small>Calendar</small>
                      </a>
                      <a href="#!" className="col-4 shortcut-item">
                        <span className="shortcut-media avatar rounded-circle bg-gradient-orange">
                          <i className="ni ni-email-83" />
                        </span>
                        <small>Email</small>
                      </a>
                      <a href="#!" className="col-4 shortcut-item">
                        <span className="shortcut-media avatar rounded-circle bg-gradient-info">
                          <i className="ni ni-credit-card" />
                        </span>
                        <small>Payments</small>
                      </a>
                      <a href="#!" className="col-4 shortcut-item">
                        <span className="shortcut-media avatar rounded-circle bg-gradient-green">
                          <i className="ni ni-books" />
                        </span>
                        <small>Reports</small>
                      </a>
                      <a href="#!" className="col-4 shortcut-item">
                        <span className="shortcut-media avatar rounded-circle bg-gradient-purple">
                          <i className="ni ni-pin-3" />
                        </span>
                        <small>Maps</small>
                      </a>
                      <a href="#!" className="col-4 shortcut-item">
                        <span className="shortcut-media avatar rounded-circle bg-gradient-yellow">
                          <i className="ni ni-basket" />
                        </span>
                        <small>Shop</small>
                      </a>
                    </div>
                  </div>
                </li>
              </ul>
              <ul className="navbar-nav align-items-center  ml-auto ml-md-0 ">
                <li className="nav-item dropdown">
                  <a
                    className="nav-link pr-0"
                    href="#"
                    role="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <div className="media align-items-center">
                      <span className="avatar avatar-sm rounded-circle">
                        <img
                          alt="Image placeholder"
                          src="/assets/img/theme/team-4.jpg"
                        />
                      </span>
                      <div className="media-body  ml-2  d-none d-lg-block">
                        <span className="mb-0 text-sm  font-weight-bold">
                          John Snow
                        </span>
                      </div>
                    </div>
                  </a>
                  <div className="dropdown-menu  dropdown-menu-right ">
                    <div className="dropdown-header noti-title">
                      <h6 className="text-overflow m-0">Welcome!</h6>
                    </div>
                    <a href="#!" className="dropdown-item">
                      <i className="ni ni-single-02" />
                      <span>My profile</span>
                    </a>
                    <a href="#!" className="dropdown-item">
                      <i className="ni ni-settings-gear-65" />
                      <span>Settings</span>
                    </a>
                    <a href="#!" className="dropdown-item">
                      <i className="ni ni-calendar-grid-58" />
                      <span>Activity</span>
                    </a>
                    <a href="#!" className="dropdown-item">
                      <i className="ni ni-support-16" />
                      <span>Support</span>
                    </a>
                    <div className="dropdown-divider" />
                    <a href="#!" className="dropdown-item">
                      <i className="ni ni-user-run" />
                      <span>Logout</span>
                    </a>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        {/* Header */}
        {/* Header */}
        {/* Page content */}
        <div className="container-fluid">{children}</div>
      </div>
    </Fragment>
  );
}
