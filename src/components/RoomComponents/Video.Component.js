import React from "react";
import PropTypes from "prop-types";

import streamLarge from "../../images/stream-large.png";

class Video extends React.Component {
  static propTypes = {
    streamManager: PropTypes.object.required
  };
  videoEl = undefined;

  componentDidMount() {
    if (this.props.streamManager) {
      this.props.streamManager.addVideoElement(this.videoEl);
    }
  }

  render() {
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
