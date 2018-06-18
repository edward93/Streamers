import React from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import QueryString from 'query-string';
import { OpenVidu } from 'openvidu-browser';

import streamLarge from '../../images/stream-large.png';


@inject('roomStore', 'session')
@observer
class Room extends React.Component {
    componentDidMount() {
        this.props.roomStore.modelName = QueryString.parse(this.props.location.search).name;
        this.props.roomStore.ov = new OpenVidu();
        this.props.roomStore.session = this.props.roomStore.ov.initSession();

        this.props.roomStore.session.on('streamCreated', event => {
            // Subscribe to the Stream to receive it. Second parameter is undefined
            // so OpenVidu doesn't create an HTML video by its own
            let subscriber = this.props.roomStore.session.subscribe(event.stream, undefined);
            this.props.roomStore.subscribers.push(subscriber);
        });

        this.props.roomStore.session.on('streamDestroyed', (event) => {
            // Remove the stream from 'subscribers' array
            this.props.roomStore.deleteSubscriber(event.stream.streamManager);
        });
    }

    render() {
        return (
            <dir className="S-room-container conteiner=fluid">
                <div className="S-room-title S-page-title text-center">
                    <h1>Welcome to {this.props.roomStore.modelName}'s Room</h1>
                </div>
                <hr />
                <div className="S-room-video-container container-fluid">
                    <div className="row">
                        <div className="col-md-8">
                            <div className="S-vidoe-wrapper">
                                <video className="S-video img-fluid" poster={streamLarge} ref={ref => this.props.roomStore.videoEl = ref} />
                                {/* {!this.props.roomStore.isStreamPublished && <img src={streamLarge} alt="" className="img-fluid" />} */}
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="S-room-chat-box-container">
                                <div className="S-room-chat-box">
                                    <div className="S-chat-messages">
                                        Messages here
                                    </div>
                                    <div className="S-chat-input">
                                        Input
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div className="row">
                        {this.props.session.role === 'streamer' &&
                            <div className="col-sm">
                                <button className="btn btn-primary" onClick={this.startStream}>Start My Stream</button>
                            </div>
                        }
                    </div>
                </div>
            </dir>
        );
    }

    startStream = (e) => {
        e.preventDefault();

        this.props.roomStore.createSession().then(result => {
            if (result) {
                this.props.roomStore.getToken().then(result => {
                    if (result) {
                        this.props.roomStore.session.connect(this.props.roomStore.token, { clientData: this.props.session.userName })
                            .then(() => {
                                let publisher = this.props.roomStore.ov.initPublisher(undefined, {
                                    audioSource: undefined, // The source of audio. If undefined default microphone
                                    videoSource: undefined, // The source of video. If undefined default webcam
                                    publishAudio: true,     // Whether you want to start publishing with your audio unmuted or not
                                    publishVideo: true,     // Whether you want to start publishing with your video enabled or not
                                    resolution: '640x480',  // The resolution of your video
                                    frameRate: 30,          // The frame rate of your video
                                    insertMode: 'APPEND',   // How the video is inserted in the target element 'video-container'
                                    mirror: false           // Whether to mirror your local video or not
                                });

                                this.props.roomStore.session.publish(publisher);

                                this.props.roomStore.mainStreamManager = publisher;

                                this.props.roomStore.mainStreamManager.addVideoElement(this.props.roomStore.videoEl);
                                this.props.roomStore.publisher = publisher;
                            });
                    }
                });
            }
        });
    }

    componentWillUnmount() {
        if (this.props.roomStore.session) this.props.roomStore.session.disconnect();
        this.props.roomStore.reset();
    }
}

export default withRouter(Room);
