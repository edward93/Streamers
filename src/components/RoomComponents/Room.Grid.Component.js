import React from 'react';
import { observer, inject } from "mobx-react";
import streamImg from '../../images/stream.png';

import annaImg from '../../images/girl.jpg';
import jessicaImg from '../../images/jessica.jpg';
import stacyImg from '../../images/stacy.jpeg';
import girl from '../../images/021.jpg';

import girls from '../../images/girls.jpg';
import hero from '../../images/Wallpapers_Sexy_Girls_276_46_bender777post.jpg';

import Paths from '../../services/Paths';
import { Link, withRouter } from 'react-router-dom';
// import '../../services/main.js'

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
      <dir className="S-room-grid-container container-fluid mt-0 mb-0">
          <div className="top_destinaton bg">
              <div className="S-room-gird-title S-page-title text-center">
                  <h1 className="after_line" style={{color:'#fff'}}>Category</h1>
              </div>
              <div className=" destination_img" id="destination_img">
                  <div className="relative">
                      <div className="lent in_private">
                          Brumette
                      </div>
                      <a href='#'>
                          <img src={annaImg} alt="" className="img-fluid" />
                          <p className="count"><span className="available_count">Available<br/>
                        3000 models
                    </span>
                              <span className="now_available">Now online <br/>100 models</span></p>
                          {/*<a href={Paths.room+'?name=jessica&sessionId=jessica1'} className="start_chat">Start chat</a>*/}
                      </a>
                  </div>


                  <div className="relative">
                      <div className="lent in_private">
                                  Asian
                              </div>
                      <a href='#'>
                          <img src={jessicaImg} alt="" className="img-fluid" />
                          <p className="count"><span className="available_count">Available<br/>
                        3000 models
                    </span>
                              <span className="now_available">Now online <br/>100 models</span></p>
                          {/*<a href={Paths.room+'?name=jessica&sessionId=jessica1'} className="start_chat">Start chat</a>*/}
                      </a>
                  </div>


                  <div className="relative">
                      <div className="lent in_private">
                                  Brumette
                              </div>
                      <a href='#'>
                          <img src={girls} alt="" className="img-fluid" />
                          <p className="count"><span className="available_count">Available<br/>
                        3000 models
                    </span>
                              <span className="now_available">Now online <br/>100 models</span></p>
                          {/*<a href={Paths.room+'?name=jessica&sessionId=jessica1'} className="start_chat">Start chat</a>*/}
                      </a>
                  </div>
                  <div className="relative">
                      <div className="lent in_private">
                                  Asian
                              </div>
                      <a href='#'>
                          <img src={annaImg} alt="" className="img-fluid" />
                          <p className="count"><span className="available_count">Available<br/>
                        3000 models
                    </span>
                              <span className="now_available">Now online <br/>100 models</span></p>
                          {/*<a href={Paths.room+'?name=jessica&sessionId=jessica1'} className="start_chat">Start chat</a>*/}
                      </a>
                  </div>
                  <div className="relative">
                      <div className="lent in_private">
                                  Brumette
                              </div>
                      <a href='#'>
                          <img src={girl} alt="" className="img-fluid" />
                          <p className="count"><span className="available_count">Available<br/>
                        3000 models
                    </span>
                              <span className="now_available">Now online <br/>100 models</span></p>
                          {/*<a href={Paths.room+'?name=jessica&sessionId=jessica1'} className="start_chat">Start chat</a>*/}
                      </a>
                  </div>
                  <div className="relative">
                      <div className="lent in_private">
                                  Asian
                              </div>
                      <a href='#'>
                          <img src={girls} alt="" className="img-fluid" />
                          <p className="count"><span className="available_count">Available<br/>
                        3000 models
                    </span>
                              <span className="now_available">Now online <br/>100 models</span></p>
                          {/*<a href={Paths.room+'?name=jessica&sessionId=jessica1'} className="start_chat">Start chat</a>*/}
                      </a>
                  </div>
                  <div className="relative">
                      <div className="lent in_private">
                                  Brumette
                              </div>
                      <a href='#'>
                          <img src={jessicaImg} alt="" className="img-fluid" />
                          <p className="count"><span className="available_count">Available<br/>
                        3000 models
                    </span>
                              <span className="now_available">Now online <br/>100 models</span></p>
                          {/*<a href={Paths.room+'?name=jessica&sessionId=jessica1'} className="start_chat">Start chat</a>*/}
                      </a>
                  </div>
                  <div className="relative">
                      <div className="lent in_private">
                                  Asian
                              </div>
                      <a href='#'>
                          <img src={girls} alt="" className="img-fluid" />
                          <p className="count"><span className="available_count">Available<br/>
                        3000 models
                    </span>
                              <span className="now_available">Now online <br/>100 models</span></p>
                          {/*<a href={Paths.room+'?name=jessica&sessionId=jessica1'} className="start_chat">Start chat</a>*/}
                      </a>
                  </div>
                  <div className="relative">
                      <div className="lent in_private">
                                  Brumette
                              </div>
                      <a href='#'>
                          <img src={girl} alt="" className="img-fluid" />
                          <p className="count"><span className="available_count">Available<br/>
                        3000 models
                    </span>
                              <span className="now_available">Now online <br/>100 models</span></p>
                          {/*<a href={Paths.room+'?name=jessica&sessionId=jessica1'} className="start_chat">Start chat</a>*/}
                      </a>
                  </div>
                  <div className="relative">
                      <div className="lent in_private">
                                  Asian
                              </div>
                      <a href='#'>
                          <img src={annaImg} alt="" className="img-fluid" />
                          <p className="count"><span className="available_count">Available<br/>
                        3000 models
                    </span>
                              <span className="now_available">Now online <br/>100 models</span></p>
                          {/*<a href={Paths.room+'?name=jessica&sessionId=jessica1'} className="start_chat">Start chat</a>*/}
                      </a>
                  </div>
              </div>
          </div>
          {/*todo Top models*/}
          <hr />

          <div className="S-room-gird-title S-page-title text-center mt-5">
              <h1 className="after_line">Top Models</h1>
          </div>
          <div className="S-room-grid-wrapper container-fluid">
              <div className="row">
                  <dir className="col-sm">
                      <Link to={Paths.room + `?name=anna&sessionId=anna1`}>
                          <div className="relative">
                              <div className="lent offline">
                                  Offline
                              </div>
                              <img src={stacyImg} alt="" className="img-fluid" />
                              <span className="model_name">Anna Anna <br/>
                        Category
                    </span>
                              <a href={Paths.room+'?name=jessica&sessionId=jessica1'} className="start_chat">Start chat</a>
                          </div>
                      </Link>
                  </dir>
                  <dir className="col-sm">
                      <Link to={Paths.room + `?name=jessica&sessionId=jessica1`}>
                          <div className="relative">
                              <div className="lent in_private">
                                  In private
                              </div>
                              <img src={jessicaImg} alt="" className="img-fluid" />
                              <span className="model_name">Anna Anna <br/>
                        Category
                    </span>
                              <a href={Paths.room+'?name=jessica&sessionId=jessica1'} className="start_chat">Start chat</a>
                          </div>
                      </Link>
                  </dir>
                  <dir className="col-sm">
                      <Link to={Paths.room + `?name=stacy&sessionId=stacy1`}>
                          <div className="relative">
                              <div className="lent online">
                                  Online
                              </div>
                              <img src={girls} alt="" className="img-fluid" />
                              <span className="model_name">Anna Anna <br/>
                        Category
                    </span>
                              <a href={Paths.room+'?name=jessica&sessionId=jessica1'} className="start_chat">Start chat</a>
                          </div>
                      </Link>
                  </dir>
                  <dir className="col-sm">
                      <Link to={Paths.room + `?name=stacy&sessionId=stacy1`}>
                          <div className="relative">
                              <div className="lent in_private">
                                  In private
                              </div>
                              <img src={girl} alt="" className="img-fluid" />
                              <span className="model_name">Anna Anna <br/>
                        Category
                    </span>
                              <a href={Paths.room+'?name=jessica&sessionId=jessica1'} className="start_chat">Start chat</a>
                          </div>
                      </Link>
                  </dir>
                  <dir className="col-sm">
                      <Link to={Paths.room + `?name=stacy&sessionId=stacy1`}>
                          <div className="relative">
                              <div className="lent offline">
                                  Offline
                              </div>
                              <img src={jessicaImg} alt="" className="img-fluid" />
                              <span className="model_name">Anna Anna <br/>
                        Category
                    </span>
                              <a href={Paths.room+'?name=jessica&sessionId=jessica1'} className="start_chat">Start chat</a>
                          </div>
                      </Link>
                  </dir>
                  <dir className="col-sm">
                      <Link to={Paths.room + `?name=stacy&sessionId=stacy1`}>
                          <div className="relative">
                              <div className="lent online">
                                  Online
                              </div>
                              <img src={annaImg} alt="" className="img-fluid" />
                              <span className="model_name">Anna Anna <br/>
                        Category
                    </span>
                              <a href={Paths.room+'?name=jessica&sessionId=jessica1'} className="start_chat">Start chat</a>
                          </div>
                      </Link>
                  </dir>
              </div>
          </div>


          {/*todo models */}

          <hr />
        <div className="category_gradient">
            <div className="black"></div>
            <div className="S-room-gird-title S-page-title text-center mt-5">
            <h1 className="after_line white" style={{color:'#fff', paddingTop:'15px'}}>Models</h1>
        </div>

            <div className="S-room-grid-wrapper container margin">
                <div className="row">
                    <dir className="col-sm">
                        <Link to={Paths.room + `?name=anna&sessionId=anna1`}>
                            <div className="relative">
                                <div className="lent in_private">
                                    In Private
                                </div>
                                <img src={annaImg} alt="" className="img-fluid" />
                                <span className="model_name">Anna Anna <br/>
                        Category
                    </span>
                                <a href="#" className="start_chat">Start chat</a>
                            </div>
                        </Link>
                    </dir>
                    <dir className="col-sm">
                        <Link to={Paths.room + `?name=jessica&sessionId=jessica1`}>
                            <div className="relative">
                                <div className="lent offline">
                                    Offline
                                </div>
                                <img src={jessicaImg} alt="" className="img-fluid" />
                                <span className="model_name">Anna Anna <br/>
                        Category
                    </span>
                                <a href="#" className="start_chat">Start chat</a>
                            </div>
                        </Link>
                    </dir>
                    <dir className="col-sm">
                        <Link to={Paths.room + `?name=stacy&sessionId=stacy1`}>
                            <div className="relative">
                                <div className="lent online">
                                  Online
                              </div>
                                <img src={girl} alt="" className="img-fluid" />
                                <span className="model_name">Anna Anna <br/>
                        Category
                    </span>
                                <a href="#" className="start_chat">Start chat</a>
                            </div>
                        </Link>
                    </dir>
                </div>
                <div className="row">
                    <dir className="col-sm">
                        <Link to={Paths.room + `?name=stacy&sessionId=stacy1`}>
                            <div className="relative">
                                <div className="lent in_private">
                                  In Private
                              </div>
                                <img src={girls} alt="" className="img-fluid" />
                                <span className="model_name">Anna Anna <br/>
                        Category
                    </span>
                                <a href="#" className="start_chat">Start chat</a>
                            </div>
                        </Link>
                    </dir>
                    <dir className="col-sm">
                        <Link to={Paths.room + `?name=stacy&sessionId=stacy1`}>
                            <div className="relative">
                                <div className="lent online">
                                  Online
                              </div>
                                <img src={girl} alt="" className="img-fluid" />
                                <span className="model_name">Anna Anna <br/>
                        Category
                    </span>
                                <a href="#" className="start_chat">Start chat</a>
                            </div>
                        </Link>
                    </dir>
                    <dir className="col-sm">
                        <Link to={Paths.room + `?name=stacy&sessionId=stacy1`}>
                            <div className="relative">
                                <div className="lent offline">
                                  Offline
                              </div>
                                <img src={jessicaImg} alt="" className="img-fluid" />
                                <span className="model_name">Anna Anna <br/>
                        Category
                    </span>
                                <a href="#" className="start_chat">Start chat</a>
                            </div>
                        </Link>
                    </dir>
                </div>
                <div className="row">
                    <dir className="col-sm">
                        <Link to={Paths.room + `?name=stacy&sessionId=stacy1`}>
                            <div className="relative">
                                <div className="lent online">
                                  Online
                              </div>
                                <img src={girl} alt="" className="img-fluid" />
                                <span className="model_name">Anna Anna <br/>
                        Category
                    </span>
                                <a href="#" className="start_chat">Start chat</a>
                            </div>
                        </Link>
                    </dir>
                    <dir className="col-sm">
                        <Link to={Paths.room + `?name=stacy&sessionId=stacy1`}>
                            <div className="relative">
                                <div className="lent offline">
                                  Offline
                              </div>
                                <img src={jessicaImg} alt="" className="img-fluid" />
                                <span className="model_name">Anna Anna <br/>
                        Category
                    </span>
                                <a href="#" className="start_chat">Start chat</a>
                            </div>
                        </Link>
                    </dir>
                    <dir className="col-sm">
                        <Link to={Paths.room + `?name=stacy&sessionId=stacy1`}>
                            <div className="relative">
                                <div className="lent in_private">
                                  In Private
                              </div>
                                <img src={girls} alt="" className="img-fluid" />
                                <span className="model_name">Anna Anna <br/>
                        Category
                    </span>
                                <a href="#" className="start_chat">Start chat</a>
                            </div>
                        </Link>
                    </dir>
                </div>

                {/*todo top */}
            </div>
        </div>



      </dir>
    );
  }
}

export default withRouter(RoomGrid);
