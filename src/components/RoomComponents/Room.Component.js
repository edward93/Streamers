import React from "react";
import { observer, inject } from "mobx-react";
import { withRouter } from "react-router-dom";
import QueryString from "query-string";
import { OpenVidu } from "openvidu-browser";

import Video from "./Video.Component";

@inject("roomStore", "session")
@observer
class Room extends React.Component {
  componentDidMount() {
    window.addEventListener("beforeunload", this.onUnload);
    this.props.roomStore.modelName = QueryString.parse(
      this.props.location.search
    ).name;
  }

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
              </div>
            </div>
            <div className="col-md-4">
              <div className="S-room-chat-box-container">
                <div className="S-room-chat-box">
                  <div className="S-chat-messages">Messages here</div>
                  <div className="S-chat-input">Input</div>
                </div>
              </div>
            </div>
          </div>
          {this.props.session.role === "viewer" && (
            <div className="row">
              <hr />
              {this.props.roomStore.subscribers.map(sub => {
                return (
                  <div
                    className="col-sm"
                    key={sub.stream.connection.connectionId}
                  >
                    <Video streamManager={sub} />
                  </div>
                );
              })}
            </div>
          )}
          <hr />
          {this.actionBtns()}
        </div>
      </div>
    );
  }

  actionBtns = () => {
    if (this.props.session.role === "streamer") {
      return (
        <div className="row">
          <div className="col-sm">
            <button className="btn btn-primary" onClick={this.startStream}>
              Start My Stream
            </button>
          </div>
        </div>
      );
    } else if (this.props.session.role === "viewer") {
      return (
        <div className="row">
          <div className="col-sm">
            <button className="btn btn-primary" onClick={this.joinSession}>
              Join Session
            </button>
          </div>
        </div>
      );
    }
  };

  initSession = () => {
    this.props.roomStore.ov = new OpenVidu();
    this.props.roomStore.session = this.props.roomStore.ov.initSession();

    this.props.roomStore.session.on("streamCreated", event => {
      // Subscribe to the Stream to receive it. Second parameter is undefined
      // so OpenVidu doesn't create an HTML video by its own
      let subscriber = this.props.roomStore.session.subscribe(
        event.stream,
        undefined
      );
      this.props.roomStore.subscribers.push(subscriber);
    });

    this.props.roomStore.session.on("streamDestroyed", event => {
      // Remove the stream from 'subscribers' array
      this.props.roomStore.deleteSubscriber(event.stream.streamManager);
    });
  };

  joinSession = e => {
    e.preventDefault();

    this.initSession();
    this.props.roomStore.sessionId = QueryString.parse(
      this.props.location.search
    ).sessionId;

    // connect to session
    this.props.roomStore.getToken("SUBSCRIBER").then(result => {
      if (result) {
        this.props.roomStore.session
          .connect(
            this.props.roomStore.token,
            { clientData: this.props.session.userName }
          )
          .then(() => {
            //TODO: this data will allow you to find out which stream is which
            this.props.roomStore.subscribers.map(sub =>
              console.log("connection --", sub.stream.connection.data)
            );
            // console.log('EDWARD Subscribers are: ', this.props.roomStore.subscribers.slice());
            // const streamer = this.props.roomStore.subscribers[this.props.roomStore.subscribers.length - 1];
            // streamer.addVideoElement(this.props.roomStore.videoEl);
          });
      }
    });
  };

  connectToSession = () => {
    this.props.roomStore.session
      .connect(
        this.props.roomStore.token,
        { clientData: this.props.session.email }
      )
      .then(() => {
        let publisher = this.props.roomStore.ov.initPublisher(undefined, {
          audioSource: undefined, // The source of audio. If undefined default microphone
          videoSource: undefined, // The source of video. If undefined default webcam
          publishAudio: true, // Whether you want to start publishing with your audio unmuted or not
          publishVideo: true, // Whether you want to start publishing with your video enabled or not
          resolution: "1280x720", // The resolution of your video
          frameRate: 30, // The frame rate of your video
          insertMode: "APPEND", // How the video is inserted in the target element 'video-container'
          mirror: true // Whether to mirror your local video or not
        });

        this.props.roomStore.publisher = publisher;

        this.props.roomStore.session.publish(publisher);

        // this.props.roomStore.mainStreamManager.addVideoElement(this.props.roomStore.videoEl);
      });
  };

  startStream = e => {
    e.preventDefault();
    this.initSession();

    if (this.props.roomStore.sessionId) {
      this.props.roomStore.getToken("PUBLISHER").then(result => {
        if (result) {
          this.connectToSession();
        }
      });
    } else {
      this.props.roomStore
        .createSession(`${this.props.session.email}1`)
        .then(res => {
          if (res) {
            this.props.roomStore.getToken("PUBLISHER").then(result => {
              if (result) {
                this.connectToSession();
              }
            });
          }
        });
    }
  };

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
}

export default withRouter(Room);
