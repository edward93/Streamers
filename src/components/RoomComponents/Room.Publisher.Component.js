import React from "react";
import { inject, observer } from "mobx-react";
import { OpenVidu } from "openvidu-browser";
import { withRouter } from "react-router-dom";
import Input from "antd/lib/input";
import Button from "antd/lib/button";

import Config from "Config";
import Video from "./Video.Component";
import Message from "../ChatComponent/Chat.Message.Component";

@inject("session", "roomStore")
@observer
class Room extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: []
      // this is only for demo. Not a real chat no one except for message creator can see this.
    };
  }

  componentDidMount() {
    window.addEventListener("beforeunload", this.onUnload);
    this.props.roomStore.modelName = this.props.session.email;
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

  render() {
    return (
      <div className="S-room-container conteiner=fluid">
        <div className="S-room-title S-page-title text-center">
          <h1>MY ROOM</h1>
        </div>
        <hr />
        <div className="S-room-video-container container-fluid">
          <div className="row">
            <div className="col-md-8">
              <div className="S-vidoe-wrapper">
                <Video streamManager={this.props.roomStore.publisher} />
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
          <div className="col-sm">{this.actionBtsn()}</div>
        </div>
      </div>
    );
  }

  actionBtsn = () => {
    const store = this.props.roomStore;
    if (store.isConnected) {
      return (
        <Button type="danger" size="large" onClick={this.stopStream}>
          Stop
        </Button>
      );
    } else {
      return (
        <Button type="primary" size="large" onClick={this.startStream}>
          Start
        </Button>
      );
    }
  };

  stopStream = e => {
    e.preventDefault();
    const store = this.props.roomStore;
    store.isConnected = false;

    if (this.props.roomStore.session) {
      this.props.roomStore.session.disconnect();
      this.props.roomStore.removeSessionId();
    }
  };

  startStream = e => {
    e.preventDefault();
    const store = this.props.roomStore;
    store.ov = new OpenVidu();
    store.session = store.ov.initSession();

    store.session.on("streamCreated", event => {
      // Subscribe to the Stream to receive it. Second parameter is undefined
      // so OpenVidu doesn't create an HTML video by its own
      let subscriber = store.session.subscribe(event.stream, undefined);
      store.subscribers.push(subscriber);
    });

    store.session.on("streamDestroyed", event => {
      store.deleteSubscriber(event.stream.streamManager);
    });

    if (store.sessionId) {
      store.getToken("PUBLISHER").then(result => {
        if (result) {
          this.connectToSession();
        }
      });
    } else {
      store.createSession(`${this.props.session.email}1`).then(res => {
        if (res === false) {
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
        } else if (res) {
          store.getToken("PUBLISHER").then(result => {
            if (result) {
              this.connectToSession();
            }
          });
        }
      });
    }
  };

  connectToSession = () => {
    const store = this.props.roomStore;

    store.session
      .connect(
        store.token,
        { name: this.props.session.email, role: "PUBLISHER" }
      )
      .then(() => {
        let publisher = store.ov.initPublisher(undefined, {
          audioSource: undefined, // The source of audio. If undefined default microphone
          videoSource: undefined, // The source of video. If undefined default webcam
          publishAudio: true, // Whether you want to start publishing with your audio unmuted or not
          publishVideo: true, // Whether you want to start publishing with your video enabled or not
          resolution: "1280x720", // The resolution of your video
          frameRate: 30, // The frame rate of your video
          insertMode: "APPEND", // How the video is inserted in the target element 'video-container'
          mirror: true // Whether to mirror your local video or not
        });
        store.isConnected = true;
        store.publisher = publisher;

        store.session.publish(publisher);
      });
  };

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
