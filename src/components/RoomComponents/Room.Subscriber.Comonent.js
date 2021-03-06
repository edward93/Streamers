import React from "react";
import Input from "antd/lib/input";
import qs from "qs";
import { inject, observer } from "mobx-react";
import { OpenVidu } from "openvidu-browser";
import { withRouter } from "react-router-dom";

import Config from "Config";
import Video from "./Video.Component";
import Message from "../ChatComponent/Chat.Message.Component";

import modelImg from "../../images/021.jpg";
import girls from "../../images/girls.jpg";
import girl from "../../images/girl.jpg";
import annaImg from "../../images/girl.jpg";
import jessicaImg from "../../images/jessica.jpg";
import stacyImg from "../../images/stacy.jpeg";
import Paths from "../../services/Paths";

@inject("roomStore", "session")
@observer
class Room extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: []
      // this is only for demo. Not a real chat no one except for message creator can see this.
    };
  }

  componentWillMount() {
    window.addEventListener("beforeunload", this.onUnload);
    this.props.roomStore.modelName = qs.parse(this.props.location.search, {
      delimiter: /[?,&]/
    }).name;

    this.connectToSession();
  }

  onUnload = event => {
    event.preventDefault();
    if (this.props.roomStore.session) {
      this.props.roomStore.session.disconnect();
      this.props.roomStore.removeSessionId();
    }
    this.props.roomStore.reset();
  };

  componentWillUnmount() {
    if (this.props.roomStore.session) {
      this.props.roomStore.session.disconnect();
      this.props.roomStore.removeSessionId();
    }
    this.props.roomStore.reset();
    window.removeEventListener("beforeunload", this.onUnload);
  }

  connectToSession = () => {
    const store = this.props.roomStore;
    store.ov = new OpenVidu();
    store.session = store.ov.initSession();

    store.session.on("streamCreated", event => {
      // Subscribe to the Stream to receive it. Second parameter is undefined
      // so OpenVidu doesn't create an HTML video by its own
      let subscriber = store.session.subscribe(event.stream, undefined);
      const subs = [...store.subscribers];
      subs.push(subscriber);
      store.subscribers = subs;
      this.findPublisher();
    });

    store.session.on("streamDestroyed", event => {
      store.deleteSubscriber(event.stream.streamManager);
    });

    store.sessionId = qs.parse(this.props.location.search, {
      delimiter: /[?,&]/
    }).sessionId;

    store.getToken("SUBSCRIBER").then(result => {
      if (result === false) {
        console.warn(
          "No connection to OpenVidu Server. This may be a certificate error at " +
            Config.ServerUrl
        );
        if (
          window.confirm(`No connection to OpenVidu Server. This may be a certificate error at '${
            Config.ServerUrl
          }'\n\n
                Click OK to navigate and accept it. If no certificate warning is shown, 
                then check that your OpenVidu Server is up and running at ${
                  Config.ServerUrl
                }`)
        ) {
          window.open(Config.ServerUrl + "/accept-certificate", "_blank");
        }
      } else if (result) {
        store.session
          .connect(
            store.token,
            { name: this.props.session.userName || "Guest", role: "SUBSCRIBER" }
          )
          .then(() => {
            store.isConnected = true;
            this.findPublisher();
          });
      }
    });
  };

  findPublisher = () => {
    const store = this.props.roomStore;
    if (store.isConnected) {
      store.publisher = store.subscribers.filter(
        c => JSON.parse(c.stream.connection.data).role === "PUBLISHER"
      )[0];

      if (!store.publisher) {
        // TODO: Show offline poster
      }
    }
  };

  render() {
    return (
      <div className="S-room-container conteiner=fluid">
        <div className="S-room-title S-page-title text-center">
          <h1>Welcome to {this.props.roomStore.modelName}'s Room</h1>
        </div>
        <hr />
        <div className="S-room-video-container container-fluid">
          <div className="row">
            <div className="col-md-8">
              <div className="S-vidoe-wrapper">
                <Video streamManager={this.props.roomStore.publisher} />
                <p className="model_option">
                  <a className="private">In private</a>
                  <a className="tip">Send tip</a>
                  <a className="favorite">Add favorite</a>
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="S-room-chat-box-container">
                <div className="S-room-chat-box">
                  <div className="S-chat-messages">
                    {this.state.messages.map((msg, index) => (
                      <Message
                        key={index}
                        username={this.props.session.email}
                        message={msg}
                      />
                    ))}
                  </div>
                  <div className="S-chat-input">
                    <Input
                      placeholder="message"
                      ref={ref => (this.inputRef = ref)}
                      onPressEnter={this.sendMessage}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <hr />
        </div>
        <div className="S-room-model-container container-fluid">
          <div className="model_info row content align-items-center">
            <div className="col-sm-3 col-12">
              {" "}
              <div className="model_img">
                <img src={modelImg} alt="" />
              </div>
            </div>
            <div className="col-sm-2 col-12">
              <div className="model_boiographi">
                <p>Name:Anna</p>
                <p>Age:65</p>
                <p>Sex: Female</p>
                <p>Location:London</p>
                <p>Weight:68 kg.</p>
              </div>
            </div>
            <div className="col-sm-7 model_gallery text-center">
              <img src={girls} alt="" />
              <img src={modelImg} alt="" />
              <img src={girl} alt="" />
              <img src={modelImg} alt="" />
              <img src={girl} alt="" />
              <img src={modelImg} alt="" />
            </div>
          </div>
          <div className=" top_destinaton mt-5">
            <div className="S-room-gird-title S-page-title text-center">
              <h1>Top Models</h1>
            </div>
            <div className=" destination_img" id="destination_img">
              <div className="relative">
                <img src={girls} alt="" className="img-fluid" />
                <span className="model_name">
                  Anna Anna <br />
                  Category
                </span>
                <a className="start_chat">Start chat</a>
              </div>
              <div className="relative">
                <img src={modelImg} alt="" className="img-fluid" />
                <span className="model_name">
                  Anna Anna <br />
                  Category
                </span>
                <a className="start_chat">Start chat</a>
              </div>
              <div className="relative">
                <img src={girl} alt="" className="img-fluid" />
                <span className="model_name">
                  Anna Anna <br />
                  Category
                </span>
                <a className="start_chat">Start chat</a>
              </div>
              <div className="relative">
                <img src={modelImg} alt="" className="img-fluid" />
                <span className="model_name">
                  Anna Anna <br />
                  Category
                </span>
                <a className="start_chat">Start chat</a>
              </div>
              <div className="relative">
                <img src={girl} alt="" className="img-fluid" />
                <span className="model_name">
                  Anna Anna <br />
                  Category
                </span>
                <a className="start_chat">Start chat</a>
              </div>
              <div className="relative">
                <img src={modelImg} alt="" className="img-fluid" />
                <span className="model_name">
                  Anna Anna <br />
                  Category
                </span>
                <a className="start_chat">Start chat</a>
              </div>
              <div className="relative">
                <img src={girls} alt="" className="img-fluid" />
                <span className="model_name">
                  Anna Anna <br />
                  Category
                </span>
                <a className="start_chat">Start chat</a>
              </div>
              <div className="relative">
                <img src={modelImg} alt="" className="img-fluid" />
                <span className="model_name">
                  Anna Anna <br />
                  Category
                </span>
                <a className="start_chat">Start chat</a>
              </div>
              <div className="relative">
                <img src={girls} alt="" className="img-fluid" />
                <span className="model_name">
                  Anna Anna <br />
                  Category
                </span>
                <a className="start_chat">Start chat</a>
              </div>
              <div className="relative">
                <img src={modelImg} alt="" className="img-fluid" />
                <span className="model_name">
                  Anna Anna <br />
                  Category
                </span>
                <a className="start_chat">Start chat</a>
              </div>
            </div>
          </div>

          <div className="top_destinaton bg">
            <div className="S-room-gird-title S-page-title text-center">
              <h1 className="after_line" style={{ color: "#fff" }}>
                Category
              </h1>
            </div>
            <div className=" destination_img" id="destination_img">
              <div className="relative">
                <div className="lent in_private">Brumette</div>
                <a href={Paths.room + "?name=jessica&sessionId=jessica1"}>
                  <img src={annaImg} alt="" className="img-fluid" />
                  <p className="count">
                    <span className="available_count">
                      Available<br />
                      3000 models
                    </span>
                    <span className="now_available">
                      Now online <br />100 models
                    </span>
                  </p>
                  {/*<a href={Paths.room+'?name=jessica&sessionId=jessica1'} className="start_chat">Start chat</a>*/}
                </a>
              </div>

              <div className="relative">
                <div className="lent in_private">Asian</div>
                <a href={Paths.room + "?name=jessica&sessionId=jessica1"}>
                  <img src={jessicaImg} alt="" className="img-fluid" />
                  <p className="count">
                    <span className="available_count">
                      Available<br />
                      3000 models
                    </span>
                    <span className="now_available">
                      Now online <br />100 models
                    </span>
                  </p>
                  {/*<a href={Paths.room+'?name=jessica&sessionId=jessica1'} className="start_chat">Start chat</a>*/}
                </a>
              </div>

              <div className="relative">
                <div className="lent in_private">Brumette</div>
                <a href={Paths.room + "?name=jessica&sessionId=jessica1"}>
                  <img src={girls} alt="" className="img-fluid" />
                  <p className="count">
                    <span className="available_count">
                      Available<br />
                      3000 models
                    </span>
                    <span className="now_available">
                      Now online <br />100 models
                    </span>
                  </p>
                  {/*<a href={Paths.room+'?name=jessica&sessionId=jessica1'} className="start_chat">Start chat</a>*/}
                </a>
              </div>
              <div className="relative">
                <div className="lent in_private">Asian</div>
                <a href={Paths.room + "?name=jessica&sessionId=jessica1"}>
                  <img src={annaImg} alt="" className="img-fluid" />
                  <p className="count">
                    <span className="available_count">
                      Available<br />
                      3000 models
                    </span>
                    <span className="now_available">
                      Now online <br />100 models
                    </span>
                  </p>
                  {/*<a href={Paths.room+'?name=jessica&sessionId=jessica1'} className="start_chat">Start chat</a>*/}
                </a>
              </div>
              <div className="relative">
                <div className="lent in_private">Brumette</div>
                <a href={Paths.room + "?name=jessica&sessionId=jessica1"}>
                  <img src={girl} alt="" className="img-fluid" />
                  <p className="count">
                    <span className="available_count">
                      Available<br />
                      3000 models
                    </span>
                    <span className="now_available">
                      Now online <br />100 models
                    </span>
                  </p>
                  {/*<a href={Paths.room+'?name=jessica&sessionId=jessica1'} className="start_chat">Start chat</a>*/}
                </a>
              </div>
              <div className="relative">
                <div className="lent in_private">Asian</div>
                <a href={Paths.room + "?name=jessica&sessionId=jessica1"}>
                  <img src={girls} alt="" className="img-fluid" />
                  <p className="count">
                    <span className="available_count">
                      Available<br />
                      3000 models
                    </span>
                    <span className="now_available">
                      Now online <br />100 models
                    </span>
                  </p>
                  {/*<a href={Paths.room+'?name=jessica&sessionId=jessica1'} className="start_chat">Start chat</a>*/}
                </a>
              </div>
              <div className="relative">
                <div className="lent in_private">Brumette</div>
                <a href={Paths.room + "?name=jessica&sessionId=jessica1"}>
                  <img src={jessicaImg} alt="" className="img-fluid" />
                  <p className="count">
                    <span className="available_count">
                      Available<br />
                      3000 models
                    </span>
                    <span className="now_available">
                      Now online <br />100 models
                    </span>
                  </p>
                  {/*<a href={Paths.room+'?name=jessica&sessionId=jessica1'} className="start_chat">Start chat</a>*/}
                </a>
              </div>
              <div className="relative">
                <div className="lent in_private">Asian</div>
                <a href={Paths.room + "?name=jessica&sessionId=jessica1"}>
                  <img src={girls} alt="" className="img-fluid" />
                  <p className="count">
                    <span className="available_count">
                      Available<br />
                      3000 models
                    </span>
                    <span className="now_available">
                      Now online <br />100 models
                    </span>
                  </p>
                  {/*<a href={Paths.room+'?name=jessica&sessionId=jessica1'} className="start_chat">Start chat</a>*/}
                </a>
              </div>
              <div className="relative">
                <div className="lent in_private">Brumette</div>
                <a href={Paths.room + "?name=jessica&sessionId=jessica1"}>
                  <img src={girl} alt="" className="img-fluid" />
                  <p className="count">
                    <span className="available_count">
                      Available<br />
                      3000 models
                    </span>
                    <span className="now_available">
                      Now online <br />100 models
                    </span>
                  </p>
                  {/*<a href={Paths.room+'?name=jessica&sessionId=jessica1'} className="start_chat">Start chat</a>*/}
                </a>
              </div>
              <div className="relative">
                <div className="lent in_private">Asian</div>
                <a href={Paths.room + "?name=jessica&sessionId=jessica1"}>
                  <img src={annaImg} alt="" className="img-fluid" />
                  <p className="count">
                    <span className="available_count">
                      Available<br />
                      3000 models
                    </span>
                    <span className="now_available">
                      Now online <br />100 models
                    </span>
                  </p>
                  {/*<a href={Paths.room+'?name=jessica&sessionId=jessica1'} className="start_chat">Start chat</a>*/}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  sendMessage = e => {
    const msg = e.target.value;
    if (msg) {
      const messages = [...this.state.messages];
      messages.push(msg);
      this.setState({ messages });

      this.inputRef.setState({ value: undefined });
    }
  };
}

export default withRouter(Room);
