import React from "react";
import PropTypes from "prop-types";
import { observer } from "mobx-react";

import streamLarge from "../../images/stream-large.png";

@observer
class Video extends React.Component {
  static propTypes = {
    streamManager: PropTypes.object
  };
  videoEl = undefined;

  render() {
    if (this.props.streamManager) {
      this.props.streamManager.addVideoElement(this.videoEl);
    }
    return (
      <div>
        <video
          className="S-video img-fluid"
          poster={streamLarge}
          ref={ref => (this.videoEl = ref)}
        />
      </div>
    );
  }
}

export default Video;
