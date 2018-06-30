import React from "react";
import { withRouter } from "react-router-dom";
import { observer, inject } from "mobx-react";
import NavItem from "./NavigationComponents/NavItem.Component";
import Paths from "../services/Paths";

@inject("session")
@observer
class Header extends React.Component {
  static propTypes = {};

  render() {
    return (
      <div className="S-header">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <a
            className="navbar-brand"
            onClick={this.onBrandClick}
            href={Paths.home}
          >
            S
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav mx-auto">
              <NavItem path={Paths.home} name="Home" />
              <NavItem path={Paths.topModels} name="Top Models" />
              <NavItem path={Paths.newModels} name="New Models" />
              <NavItem path={Paths.categories} name="Categories" />
              <NavItem path={Paths.about} name="About us" />
            </ul>

            {this.signinActions()}
          </div>
        </nav>
      </div>
    );
  }

  signinActions = () => {
    if (this.props.session.isloggedIn) {
      return (
        <ul className="navbar-nav pull-sm-right">
          <NavItem path={Paths.signin} name="Sign Out" onClick={this.siginOut} />
        </ul>
      );
    } else {
      return (
        <ul className="navbar-nav pull-sm-right">
          <NavItem path={Paths.signin} name="Sign In" />
        </ul>
      );
    }
  };

  siginOut = (e) => {
      this.props.session.logout();
  }

  onBrandClick = e => {
    e.preventDefault();

    this.props.history.push(Paths.home);
  };
}

export default withRouter(Header);
