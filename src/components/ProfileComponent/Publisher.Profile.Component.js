import React from "react";
import { withRouter } from 'react-router-dom';
import Paths from '../../services/Paths';
import { inject } from 'mobx-react';

import annaImg from "../../images/girl.jpg";
import stacyImg from '../../images/stacy.jpeg'; 
import jesicaImg from '../../images/jessica.jpg'; 

@inject('session')
class Profile extends React.Component {
  render() {
    return (
      <div className="S-profile-container container-fluid">
        <div className="S-profile-header">
          <div className="S-page-title text-center">
            <h1>MY PROFILE</h1>
          </div>
        </div>
        <div className="S-profile-body">
          <div className="row">
            <div className="col-sm-4 S-profile-pic">
              {this.img()}
            </div>
            <div className="col-sm-8">
              <div className="S-profile-bio">
                <div className="col-sm-6">
                  <p>Here is the short info about me</p>
                </div>
                <div className="col-sm-6">
                  <div className="S-actions">
                    <button className="btn btn-primary" onClick={this.startStream}>Start My Stream</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  img = () => {
    if(this.props.session.email === 'anna') {
      return (
        <img src={annaImg} alt="" className="img-fluid" />
      )
    }
    if (this.props.session.email === 'stacy') {
      return (
        <img src={stacyImg} alt="" className="img-fluid" />
      )
    }
    if (this.props.session.email === 'jessica') {
      return (
        <img src={jesicaImg} alt="" className="img-fluid" />
      )
    }
  }

  startStream = (e) => {
      e.preventDefault();

        this.props.history.push(Paths.room);
  }
}

export default withRouter(Profile);
