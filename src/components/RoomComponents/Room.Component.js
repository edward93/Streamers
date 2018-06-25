import React from "react";
import { observer, inject } from "mobx-react";
import { withRouter } from "react-router-dom";

import PublisherRoom from './Room.Publisher.Component';
import SubscriberRoom from './Room.Subscriber.Comonent';

@inject("roomStore", "session")
@observer
class Room extends React.Component {

  render() {
    if (this.props.session.role === 'streamer') {
      return <PublisherRoom />
    } else {
      return <SubscriberRoom />
    }
  }
}

export default withRouter(Room);
