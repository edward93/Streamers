import React from 'react';
import { observer, inject } from "mobx-react";
import streamImg from '../../images/stream.png';

import annaImg from '../../images/girl.jpg';
import jessicaImg from '../../images/jessica.jpg';
import stacyImg from '../../images/stacy.jpeg';

import Paths from '../../services/Paths';
import { Link, withRouter } from 'react-router-dom';

@inject("roomStore", "session")
@observer
class RoomGrid extends React.Component {
  componentWillMount() {
    if (this.props.session.role === "streamer") {
      this.props.history.push(Paths.profile);
    }
  }
  render() {
    return (
      <dir className="S-room-grid-container container-fluid">
        <div className="S-room-gird-title S-page-title text-center">
          <h1>Models</h1>
        </div>
        <hr />
        <div className="S-room-grid-wrapper container">
          <div className="row">
            <dir className="col-sm">
              <Link to={Paths.room + `?name=anna&sessionId=anna1`}>
                <img src={annaImg} alt="" className="img-fluid" />
              </Link>
            </dir>
            <dir className="col-sm">
              <Link to={Paths.room + `?name=jessica&sessionId=jessica1`}>
                <img src={jessicaImg} alt="" className="img-fluid" />
              </Link>
            </dir>
            <dir className="col-sm">
              <Link to={Paths.room + `?name=stacy&sessionId=stacy1`}>
                <img src={stacyImg} alt="" className="img-fluid" />
              </Link>
            </dir>
          </div>
          {/* <div className="row">
            <dir className="col-sm">
              <Link to={Paths.room + `?name=anna`}>
                <img src={streamImg} alt="" className="img-fluid" />
              </Link>
            </dir>
            <dir className="col-sm">
              <Link to={Paths.room + `?name=anna`}>
                <img src={streamImg} alt="" className="img-fluid" />
              </Link>
            </dir>
            <dir className="col-sm">
              <Link to={Paths.room + `?name=anna`}>
                <img src={streamImg} alt="" className="img-fluid" />
              </Link>
            </dir>
          </div>
          <div className="row">
            <dir className="col-sm">
              <Link to={Paths.room + `?name=anna`}>
                <img src={streamImg} alt="" className="img-fluid" />
              </Link>
            </dir>
            <dir className="col-sm">
              <Link to={Paths.room + `?name=anna`}>
                <img src={streamImg} alt="" className="img-fluid" />
              </Link>
            </dir>
            <dir className="col-sm">
              <Link to={Paths.room + `?name=anna`}>
                <img src={streamImg} alt="" className="img-fluid" />
              </Link>
            </dir>
          </div> */}
        </div>
      </dir>
    );
  }
}

export default withRouter(RoomGrid);
