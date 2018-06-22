import React from "react";
import Input from "antd/lib/input";
import QueryString from "query-string";
import { inject, observer } from "mobx-react";
import { OpenVidu } from "openvidu-browser";
import { withRouter } from "react-router-dom";

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
      store.subscribers.push(subscriber);
    });

    store.session.on("streamDestroyed", event => {
      store.deleteSubscriber(event.stream.streamManager);
    });

    store.sessionId = QueryString.parse(this.props.location.search).sessionId;

    store.getToken("SUBSCRIBER").then(result => {
      if (result) {
        store.session
          .connect(
            store.token,
            { name: this.props.session.userName, role: "SUBSCRIBER" }
          )
          .then(() => {
            console.log("Whole data: ", store.subscribers.slice());
            store.publisher = store.subscribers.filter(
              c => JSON.parse(c.stream.connection.data).role === "PUBLISHER"
            )[0];
            console.log("Publisher is: ", store.publisher);
          });
      }
    });
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
