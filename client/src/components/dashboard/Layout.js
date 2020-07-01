import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import {
  BrowserRouter as Router,
  Route,
  Switch,
  withRouter
} from "react-router-dom";

import Spinner from "../common/Spinner";
import SideNav from "./SideNav/SideNav";
import TopNav from "./TopNav/TopNav";
import Dashboard from "./MainContent/Dashboard";
import NotFound from "../404/404";

import "./Layout.scss";

class Layout extends Component {
  render() {

    let dashboardContent;

    return (
      <Router>
        <div className='wrapper'>
          {dashboardContent}
        </div>
      </Router>
    );
  }
}

Layout.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default withRouter(
  connect(
    mapStateToProps
  )(Layout)
);