import React from "react";
import PropTypes from "prop-types";

class Message extends React.Component {
  static propTypes = {
    username: PropTypes.string.required,
    message: PropTypes.string.required
  };

  render() {
    return (
      <div>
        <span className="S-chat-message-user">
          <strong>{this.props.username}</strong> says:
        </span>
        <span className="S-chat-message-body">
          <strong> {this.props.message}</strong>
        </span>
      </div>
    );
  }
}

export default Message;
