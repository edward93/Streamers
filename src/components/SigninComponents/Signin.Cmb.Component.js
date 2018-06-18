import React from 'react';
import Radio from 'antd/lib/radio';
import Button from 'antd/lib/button';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import Streamer from './Signin.Streamer.Component';
import Viewer from './Signin.Viewer.Component';
import Paths from '../../services/Paths';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

@inject('session')
@observer
class Signin extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            type: 'viewer',
            show: false
        }
    }

    componentWillMount() {
        if (this.props.session.isloggedIn) {
            this.props.history.push(Paths.home);
        }
    }

    render() {
        return (
            <div className="container-fluid">
                {this.state.show ?
                    <div className="container">
                        {this.state.type === 'viewer' ?
                            <Viewer />
                            :
                            <Streamer />
                        }
                    </div>
                    :
                    <div className="container-fluid h-100">
                        <div className="text-center S-page-title">
                            <h1>Select User Type</h1>
                        </div>
                        <div className="text-center container-fluid">
                            <div className="mx-auto">
                                <RadioGroup defaultValue="viewer" size="large" onChange={this.typeChange}>
                                    <RadioButton value="viewer">Viewer</RadioButton>
                                    <RadioButton value="streamer">Streamer</RadioButton>
                                </RadioGroup>
                            </div>
                            <hr />
                            <div className="">
                                <Button type="primary" onClick={this.go}>GO</Button>
                            </div>
                        </div>
                    </div>
                }
            </div>
        )
    }

    typeChange = (value) => {
        const type = value.target.value;
        this.setState({ type });
    }

    go = () => {
        this.setState({ show: true });
    }
}

export default withRouter(Signin);
