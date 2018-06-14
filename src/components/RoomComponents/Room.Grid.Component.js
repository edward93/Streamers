import React from 'react';
import { observer } from 'mobx-react';
import streamImg from '../../images/stream.png';
import Paths from '../../services/Paths';
import { Link } from 'react-router-dom';

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
                            <Link to={Paths.room}>
                                <img src={streamImg} alt="" className="img-fluid" />
                            </Link>
                        </dir>
                        <dir className="col-sm">
                            <Link to={Paths.room}>
                                <img src={streamImg} alt="" className="img-fluid" />
                            </Link>
                        </dir>
                        <dir className="col-sm">
                            <Link to={Paths.room}>
                                <img src={streamImg} alt="" className="img-fluid" />
                            </Link>
                        </dir>
                    </div>
                    <div className="row">
                        <dir className="col-sm">
                            <Link to={Paths.room}>
                                <img src={streamImg} alt="" className="img-fluid" />
                            </Link>
                        </dir>
                        <dir className="col-sm">
                            <Link to={Paths.room}>
                                <img src={streamImg} alt="" className="img-fluid" />
                            </Link>
                        </dir>
                        <dir className="col-sm">
                            <Link to={Paths.room}>
                                <img src={streamImg} alt="" className="img-fluid" />
                            </Link>
                        </dir>
                    </div>
                    <div className="row">
                        <dir className="col-sm">
                            <Link to={Paths.room}>
                                <img src={streamImg} alt="" className="img-fluid" />
                            </Link>
                        </dir>
                        <dir className="col-sm">
                            <Link to={Paths.room}>
                                <img src={streamImg} alt="" className="img-fluid" />
                            </Link>
                        </dir>
                        <dir className="col-sm">
                            <Link to={Paths.room}>
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
