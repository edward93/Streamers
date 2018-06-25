import React from 'react';
import Select from 'antd/lib/select';
import Button from 'antd/lib/button';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import Paths from '../../services/Paths';

@inject('session')
@observer
class SignIn extends React.Component {
    username = 'anna';

    render() {
        return (
            <div className="S-signin-container text-center container-fluid">
                <div className="S-signin-box-wrapper">
                    <div className="S-page-title">
                        <h1>Select one of the streamer</h1>
                    </div>
                    <div className="col-sm">
                        <Select defaultValue="anna" onChange={this.selectChange}>
                            <Select.Option value="anna">Anna</Select.Option>
                            <Select.Option value="jessica">Jessica</Select.Option>
                            <Select.Option value="stacy">Stacy</Select.Option>
                        </Select>
                    </div>
                    <hr />
                    <div className="S-action">
                        <Button type="primary" onClick={this.login}>Sign In</Button>
                    </div>
                </div>

            </div>
        )
    }

    login = () => {
        this.props.session.login('streamer', this.username);
        this.props.history.push(Paths.home);
    }

    selectChange = (value) => {
        this.username = value;
        console.log(this.username);
    }
}

export default withRouter(SignIn);
