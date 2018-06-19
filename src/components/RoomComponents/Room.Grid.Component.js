import React from 'react';
import { observer, inject } from 'mobx-react';
import streamImg from '../../images/stream.png';
import Paths from '../../services/Paths';
import { Link } from 'react-router-dom';

@inject('roomStore')
@observer
class RoomGrid extends React.Component {
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
                            <Link to={Paths.room + `?name=anna&sessionId=anna`}>
                                <img src={streamImg} alt="" className="img-fluid" />
                            </Link>
                        </dir>
                        <dir className="col-sm">
                            <Link to={Paths.room + `?name=jessica`}>
                                <img src={streamImg} alt="" className="img-fluid" />
                            </Link>
                        </dir>
                        <dir className="col-sm">
                            <Link to={Paths.room + `?name=stacy`}>
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
                    </div>
                </div>
            </dir>
        )
    }
}

export default RoomGrid;
