import React from "react";
import Input from "antd/lib/input";
import QueryString from "query-string";
import { inject, observer } from "mobx-react";
import { OpenVidu } from "openvidu-browser";
import { withRouter } from "react-router-dom";

import Config from "Config";
import Video from "./Video.Component";
import Message from "../ChatComponent/Chat.Message.Component";

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
    this.props.roomStore.modelName = QueryString.parse(
      this.props.location.search
    ).name;

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

    store.sessionId = QueryString.parse(this.props.location.search).sessionId;

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
          this.props.location.push(Config.ServerUrl + "/accept-certificate");
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
