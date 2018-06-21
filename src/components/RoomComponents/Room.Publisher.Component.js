import React from "react";
import { inject, observer } from "mobx-react";
import QueryString from "query-string";

@inject("session", "roomStore")
@observer
class Room extends React.Component {
  componentDidMount() {
    window.addEventListener("beforeunload", this.onUnload);
    this.props.roomStore.modelName = QueryString.parse(
      this.props.location.search
    ).name;
  }

  onUnload = event => {
    event.preventDefault();
    if (this.props.roomStore.session) {
      this.props.roomStore.session.disconnect();
      this.props.roomStore.removeSessionId();
    }
    this.props.roomStore.reset();
  };
}

export default Room;
